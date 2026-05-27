import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL; // e.g. https://pub-xxxxxx.r2.dev

const isR2Configured = !!(
  R2_ACCOUNT_ID &&
  R2_ACCESS_KEY_ID &&
  R2_SECRET_ACCESS_KEY &&
  R2_BUCKET_NAME
);

// Initialize S3 client for R2 if configured
const s3Client = isR2Configured
  ? new S3Client({
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID!,
        secretAccessKey: R2_SECRET_ACCESS_KEY!,
      },
      region: 'auto',
    })
  : null;

/**
 * Uploads a file to Cloudflare R2, falling back to local storage if credentials are not configured.
 * @returns The public URL of the uploaded file.
 */
export async function uploadFile(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const fileExt = path.extname(fileName) || '.jpg';
  // Create a clean filename with timestamp to prevent collisions
  const cleanName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9]/g, '_')}${fileExt}`;

  if (s3Client && R2_BUCKET_NAME) {
    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: cleanName,
          Body: fileBuffer,
          ContentType: mimeType,
        })
      );
      
      // Return public R2 URL
      const publicBaseUrl = R2_PUBLIC_URL || `https://${R2_BUCKET_NAME}.r2.cloudflarestorage.com`;
      return `${publicBaseUrl.replace(/\/$/, '')}/${cleanName}`;
    } catch (error) {
      console.error('Failed uploading to Cloudflare R2, falling back to local upload:', error);
    }
  }

  // Fallback: Local filesystem upload to public/uploads
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, cleanName);
  await fs.promises.writeFile(filePath, fileBuffer);
  
  return `/uploads/${cleanName}`;
}
