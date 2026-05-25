import ArticleModel from '@models/ArticleModel';
import BaseRepository from './base.repository';

export class ArticleRepository extends BaseRepository<ArticleModel> {
  constructor() {
    super(ArticleModel);
  }

  findBySlug(slug: string) {
    return ArticleModel.query().whereNull('deleted_at').findOne({ slug });
  }

  listByArchive(year?: number, month?: number) {
    const query = ArticleModel.query()
      .whereNull('deleted_at')
      .orderBy('year', 'desc')
      .orderBy('month', 'desc')
      .orderBy('published_at', 'desc');

    if (year) query.where({ year });
    if (month) query.where({ month });

    return query;
  }
}
