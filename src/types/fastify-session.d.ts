import 'fastify'
import '@fastify/session'

declare module '@fastify/session' {
  interface FastifySessionObject {
    admin?: {
      id: number
      name: string
      user_type: string
      status: string
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    admin?: {
      id: number
      name: string
      user_type: string
      status: string
    }
  }
}
