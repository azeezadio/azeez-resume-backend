import cors from 'cors';
import pinoHttp from 'pino-http';
import { app } from '@config/env.config';
import type { Server } from '@shared/types/restana.type';
import logger from '@shared/utils/logger';

export default function initializeMiddlewares(server: Server) {
  server.use(
    cors({
      origin: app.corsOrigin === '*' ? true : app.corsOrigin.split(','),
      credentials: true,
    }),
  );

  server.use(
    pinoHttp({
      logger,
    }),
  );
}
