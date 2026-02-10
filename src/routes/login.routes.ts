import { FastifyInstance } from 'fastify'
import type { FastifyReply, FastifyRequest } from "fastify";

import { adminProfile, login } from '../controllers/login.controller'
import authenticateToken from '../middleware/adminMiddleware';
import { login_schema } from '../validations/admin.validation';
import { requireAdminSession } from '../middleware/auth.session';

export default async function adminRoutes(fastify: FastifyInstance) {
  
  fastify.post(
    "/login",
    {
      schema: login_schema,
    },
    login,
  );

  fastify.get(
    '/profile',
    { preHandler: [requireAdminSession] },
    adminProfile
  );

  fastify.post('/logout', async (req, reply) => {
    await req.session.destroy()
    reply.send({ success: true })
  })
}
