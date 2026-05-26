import ArticleModel from '@models/ArticleModel';
import BaseRepository from './base.repository';

export type ArticleListFilters = {
  year?: number;
  month?: number;
  category?: string;
  status?: string;
};

export class ArticleRepository extends BaseRepository<ArticleModel> {
  constructor() {
    super(ArticleModel);
  }

  findBySlug(slug: string) {
    return ArticleModel.query()
      .alias('articles')
      .select('articles.*', ArticleModel.raw('row_to_json(cover.*) as cover'))
      .leftJoin('media_assets as cover', 'cover.id', 'articles.cover_media_id')
      .whereNull('articles.deleted_at')
      .findOne({ 'articles.slug': slug });
  }

  listByArchive(filters: ArticleListFilters = {}) {
    const { year, month, category, status = 'published' } = filters;
    const query = ArticleModel.query()
      .alias('articles')
      .select('articles.*', ArticleModel.raw('row_to_json(cover.*) as cover'))
      .leftJoin('media_assets as cover', 'cover.id', 'articles.cover_media_id')
      .whereNull('articles.deleted_at')
      .orderBy('articles.year', 'desc')
      .orderBy('articles.month', 'desc')
      .orderBy('articles.published_at', 'desc');

    if (year) query.where({ 'articles.year': year });
    if (month) query.where({ 'articles.month': month });
    if (status) query.where({ 'articles.status': status });
    if (category) {
      query.whereRaw("LOWER(articles.metadata ->> 'category') = LOWER(?)", [category]);
    }

    return query;
  }

  async listFilters() {
    const [years, categories] = await Promise.all([
      ArticleModel.query()
        .alias('articles')
        .distinct('articles.year')
        .whereNull('articles.deleted_at')
        .where({ 'articles.status': 'published' })
        .orderBy('articles.year', 'desc'),
      ArticleModel.query()
        .alias('articles')
        .select(ArticleModel.raw("DISTINCT articles.metadata ->> 'category' as category"))
        .whereNull('articles.deleted_at')
        .where({ 'articles.status': 'published' })
        .whereRaw("articles.metadata ? 'category'")
        .orderBy('category', 'asc'),
    ]);

    return {
      years: years.map((row) => row.year),
      categories: categories
        .map((row) => (row as unknown as { category?: string }).category)
        .filter(Boolean),
    };
  }
}
