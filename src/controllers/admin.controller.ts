import type { FastifyReply, FastifyRequest } from "fastify";

import { asyncHandler } from "../utils/asyncHandler";
import { db } from "../config/dbConnect";
import { admin } from "../db/schema";
import { ICreateAdminBody, ILogin } from "../types/admin.type";
import { ApiError } from "../utils/ApiError";
import { eq } from "drizzle-orm";
import { hashedPassword } from "../utils/commonFunction";
import jwt from "jsonwebtoken";
import { IPagination } from "../types/common.type";

export const createAdmin = asyncHandler(
  async (
    req: FastifyRequest<{ Body: ICreateAdminBody }>,
    res: FastifyReply,
  ) => {
    const {
      pin,
      name,
      permlevel,
      site_id,
      password,
      status,
      user_type,
      horizontal_bulk_employee,
      vertical_bulk_reader,
    } = req.body;

    const admin_record = {
      name,
      pin,
      permlevel,
      site_id,
      password,
      status,
      user_type,
      horizontal_bulk_employee,
      vertical_bulk_reader,
    };

    // await db.insert(admin).values(admin_record);

    res
      .status(200)
      .send({ success: true, message: "Admin created successfully" });
  },
);

export const getAdmin = asyncHandler(
  async (
    req: FastifyRequest<{ Querystring: IPagination }>,
    res: FastifyReply,
  ) => {
    const { page, limit } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;

    const offset = (pageNum - 1) * limitNum;

    const adminRecords = await db
      .select()
      .from(admin)
      .limit(limitNum)
      .offset(offset);

    res.status(200).send({
      success: true,
      message: "Admin data fetched successfully",
      data: adminRecords,
      pagination: {
        total: adminRecords.length,
        page: pageNum,
        limit: limitNum,
      },
    });
  },
);


export const getAdminById = asyncHandler(
  async (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
    const { id } = req.params;

    const adminRecord = await db
      .select()
      .from(admin)
      .where(eq(admin.admin_id, id));

    if (adminRecord.length === 0) {
      throw new ApiError("Admin not found", 404);
    }

    res.status(200).send({
      success: true,
      message: "Single Admin data fetched successfully",
      data: adminRecord[0],
    });
  },
);

export const updateAdmin = asyncHandler(
  async (
    req: FastifyRequest<{ Params: { id: number }; Body: ICreateAdminBody }>,
    res: FastifyReply,
  ) => {
    const { id } = req.params;
    const {
      name,
      pin,
      permlevel,
      site_id,
      // password,  --- IGNORE ---
      status,
      user_type,
      horizontal_bulk_employee,
      vertical_bulk_reader,
    } = req.body;

    const existingAdmin = await db
      .select()
      .from(admin)
      .where(eq(admin.admin_id, id));

    if (existingAdmin.length === 0) {
      throw new ApiError("Admin not found", 404);
    }

    const updatedAdminRecord = {
      name,
      pin,
      permlevel,
      site_id,
      // password: hashedPassword(password),
      status,
      user_type,
      horizontal_bulk_employee,
      vertical_bulk_reader,
    };

    await db.update(admin).set(updatedAdminRecord).where(eq(admin.admin_id, id));

    res.status(200).send({ success: true, message: "Admin updated successfully" });
  },
);

export const deleteAdmin = asyncHandler(
  async (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
    const { id } = req.params;

    const existingAdmin = await db
      .select()
      .from(admin)
      .where(eq(admin.admin_id, id));

    if (existingAdmin.length === 0) {
      throw new ApiError("Admin not found", 404);
    }

    await db.delete(admin).where(eq(admin.admin_id, id));

    res.status(200).send({ success: true, message: "Admin deleted successfully" });
  },
);
