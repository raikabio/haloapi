// api/s3.ts
import { S3Client } from "@aws-sdk/client-s3";
import { R2_CONFIG } from "./config";

export const s3Client = new S3Client({
  region: R2_CONFIG.REGION,
  endpoint: R2_CONFIG.ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: R2_CONFIG.ACCESS_KEY_ID,
    secretAccessKey: R2_CONFIG.SECRET_ACCESS_KEY,
  },
});