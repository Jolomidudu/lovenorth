import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL must be configured before using the database.");
}

const globalForNeon = globalThis as typeof globalThis & { neonPool?: Pool };
const pool = globalForNeon.neonPool ?? new Pool({ connectionString });

if (process.env.NODE_ENV !== "production") {
  globalForNeon.neonPool = pool;
}

export const db = drizzle(pool, { schema });