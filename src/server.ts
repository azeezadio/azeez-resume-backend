import App from './app';
import { app, server } from './config/env.config';
import logger from './shared/utils/logger';

const application = new App();

process
  .on('uncaughtException', (err) => {
    logger.error({ err });
    application.close();
    process.exit(1);
  })
  .on('SIGINT', () => {
    application.close();
    process.exit(0);
  })
  .on('SIGTERM', () => {
    application.close();
    process.exit(0);
  });

application
  .listen(server.port, server.address)
  .then(() => logger.info(`${app.name} started on ${server.port}`))
  .catch((err: Error) => {
    logger.error({ err });
    process.exit(1);
  });
