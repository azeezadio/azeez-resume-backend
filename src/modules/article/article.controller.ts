import type { Request, Response } from '@shared/types/restana.type';
import { created, ok } from '@shared/utils/response.util';
import { ArticleService } from './article.service';

const service = new ArticleService();

export class ArticleController {
  async list(req: Request, res: Response) {
    const { year, month } = req.query as { year?: number; month?: number };
    return ok(res, await service.list(year, month));
  }

  async findBySlug(req: Request, res: Response) {
    return ok(res, await service.findBySlug(req.params.slug));
  }

  async create(req: Request, res: Response) {
    return created(res, await service.create(req.body as Record<string, unknown>));
  }
}
