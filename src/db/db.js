import mysql from "mysql2/promise";
import config from "../config/config.json" assert { type: "json" };

export const pool = mysql.createPool(config.db);
