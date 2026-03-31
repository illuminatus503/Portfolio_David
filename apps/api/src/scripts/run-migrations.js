import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.resolve(__dirname, "../../migrations");

if (!process.env.DATABASE_URL) {
  console.log("[db:migrate] DATABASE_URL is not set. Skipping migrations.");
  process.exit(0);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false }
});

const main = async () => {
  const files = (await fs.readdir(migrationsDir))
    .filter((name) => name.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = await fs.readFile(path.join(migrationsDir, file), "utf8");
    console.log(`[db:migrate] applying ${file}`);
    await pool.query(sql);
  }

  await pool.end();
  console.log("[db:migrate] complete");
};

main().catch(async (error) => {
  console.error("[db:migrate] failed", error);
  await pool.end();
  process.exit(1);
});
