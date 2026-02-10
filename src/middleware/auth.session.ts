import { FastifyRequest, FastifyReply } from 'fastify'
import { ApiError } from '../utils/ApiError'

export const requireAdminSession = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  if (!req.session.admin) {
    throw new ApiError('Unauthorized', 401)
  }

  req.admin = req.session.admin
}
