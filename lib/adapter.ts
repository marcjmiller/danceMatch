// import mysql from 'serverless-mysql';

import mysql from 'serverless-mysql';

export const mySqlDb = mysql({
  config: {
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'DanceMatch',
    user: process.env.DB_USERNAME || 'dance',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  },
});

export async function query(queryString: string, values: (string | number)[] | string | number = []) {
  try {
    const results = await mySqlDb.query(queryString, values);
    await mySqlDb.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}

export {};
