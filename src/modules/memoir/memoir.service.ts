import { MemoirRepository } from '@repositories/memoir.repository';
import { AppError } from '@shared/utils/error/app.error';

export class MemoirService {
  private readonly memoirs = new MemoirRepository();

  list(year?: number, month?: number) {
    return this.memoirs.listByArchive(year, month);
  }

  async findBySlug(slug: string) {
    const memoir = await this.memoirs.findBySlug(slug);
    if (!memoir) throw new AppError('Memoir entry not found', 404, 'MEMOIR_NOT_FOUND');
    return memoir;
  }

  create(payload: Record<string, unknown>) {
    return this.memoirs.create(payload as never);
  }
}
