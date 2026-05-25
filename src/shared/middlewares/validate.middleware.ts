import type Joi from 'joi';
import type { NextHandler, Request, Response } from '@shared/types/restana.type';
import { AppError } from '@shared/utils/error/app.error';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate =
  (schema: Joi.ObjectSchema, target: ValidationTarget = 'body') =>
  (req: Request, _res: Response, next: NextHandler) => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new AppError(error.message, 422, 'VALIDATION_ERROR');
    }

    req[target] = value;
    return next();
  };
