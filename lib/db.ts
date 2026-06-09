import { Pool } from "pg";

declare global {
  var _pgPool: Pool | undefined;
}

function getPool(): Pool {
  if (globalThis._pgPool) return globalThis._pgPool;

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  const pool = new Pool({
    connectionString: url,
    ssl: url.includes("localhost") ? false : { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
  });

  if (process.env.NODE_ENV !== "production") globalThis._pgPool = pool;
  return pool;
}

// Proxy so callers do `pool.query(...)` without caring about lazy init
const pool = new Proxy({} as Pool, {
  get(_target, prop) {
    return (getPool() as unknown as Record<string, unknown>)[prop as string];
  },
});

export default pool;
