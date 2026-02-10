import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import { MODE } from "./src/utils/commonConstants";

const host = MODE === "local" ? process.env.DATABASE_HOST_LOCAL : process.env.DATABASE_HOST;
const database = MODE === "local" ? process.env.DATABASE_NAME_LOCAL : process.env.DATABASE_NAME;

if (!host) {
  throw new Error("DATABASE_HOST is not set in environment variables");
}
if (!database) {
  throw new Error("DATABASE_NAME is not set in environment variables");
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    host,
    user: MODE === "local" ? process.env.DATABASE_USER_LOCAL : process.env.DATABASE_USER,
    password: MODE === "local" ? process.env.DATABASE_PASSWORD_LOCAL : process.env.DATABASE_PASSWORD,
    database,
    port: Number(MODE === "local" ? process.env.DATABASE_PORT_LOCAL : process.env.DATABASE_PORT) || 3306,
  },
  // Add this to use a single connection for migrations
  migrations: {
    table: 'drizzle_migrations',
    schema: 'public',
  },
});