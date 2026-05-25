import type { Response } from '@shared/types/restana.type';
import { ok } from '@shared/utils/response.util';
import { SiteService } from './site.service';

const service = new SiteService();

export class SiteController {
  async editorial(_req: unknown, res: Response) {
    return ok(res, await service.getEditorialSite());
  }
}
