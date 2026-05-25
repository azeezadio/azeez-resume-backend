import type { Request, Response, Server } from '@shared/types/restana.type';
import { ok } from '@shared/utils/response.util';

export default function healthRoute(server: Server, prefix: string) {
  server.get(prefix, (_req: Request, res: Response) =>
    ok(res, {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }),
  );
}
