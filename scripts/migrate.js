// Run: node scripts/migrate.js
const { readFileSync } = require("fs");
const path = require("path");
// Load .env.local manually (no dotenv dependency)
try {
  const envFile = readFileSync(path.join(__dirname, "../.env.local"), "utf-8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (key && !process.env[key]) process.env[key] = val;
  }
} catch {}
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

const schema = `
CREATE TABLE IF NOT EXISTS waitlist (
  id         SERIAL PRIMARY KEY,
  full_name  VARCHAR(255) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  company    VARCHAR(255) NOT NULL,
  ai_vendor  VARCHAR(500),
  use_case   TEXT,
  source     VARCHAR(100) DEFAULT 'landing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);
CREATE INDEX IF NOT EXISTS waitlist_created_idx ON waitlist (created_at DESC);
`;

async function migrate() {
  const client = await pool.connect();
  try {
    console.log("Running migrations...");
    await client.query(schema);
    console.log("Done.");
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
