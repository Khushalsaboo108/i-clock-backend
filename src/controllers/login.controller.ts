import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../config/dbConnect";
import { admin } from "../db/schema";
import { eq } from "drizzle-orm";
import { ApiError } from "../utils/ApiError";
import { hashedPassword } from "../utils/commonFunction";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ILogin } from "../types/admin.type";

export const login = asyncHandler(
  async (req: FastifyRequest<{ Body: ILogin }>, res: FastifyReply) => {
    let { name, password } = req.body;

    if (!name || !password) {
      throw new ApiError("All fields are required", 400);
    }

    const adminRecord = await db
      .select()
      .from(admin)
      .where(eq(admin.name, name));

    let adminRecordData = adminRecord[0];

    if (adminRecord.length === 0) {
      throw new ApiError("Invalid name or Password", 400);
    }
    const increaptPassword = hashedPassword(password);

    if (increaptPassword !== adminRecordData.password) {
      throw new ApiError("Invalid password", 400);
    }

    if (adminRecordData.status !== "Active") {
      throw new ApiError("Account is disabled", 401);
    }

    const access_token = jwt.sign(
      {
        id: adminRecordData.admin_id,
        name: adminRecordData.name,
      },
      process.env.JWT_SECRET || "SECRET",
      { expiresIn: "7d" },
    );

    const refresh_token = jwt.sign(
      {
        id: adminRecordData.admin_id,
        name: adminRecordData.name,
      },
      process.env.JWT_SECRET || "SECRET",
      { expiresIn: "7d" },
    );

    res
      .setCookie("access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        domain: ".mentem.in",
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      })
      .status(200)
      .send({
        success: true,
        message: "login successfull",
      });
  },
);

export const adminProfile = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  reply.send({
    success: true,
    message: "Admin profile retrieved successfully",
    data: req.admin,
  });
};
