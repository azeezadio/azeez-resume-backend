import type { Request, Response } from '@shared/types/restana.type';
import { ok } from '@shared/utils/response.util';
import { SiteService } from './site.service';

const service = new SiteService();

export class SiteController {
  async editorial(req: Request, res: Response) {
    const { locale } = req.query as { locale?: string };
    return ok(res, await service.getEditorialSite(locale));
  }
}
