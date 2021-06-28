const path = require('path');
const envPath = path.resolve(process.cwd(), '.env.local');

console.log({ envPath });

require('dotenv').config({ path: envPath });

const mysql = require('serverless-mysql');

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  },
});

async function query(queryString) {
  try {
    const results = await db.query(queryString);
    await db.end();
    return results;
  } catch (error) {
    throw Error(error.message);
  }
}

async function migrate() {
  try {
    await query(`
    CREATE TABLE IF NOT EXISTS styles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL,
      avg_bpm TEXT NOT NULL,
      variance TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `);

    await query(`
    CREATE TABLE IF NOT EXISTS songs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      artist TEXT NOT NULL,
      name TEXT NOT NULL,
      tempo TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `);
    console.log('Migration success!');
  } catch (error) {
    console.error(`Migration failed: ${error.message}`);
    process.exit(1);
  }
}

migrate().then(() => process.exit());
