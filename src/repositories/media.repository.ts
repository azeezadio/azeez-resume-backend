import MediaAssetModel from '@models/MediaAssetModel';
import MediaBucketModel from '@models/MediaBucketModel';
import BaseRepository from './base.repository';

export class MediaAssetRepository extends BaseRepository<MediaAssetModel> {
  constructor() {
    super(MediaAssetModel);
  }
}

export class MediaBucketRepository extends BaseRepository<MediaBucketModel> {
  constructor() {
    super(MediaBucketModel);
  }

  findByName(name: string) {
    return MediaBucketModel.query().whereNull('deleted_at').findOne({ name });
  }
}
