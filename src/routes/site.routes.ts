import type { FastifyInstance } from "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";

import {
  createSite,
  deleteSite,
  getSingleSite,
  getSiteDetails,
  updateSite,
} from "../controllers/site.controller";
import authenticateToken from "../middleware/adminMiddleware";
import { IPagination } from "../types/common.type";
import { ISiteCreate } from "../types/site.type";
import { create_site } from "../validations/site.validation";
import { requireAdminSession } from "../middleware/auth.session";

export default async function adminRoutes(fastify: FastifyInstance) {
  
  fastify.get(
    "/",
    { preHandler: [requireAdminSession] },
    async (request, reply) => {
      await getSiteDetails(
        request as FastifyRequest<{ Querystring: IPagination }>,
        reply as FastifyReply,
      );
    },
  );

  fastify.get(
    "/:id",
    { preHandler: [requireAdminSession] },
    async (request, reply) => {
      await getSingleSite(
        request as FastifyRequest<{ Params: { id: number } }>,
        reply as FastifyReply,
      );
    },
  );

  fastify.post(
    "/",
    {
      preHandler: [requireAdminSession],
      schema: create_site,
    },
    async (request, reply) => {
      await createSite(
        request as FastifyRequest<{ Body: ISiteCreate }>,
        reply as FastifyReply,
      );
    },
  );

  fastify.patch(
    "/:id",
    { preHandler: [requireAdminSession], schema: create_site },
    async (request, reply) => {
      await updateSite(
        request as FastifyRequest<{
          Params: { id: number };
          Body: ISiteCreate;
        }>,
        reply as FastifyReply,
      );
    },
  );

  fastify.delete(
    "/:id",
    { preHandler: [requireAdminSession] },
    async (request, reply) => {
      await deleteSite(
        request as FastifyRequest<{ Params: { id: number } }>,
        reply as FastifyReply,
      );
    },
  );
}
