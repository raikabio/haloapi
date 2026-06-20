// api/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// 1. Hardcoded Configuration Blueprint
const R2_CONFIG = {
  ENDPOINT: "https://73e60f082e66ff50bd1bd466745b36ae.r2.cloudflarestorage.com",
  PUBLIC_URL: "https://pub-e5285fab83ec4d6d8349a0cbd405c786.r2.dev",
  BUCKET: "movies",
  ACCESS_KEY_ID: "f806cb5c7d779445adc2bb27726f6448",
  SECRET_ACCESS_KEY: "ffcdf428804e48bfebd2f0f78c682bf39a713257e16fa39203b5733c0bc5147b",
  REGION: "auto"
};

// 2. Initialize Core AWS S3 Core Client Engine
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

// 3. Configure Global Cross-Origin Resource Interceptor
app.use(cors({
  origin: ['https://haloapires.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Mock Data Catalog for Application Use
const mediaCatalog = [
  { id: "1", title: "In the Hand of Dante", type: "trailer" }
];

// 4. Endpoint Routing Declarations
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to your live Vercel Cloudflare R2 Stream Pipeline!' });
});

app.get('/api/media', (req: Request, res: Response) => {
  res.json(mediaCatalog);
});

// Secure Multi-Part Presigned Stream Matrix Handshaker
app.post('/api/upload-url', async (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    res.status(400).json({ error: "Missing required payload tracking configurations (fileName or fileType)." });
    return;
  }

  try {
    const cleanFileName = encodeURIComponent(fileName.replace(/\s+/g, '-'));
    const uniqueKey = `trailers/${Date.now()}-${cleanFileName}`;

    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.BUCKET,
      Key: uniqueKey,
      ContentType: fileType,
    });

    // Generate secure upload window authorization ticket expiring in 15 minutes
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    res.json({
      uploadUrl,
      publicUrl: `${R2_CONFIG.PUBLIC_URL}/${uniqueKey}`
    });
  } catch (error: any) {
    console.error("Presigned Signature Failure Event:", error.message);
    res.status(500).json({ error: "Cloudflare engine verification failed", details: error.message });
  }
});

// 5. Serverless Engine Isolation Guard
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Dedicated sandbox container running at http://localhost:${PORT}`));
}

export default app;