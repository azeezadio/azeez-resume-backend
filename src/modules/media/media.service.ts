import {
  MediaAssetRepository,
  MediaBucketRepository,
} from '@repositories/media.repository';

export class MediaService {
  private readonly buckets = new MediaBucketRepository();
  private readonly assets = new MediaAssetRepository();

  listBuckets() {
    return this.buckets.list({ limit: 100 });
  }

  createBucket(payload: Record<string, unknown>) {
    return this.buckets.create(payload as never);
  }

  listAssets() {
    return this.assets.list({ limit: 100 });
  }

  createAsset(payload: Record<string, unknown>) {
    return this.assets.create(payload as never);
  }
}
