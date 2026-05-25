import BaseModel from './BaseModel';

export default class MediaBucketModel extends BaseModel {
  static tableName = 'media_buckets';

  name!: string;
  provider!: string;
  visibility!: 'public' | 'private';
  endpoint?: string | null;
  region?: string | null;
  metadata!: Record<string, unknown>;
}
