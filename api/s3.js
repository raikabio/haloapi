// api/s3.ts
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.VITE_AWS_REGION || "auto", // Note: Swapped to Node-native process.env
  endpoint: process.env.VITE_R2_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY || "",
  },
});

export { s3Client };