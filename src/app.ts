import Fastify from 'fastify';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { handleError } from "./utils/ErrorHandler";
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';

import adminRoutes from "./routes/admin.routes"
import siteRoutes from "./routes/site.routes"
import loginRoutes from "./routes/login.routes"

const app: FastifyInstance = Fastify({ logger: true, trustProxy: true, });

// CORS handling (simple, whitelist-based)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
   process.env.FRONTEND_URL!,
];

console.log('CORS check for allowedOrigins:', allowedOrigins)

app.register(cors, {
  origin: (origin, cb) => {

    console.log('CORS check for origin:', origin)

    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      cb(new Error('CORS blocked'), false)
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Cookie handling
app.register(cookie);


// Keep a small health route
app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send({ success: true, version: '0.0', message: 'Welcome to i-clock' });
});

// Not found
app.setNotFoundHandler((request, reply) => {
  return reply.code(404).send({ success: false, message: 'Route not found' });
});

// Centralized error handling for Fastify
app.setErrorHandler((error, request, reply) => {
  return handleError(error, request, reply);
});

const URL_POINT = "/api"
app.register(loginRoutes, { prefix: `${URL_POINT}/` })
app.register(adminRoutes, { prefix: `${URL_POINT}/admin` })
app.register(siteRoutes, { prefix: `${URL_POINT}/site` })

export default app;
