// api/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { mediaCatalog } from './data';
import { s3Client } from './s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const app = express();

// Cleared: Accepting inbound operations from your live production Netlify app
app.use(cors({
  origin: ['https://haloapires.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to your live Vercel TypeScript Media API!' });
});

app.get('/api/media', (req: Request, res: Response) => {
  res.json(mediaCatalog);
});

app.post('/api/upload-url', async (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    res.status(400).json({ error: "Missing fileName or fileType parameters" });
    return;
  }

  try {
    const bucketName = process.env.VITE_R2_BUCKET || 'movies';
    const uniqueKey = `trailers/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    res.json({
      uploadUrl,
      publicUrl: `${process.env.VITE_R2_PUBLIC_URL}/${uniqueKey}`
    });
  } catch (error: any) {
    console.error("Upload URL Generation Crash:", error.message);
    res.status(500).json({ error: "Could not generate secure upload url", details: error.message });
  }
});

// Serverless Safety Switch: Only call .listen() if NOT executing on cloud runtimes
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local TS dev running on port ${PORT}`));
}

export default app;