import 'dotenv/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import path from 'path';
import { storage } from '../config/env.config';

const root = process.env.WEBSITE_PUBLIC_DIR
  ? path.resolve(process.env.WEBSITE_PUBLIC_DIR)
  : path.resolve(process.cwd(), '../app/public');

const files = [
  ['images/portrait.jpg', 'image/jpeg'],
  ['images/portrait 2.jpg', 'image/jpeg'],
  ['images/termii-retreat.jpeg', 'image/jpeg'],
  ['images/staff-of-the-year.jpeg', 'image/jpeg'],
  ['images/dev-hangout.jpeg', 'image/jpeg'],
  ['images/huawei-feature.png', 'image/png'],
  ['images/patronize-staff-of-year.png', 'image/png'],
  ['images/cross-dept-award.png', 'image/png'],
  ['images/design-spinoff.jpeg', 'image/jpeg'],
  ['images/motion-sickness.jpg', 'image/jpeg'],
  ['Adio_Azeez_Adeniran_Resume.pdf', 'application/pdf', 'documents/Adio_Azeez_Adeniran_Resume.pdf'],
] as const;

function requireEnv(value: string | undefined, label: string) {
  if (!value) throw new Error(`Missing ${label}`);
  return value;
}

async function main() {
  const bucket = requireEnv(storage.publicBucket, 'BUCKET or S3_PUBLIC_BUCKET');
  const endpoint = requireEnv(storage.endpoint, 'ENDPOINT or S3_ENDPOINT');
  const accessKeyId = requireEnv(storage.accessKeyId, 'ACCESS_KEY_ID or S3_ACCESS_KEY_ID');
  const secretAccessKey = requireEnv(storage.secretAccessKey, 'SECRET_ACCESS_KEY or S3_SECRET_ACCESS_KEY');

  const client = new S3Client({
    endpoint,
    region: storage.region,
    forcePathStyle: storage.forcePathStyle,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  for (const [sourceKey, contentType, destinationKey = sourceKey] of files) {
    const filePath = path.join(root, sourceKey);
    const fileStat = await stat(filePath);

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: destinationKey,
        Body: createReadStream(filePath),
        ContentLength: fileStat.size,
        ContentType: contentType,
      }),
    );

    console.log(`Uploaded ${destinationKey}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
