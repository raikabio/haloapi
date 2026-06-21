import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Core subpath imports for modern modular Firebase Admin
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// --- FIREBASE INITIALIZATION ---
if (getApps().length === 0) {
  initializeApp({
    projectId: "mapin-433a9",
    storageBucket: "mapin-433a9.firebasestorage.app"
  });
}

const db = getFirestore(); 
const auth = getAuth();    

// --- CLOUDFLARE R2 CONFIGURATION ---
const R2_CONFIG = {
  ENDPOINT: "https://73e60f082e66ff50bd1bd466745b36ae.r2.cloudflarestorage.com",
  PUBLIC_URL: "https://pub-e5285fab83ec4d6d8349a0cbd405c786.r2.dev",
  BUCKET: "movies",
  ACCESS_KEY_ID: "f806cb5c7d779445adc2bb27726f6448",
  SECRET_ACCESS_KEY: "ffcdf428804e48bfebd2f0f78c682bf39a713257e16fa39203b5733c0bc5147b",
  REGION: "auto"
};

const s3Client = new S3Client({
  region: R2_CONFIG.REGION,
  endpoint: R2_CONFIG.ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: R2_CONFIG.ACCESS_KEY_ID,
    secretAccessKey: R2_CONFIG.SECRET_ACCESS_KEY,
  },
});

const app = express();

// --- EXTEND REQUEST TYPE FOR AUTHENTICATED USER ---
interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
}

// --- UNIVERSAL CORS ACCESS CONTROL (UPDATED ORIGIN) ---
app.use(cors({
  origin: 'https://aplixapi.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// --- MIDDLEWARE: VERIFY FIREBASE ID TOKEN ---
const authenticateFirebaseUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <TOKEN>"

  if (!token) {
    res.status(401).json({ error: "Access denied. Token missing from Header." });
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error: any) {
    res.status(403).json({ error: "Authentication failed. Invalid Firebase Token.", details: error.message });
  }
};

// --- OTT STORAGE ENDPOINT (PROTECTED) ---
app.post('/api/upload-url', authenticateFirebaseUser, async (req: AuthenticatedRequest, res: Response) => {
  const { fileName, fileType, title, description } = req.body;

  if (!fileName) {
    res.status(400).json({ error: "Missing fileName parameter." });
    return;
  }

  try {
    const cleanFileName = encodeURIComponent(fileName.replace(/\s+/g, '-'));
    const uniqueKey = `trailers/${Date.now()}-${cleanFileName}`;

    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.BUCKET,
      Key: uniqueKey,
      ContentType: fileType || 'application/octet-stream',
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });
    const finalPublicUrl = `${R2_CONFIG.PUBLIC_URL}/${uniqueKey}`;

    // Store video metadata securely inside Firestore
    if (title) {
      await db.collection("movies").add({
        title,
        description: description || "",
        videoUrl: finalPublicUrl,
        uploadedBy: req.user?.email || "anonymous",
        createdAt: FieldValue.serverTimestamp()
      });
    }

    res.json({
      uploadUrl,
      publicUrl: finalPublicUrl,
      dbLogged: !!title
    });
  } catch (error: any) {
    res.status(500).json({ error: "Cloudflare engine generation failed", details: error.message });
  }
});

// --- FETCH VIDEO CATALOG FROM FIRESTORE (PUBLIC) ---
app.get('/api/movies', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection("movies").orderBy("createdAt", "desc").get();
    const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ movies });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve records from Database.", details: error.message });
  }
});

// --- CORE SYSTEM INDEX ---
app.get('/', (req: Request, res: Response) => {
  res.json({ status: "online", system: "Aplix API Core + Firebase Engine" });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Dedicated backend active on port ${PORT}`));
}

export default app;