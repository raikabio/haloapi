// api/index.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { mediaCatalog } from './data.js';
import { s3Client } from './s3.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const app = express();

// 1. Configure Global CORS Headers explicitly
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. Intercept and handle Preflight OPTIONS requests instantly
app.options('*', (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to your Vercel-ready TypeScript Media API!' });
});

app.get('/api/media', (req: Request, res: Response) => {
  res.json(mediaCatalog);
});

// POST Upload URL Handler
app.post('/api/upload-url', async (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    res.status(400).json({ error: "Missing fileName or fileType parameters" });
    return;
  }

  try {
    const bucketName = process.env.R2_BUCKET_NAME || 'halo-media';
    const uniqueKey = `trailers/${Date.now()}-${fileName}`;

    // Safeguard check: If variables are empty, throw clear error
    if (!process.env.VITE_R2_ENDPOINT) {
      throw new Error("Missing VITE_R2_ENDPOINT environment configuration.");
    }

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    res.json({
      uploadUrl,
      publicUrl: `${process.env.R2_PUBLIC_DOMAIN || 'https://pub-domain.com'}/${uniqueKey}`
    });
  } catch (error: any) {
    console.error("Upload URL Generation Crash:", error.message);
    res.status(500).json({ error: "Could not generate secure upload url", details: error.message });
  }
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local TS dev running on port ${PORT}`));
}

export default app;