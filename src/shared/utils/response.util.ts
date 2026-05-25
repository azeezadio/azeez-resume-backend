import type { Request, Response } from '@shared/types/restana.type';
import { AppError } from '@shared/utils/error/app.error';
import logger from '@shared/utils/logger';

export const ok = <T>(res: Response, data: T, message = 'ok') =>
  res.send({
    success: true,
    message,
    data,
  });

export const created = <T>(res: Response, data: T, message = 'created') =>
  res.send(
    {
      success: true,
      message,
      data,
    },
    201,
  );

export const routeNotFound = (_req: Request, res: Response) =>
  res.send(
    {
      success: false,
      message: 'Route not found',
      error: {
        code: 'ROUTE_NOT_FOUND',
      },
    },
    404,
  );

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
) => {
  if (err instanceof AppError) {
    return res.send(
      {
        success: false,
        message: err.message,
        error: {
          code: err.code,
        },
      },
      err.statusCode,
    );
  }

  logger.error({ err });
  return res.send(
    {
      success: false,
      message: 'Internal server error',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
      },
    },
    500,
  );
};
