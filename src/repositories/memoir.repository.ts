import MemoirEntryModel from '@models/MemoirEntryModel';
import BaseRepository from './base.repository';

export class MemoirRepository extends BaseRepository<MemoirEntryModel> {
  constructor() {
    super(MemoirEntryModel);
  }

  findBySlug(slug: string) {
    return MemoirEntryModel.query().whereNull('deleted_at').findOne({ slug });
  }

  listByArchive(year?: number, month?: number) {
    const query = MemoirEntryModel.query()
      .whereNull('deleted_at')
      .orderBy('year', 'desc')
      .orderBy('month', 'desc')
      .orderBy('occurred_on', 'desc');

    if (year) query.where({ year });
    if (month) query.where({ month });

    return query;
  }
}
