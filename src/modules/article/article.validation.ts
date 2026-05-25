import Joi from 'joi';

export const createArticleSchema = Joi.object({
  slug: Joi.string().trim().lowercase().required(),
  title: Joi.string().trim().required(),
  excerpt: Joi.string().allow(null, ''),
  body: Joi.string().required(),
  cover_media_id: Joi.string().uuid().allow(null),
  status: Joi.string().valid('draft', 'scheduled', 'published', 'archived').default('draft'),
  year: Joi.number().integer().min(1900).max(2200).required(),
  month: Joi.number().integer().min(1).max(12).required(),
  published_at: Joi.date().iso().allow(null),
  seo_title: Joi.string().allow(null, ''),
  seo_description: Joi.string().allow(null, ''),
  metadata: Joi.object().default({}),
});

export const archiveQuerySchema = Joi.object({
  year: Joi.number().integer().min(1900).max(2200),
  month: Joi.number().integer().min(1).max(12),
});
