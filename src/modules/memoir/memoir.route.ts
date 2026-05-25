import type { Server } from '@shared/types/restana.type';
import { validate } from '@shared/middlewares/validate.middleware';
import { MemoirController } from './memoir.controller';
import { archiveQuerySchema, createMemoirSchema } from './memoir.validation';

export default function memoirRoute(server: Server, prefix: string) {
  const controller = new MemoirController();

  server.get(prefix, validate(archiveQuerySchema, 'query'), controller.list.bind(controller));
  server.get(`${prefix}/:slug`, controller.findBySlug.bind(controller));
  server.post(prefix, validate(createMemoirSchema), controller.create.bind(controller));
}
