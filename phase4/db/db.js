import { Client } from "https://deno.land/x/postgres/mod.ts";

// Set up PostgreSQL client connection
const client = new Client({
  user: "postgres",
  database: "postgres",
  hostname: "localhost",
  password: "asd123",
  port: 5432,
});

await client.connect();

export default client;
