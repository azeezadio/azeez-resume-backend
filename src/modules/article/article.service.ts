import { ArticleListFilters, ArticleRepository } from '@repositories/article.repository';
import { AppError } from '@shared/utils/error/app.error';

export class ArticleService {
  private readonly articles = new ArticleRepository();

  async list(filters: ArticleListFilters = {}) {
    const [items, availableFilters] = await Promise.all([
      this.articles.listByArchive(filters),
      this.articles.listFilters(),
    ]);

    return {
      items,
      filters: availableFilters,
    };
  }

  async findBySlug(slug: string) {
    const article = await this.articles.findBySlug(slug);
    if (!article) throw new AppError('Article not found', 404, 'ARTICLE_NOT_FOUND');
    return article;
  }

  create(payload: Record<string, unknown>) {
    return this.articles.create(payload as never);
  }
}
