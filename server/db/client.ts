import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error("Database query error", { text, error });
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    // Check if tables exist, if not create them
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS apps (
        id SERIAL PRIMARY KEY,
        app_id VARCHAR(255) UNIQUE NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        framework VARCHAR(100) NOT NULL,
        repository VARCHAR(255) NOT NULL,
        branch VARCHAR(100) DEFAULT 'main',
        url VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'building',
        deployments INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );

      CREATE TABLE IF NOT EXISTS deployments (
        id SERIAL PRIMARY KEY,
        deploy_id VARCHAR(255) UNIQUE NOT NULL,
        app_id VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        commit VARCHAR(255),
        message VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (app_id) REFERENCES apps(app_id)
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_apps_user_id ON apps(user_id);
      CREATE INDEX IF NOT EXISTS idx_deployments_app_id ON deployments(app_id);
    `);
    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database tables", error);
    // Don't throw - tables might already exist
  }
}

export async function closeDatabase() {
  await pool.end();
}
