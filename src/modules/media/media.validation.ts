import Joi from 'joi';

export const createBucketSchema = Joi.object({
  name: Joi.string().trim().required(),
  provider: Joi.string().trim().default('railway'),
  visibility: Joi.string().valid('public', 'private').default('private'),
  endpoint: Joi.string().uri().allow(null, ''),
  region: Joi.string().allow(null, ''),
  metadata: Joi.object().default({}),
});

export const createMediaAssetSchema = Joi.object({
  bucket_id: Joi.string().uuid().required(),
  owner_type: Joi.string().valid('article', 'memoir', 'profile', 'standalone').required(),
  owner_id: Joi.string().uuid().allow(null),
  storage_key: Joi.string().required(),
  public_url: Joi.string().uri().allow(null, ''),
  mime_type: Joi.string().required(),
  file_name: Joi.string().required(),
  file_size: Joi.number().integer().min(0).allow(null),
  width: Joi.number().integer().min(0).allow(null),
  height: Joi.number().integer().min(0).allow(null),
  alt_text: Joi.string().allow(null, ''),
  caption: Joi.string().allow(null, ''),
  metadata: Joi.object().default({}),
});
