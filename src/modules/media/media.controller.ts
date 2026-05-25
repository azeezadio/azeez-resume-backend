import type { Request, Response } from '@shared/types/restana.type';
import { created, ok } from '@shared/utils/response.util';
import { MediaService } from './media.service';

const service = new MediaService();

export class MediaController {
  async listBuckets(_req: Request, res: Response) {
    return ok(res, await service.listBuckets());
  }

  async createBucket(req: Request, res: Response) {
    return created(res, await service.createBucket(req.body as Record<string, unknown>));
  }

  async listAssets(_req: Request, res: Response) {
    return ok(res, await service.listAssets());
  }

  async createAsset(req: Request, res: Response) {
    return created(res, await service.createAsset(req.body as Record<string, unknown>));
  }
}
