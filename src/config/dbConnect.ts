import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import "dotenv/config";
import { MODE } from "../utils/commonConstants";

export const getDatabaseCredentials = () => {
  console.log("Current Database Environment:", MODE);
  
  if (MODE === "local") {
    return {
      host: process.env.DATABASE_HOST_LOCAL,
      user: process.env.DATABASE_USER_LOCAL,
      password: process.env.DATABASE_PASSWORD_LOCAL,
      database: process.env.DATABASE_NAME_LOCAL,
      port: Number(process.env.DATABASE_PORT_LOCAL) || 3306,
    };
  } else {
    return {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: Number(process.env.DATABASE_PORT) || 3306,
    };
  }
};

export const pool = mysql.createPool({
  ...getDatabaseCredentials(),
  connectTimeout: 20000,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const db = drizzle(pool, {
  logger: false, // Changed from true to false to stop query logging
});

// Database connection function
export const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    console.log("Database connected successfully!");
    connection.release();
    return true;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return false;
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});