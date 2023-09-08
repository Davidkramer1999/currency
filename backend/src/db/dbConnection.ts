import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

let connection: mysql.Connection;

export async function createConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    console.log("Database connected");
  }
  return connection;
}
