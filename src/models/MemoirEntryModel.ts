import BaseModel from './BaseModel';
import type { PublishStatus } from './ArticleModel';

export default class MemoirEntryModel extends BaseModel {
  static tableName = 'memoir_entries';

  slug!: string;
  title!: string;
  summary?: string | null;
  body!: string;
  year!: number;
  month!: number;
  occurred_on?: string | null;
  location?: string | null;
  mood?: string | null;
  cover_media_id?: string | null;
  status!: PublishStatus;
  published_at?: string | null;
  metadata!: Record<string, unknown>;
}
