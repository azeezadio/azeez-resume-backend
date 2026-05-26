import type { Request, Response } from '@shared/types/restana.type';
import { created, ok } from '@shared/utils/response.util';
import { ArticleService } from './article.service';

const service = new ArticleService();

export class ArticleController {
  async list(req: Request, res: Response) {
    const { year, month, category, status, locale } = req.query as {
      year?: number;
      month?: number;
      category?: string;
      status?: string;
      locale?: string;
    };
    return ok(res, await service.list({ year, month, category, status }, locale));
  }

  async findBySlug(req: Request, res: Response) {
    const { locale } = req.query as { locale?: string };
    return ok(res, await service.findBySlug(req.params.slug, locale));
  }

  async create(req: Request, res: Response) {
    return created(res, await service.create(req.body as Record<string, unknown>));
  }
}
