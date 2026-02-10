import type { FastifyReply, FastifyRequest } from 'fastify';
import { ApiError } from './ApiError';

export const handleError = (err: any, req: FastifyRequest, res: FastifyReply) => {
  const statusCode = err && err.statusCode ? err.statusCode : 500;
  const message = err && err.message ? err.message : 'Internal Server Error';

  if (err instanceof ApiError) {
    return res.status(err.statusCode).send({
      success: false,
      message: err.message,
    });
  }

  return res.status(statusCode).send({
    success: 'error',
    message,
  });
};
