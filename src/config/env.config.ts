import 'dotenv/config';

const numberFromEnv = (key: string, fallback: number) => {
  const value = process.env[key];
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const app = {
  name: process.env.APP_NAME ?? 'azeez-resume-backend',
  env: process.env.NODE_ENV ?? 'development',
  apiPrefix: process.env.API_PREFIX ?? '/api/v1',
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
};

export const server = {
  port: numberFromEnv('PORT', 3000),
  address: process.env.HOST ?? '0.0.0.0',
};

export const database = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: numberFromEnv('DB_POOL_MIN', 2),
    max: numberFromEnv('DB_POOL_MAX', 10),
  },
};

export const storage = {
  endpoint: process.env.ENDPOINT ?? process.env.S3_ENDPOINT,
  region: process.env.REGION ?? process.env.S3_REGION ?? 'auto',
  accessKeyId: process.env.ACCESS_KEY_ID ?? process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY ?? process.env.S3_SECRET_ACCESS_KEY,
  publicBucket: process.env.BUCKET ?? process.env.S3_PUBLIC_BUCKET ?? 'resume-public',
  privateBucket: process.env.BUCKET ?? process.env.S3_PRIVATE_BUCKET ?? 'resume-private',
  forcePathStyle: (process.env.S3_FORCE_PATH_STYLE ?? 'false') === 'true',
};
