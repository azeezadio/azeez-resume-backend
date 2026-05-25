import type { Server } from '@shared/types/restana.type';
import { SiteController } from './site.controller';

export default function siteRoute(server: Server, prefix: string) {
  const controller = new SiteController();

  server.get(prefix, controller.editorial.bind(controller));
}
