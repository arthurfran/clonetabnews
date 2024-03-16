import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
  });
  console.log("os valores retornados são:", {
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
  });
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
