import type { FastifyInstance } from "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";

import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
} from "../controllers/admin.controller";
import {
  create_admin_schema,
} from "../validations/admin.validation";
import authenticateToken from "../middleware/adminMiddleware";
import { ICreateAdminBody } from "../types/admin.type";
import { IPagination } from "../types/common.type";
import { requireAdminSession } from "../middleware/auth.session";

export default async function adminRoutes(fastify: FastifyInstance) {

  fastify.get(
    "/",
    { preHandler: [requireAdminSession] },
    async (request, reply) => {
      await getAdmin(
        request as FastifyRequest<{ Querystring: IPagination }>,
        reply as FastifyReply,
      );
    },
  );

  fastify.get(
    "/:id",
    { preHandler: [requireAdminSession] },
    async (request, reply) => {
      await getAdminById(
        request as FastifyRequest<{ Params: { id: number } }>,
        reply as FastifyReply,
      );
    },
  );

  fastify.post(
    "/",
    {
      preHandler: [requireAdminSession],
      schema: create_admin_schema,
    },
    async (request, reply) => {
      await createAdmin(
        request as FastifyRequest<{ Body: ICreateAdminBody }>,
        reply as FastifyReply,
      );
    },
  );

  fastify.patch(
    "/:id",
    {
      preHandler: [requireAdminSession],
      schema: create_admin_schema,
    },
    async (request, reply) => {
      await updateAdmin(
        request as FastifyRequest<{
          Params: { id: number };
          Body: ICreateAdminBody;
        }>,
        reply as FastifyReply,
      );
    },
  );

  fastify.delete(
    "/:id",
    { preHandler: [requireAdminSession] },
    async (request, reply) => {
      await deleteAdmin(
        request as FastifyRequest<{ Params: { id: number } }>,
        reply as FastifyReply,
      );
    },
  );

}
