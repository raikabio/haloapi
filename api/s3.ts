// api/s3.ts
import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "auto", // 👈 Cloudflare uses auto
  endpoint: process.env.VITE_R2_ENDPOINT, // 👈 Points to your r2.cloudflarestorage.com link
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY || "",
  },
});