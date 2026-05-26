import { ArticleListFilters, ArticleRepository } from '@repositories/article.repository';
import { connectDatabase } from '../../database/manager';
import {
  applyContentTranslations,
  loadContentTranslations,
  normalizeContentLocale,
} from '../../shared/utils/content-translation.util';
import { AppError } from '@shared/utils/error/app.error';

export class ArticleService {
  private readonly articles = new ArticleRepository();

  async list(filters: ArticleListFilters = {}, locale?: string) {
    const normalizedLocale = normalizeContentLocale(locale);
    const [items, availableFilters] = await Promise.all([
      this.articles.listByArchive(filters),
      this.articles.listFilters(),
    ]);
    const translations = await loadContentTranslations(
      connectDatabase(),
      normalizedLocale,
      items.map((entity) => ({ entityType: 'article', entity: entity as unknown as Record<string, unknown> })),
    );

    return {
      locale: normalizedLocale,
      fallback_locale: 'en',
      items: items.map((article) =>
        applyContentTranslations('article', article as unknown as Record<string, unknown>, translations),
      ),
      filters: availableFilters,
    };
  }

  async findBySlug(slug: string, locale?: string) {
    const normalizedLocale = normalizeContentLocale(locale);
    const article = await this.articles.findBySlug(slug);
    if (!article) throw new AppError('Article not found', 404, 'ARTICLE_NOT_FOUND');
    const translations = await loadContentTranslations(
      connectDatabase(),
      normalizedLocale,
      [{ entityType: 'article', entity: article as unknown as Record<string, unknown> }],
    );
    return {
      ...applyContentTranslations('article', article as unknown as Record<string, unknown>, translations),
      locale: normalizedLocale,
      fallback_locale: 'en',
    };
  }

  create(payload: Record<string, unknown>) {
    return this.articles.create(payload as never);
  }
}
