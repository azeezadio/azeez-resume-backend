import Joi from 'joi';

export const createMemoirSchema = Joi.object({
  slug: Joi.string().trim().lowercase().required(),
  title: Joi.string().trim().required(),
  summary: Joi.string().allow(null, ''),
  body: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(2200).required(),
  month: Joi.number().integer().min(1).max(12).required(),
  occurred_on: Joi.date().iso().allow(null),
  location: Joi.string().allow(null, ''),
  mood: Joi.string().allow(null, ''),
  cover_media_id: Joi.string().uuid().allow(null),
  status: Joi.string().valid('draft', 'scheduled', 'published', 'archived').default('draft'),
  published_at: Joi.date().iso().allow(null),
  metadata: Joi.object().default({}),
});

export const archiveQuerySchema = Joi.object({
  year: Joi.number().integer().min(1900).max(2200),
  month: Joi.number().integer().min(1).max(12),
});
