import BaseModel from './BaseModel';

export type PublishStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export default class ArticleModel extends BaseModel {
  static tableName = 'articles';

  slug!: string;
  title!: string;
  excerpt?: string | null;
  body!: string;
  cover_media_id?: string | null;
  status!: PublishStatus;
  year!: number;
  month!: number;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  metadata!: Record<string, unknown>;
}
