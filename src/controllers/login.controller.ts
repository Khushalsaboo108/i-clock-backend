import { FastifyReply, FastifyRequest } from 'fastify'
import { db } from '../config/dbConnect'
import { admin } from '../db/schema'
import { eq } from 'drizzle-orm'
import { ApiError } from '../utils/ApiError'
import { hashedPassword } from '../utils/commonFunction'

export const login = async (
  req: FastifyRequest<{ Body: { name: string; password: string } }>,
  reply: FastifyReply
) => {
  const { name, password } = req.body

  const [adminRecord] = await db
    .select()
    .from(admin)
    .where(eq(admin.name, name))

  if (!adminRecord) {
    throw new ApiError('Invalid credentials', 400)
  }

  if (hashedPassword(password) !== adminRecord.password) {
    throw new ApiError('Invalid credentials', 400)
  }

  if (adminRecord.status !== 'Active') {
    throw new ApiError('Account disabled', 401)
  }

  // 🔐 STORE SESSION SERVER-SIDE
  req.session.admin = {
    id: adminRecord.admin_id,
    name: adminRecord.name,
    user_type: adminRecord.user_type,
    status: adminRecord.status,
  }

  reply.send({ success: true, message: 'Login successful' })
}

export const adminProfile = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  reply.send({
    success: true,
    message: 'Admin profile retrieved successfully',
    data: req.admin,
  })
}
