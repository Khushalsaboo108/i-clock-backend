import type { FastifyReply, FastifyRequest } from 'fastify';

type AsyncHandler<T = FastifyRequest> = (
  req: T,
  res: FastifyReply
) => Promise<unknown>;

export const asyncHandler =
  <T = FastifyRequest>(fn: AsyncHandler<T>) =>
  async (req: T, res: FastifyReply): Promise<void> => {
    try {
      await fn(req, res);
    } catch (error: any) {
      if (res.sent) return;

      const statusCode = error?.statusCode ?? 500;

      res.status(statusCode).send({
        success: false,
        message: error?.message ?? 'Internal Server Error',
      });
    }
  };
