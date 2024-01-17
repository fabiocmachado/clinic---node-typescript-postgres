import { Pool } from "pg";
import 'dotenv/config';

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 5432,
  });
  
  export default db;