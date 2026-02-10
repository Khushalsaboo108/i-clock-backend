import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { db } from '../config/dbConnect';
import { admin } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { FastifyRequest, FastifyReply } from 'fastify';

declare global {
  namespace FastifyInstance {
    interface FastifyRequest {
      admin?: {
        id: number;
        name: string;
        user_type: string;
        status: string;
      };
    }
  }
}

const authenticateToken = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    // Get token from Authorization header or cookies
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError("Access token is missing", 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "SECRET"
    ) as {
      id: number;
      name: string;
      iat?: number;
    };

    // Fetch admin record to validate token
    const adminRecord = await db
      .select()
      .from(admin)
      .where(eq(admin.admin_id, Number(decoded.id)));

    if (!adminRecord || adminRecord.length === 0) {
      throw new ApiError("Admin not found", 401);
    }

    const adminRow = adminRecord[0];

    // If token was issued before the user's last update, invalidate it
    if (decoded.iat && adminRow.updated_at) {
      const tokenIatSeconds = Number(decoded.iat);
      const updatedAtSeconds = Math.floor(
        new Date(adminRow.updated_at).getTime() / 1000
      );

      if (tokenIatSeconds < updatedAtSeconds) {
        throw new ApiError(
          "Token has been invalidated. Please login again.",
          401
        );
      }
    }

    // Attach admin data to request
    (request as any).admin = {
      id: Number(decoded.id),
      name: decoded.name,
    };
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error?.name === "TokenExpiredError") {
      throw new ApiError("Token has expired", 401);
    }

    throw new ApiError(error?.message || "Invalid token", 403);
  }
};


export default authenticateToken