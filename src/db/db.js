import mysql from "mysql2/promise";
import { config } from "../config/config.js";

export const pool = mysql.createPool(config.db);

export const testDbConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Připojení k databázi bylo úspěšné.");
    connection.release();
    return true;
  } catch (error) {
    console.error("Nepodařilo se připojit k databázi:");
    console.error(
      `Host: ${config.db.host}, User: ${config.db.user}, DB: ${config.db.name}`
    );
    console.error(`Důvod: ${error.message}`);
    return false;
  }
};
