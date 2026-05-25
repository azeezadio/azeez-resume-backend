import type { Server } from '@shared/types/restana.type';
import { validate } from '@shared/middlewares/validate.middleware';
import { MediaController } from './media.controller';
import { createBucketSchema, createMediaAssetSchema } from './media.validation';

export default function mediaRoute(server: Server, prefix: string) {
  const controller = new MediaController();

  server.get(`${prefix}/buckets`, controller.listBuckets.bind(controller));
  server.post(
    `${prefix}/buckets`,
    validate(createBucketSchema),
    controller.createBucket.bind(controller),
  );

  server.get(`${prefix}/assets`, controller.listAssets.bind(controller));
  server.post(
    `${prefix}/assets`,
    validate(createMediaAssetSchema),
    controller.createAsset.bind(controller),
  );
}
