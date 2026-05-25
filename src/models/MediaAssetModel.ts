import BaseModel from './BaseModel';

export type MediaOwnerType = 'article' | 'memoir' | 'profile' | 'standalone';

export default class MediaAssetModel extends BaseModel {
  static tableName = 'media_assets';

  bucket_id!: string;
  owner_type!: MediaOwnerType;
  owner_id?: string | null;
  storage_key!: string;
  public_url?: string | null;
  mime_type!: string;
  file_name!: string;
  file_size?: number | null;
  width?: number | null;
  height?: number | null;
  alt_text?: string | null;
  caption?: string | null;
  metadata!: Record<string, unknown>;
}
