import pino from 'pino';
import { app } from '@config/env.config';

const logger = pino({
  name: app.name,
  level: process.env.LOG_LEVEL ?? 'info',
  transport:
    app.env === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        },
});

export default logger;
