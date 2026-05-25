import type { Server } from '@shared/types/restana.type';
import { validate } from '@shared/middlewares/validate.middleware';
import { ArticleController } from './article.controller';
import { archiveQuerySchema, createArticleSchema } from './article.validation';

export default function articleRoute(server: Server, prefix: string) {
  const controller = new ArticleController();

  server.get(prefix, validate(archiveQuerySchema, 'query'), controller.list.bind(controller));
  server.get(`${prefix}/:slug`, controller.findBySlug.bind(controller));
  server.post(prefix, validate(createArticleSchema), controller.create.bind(controller));
}
