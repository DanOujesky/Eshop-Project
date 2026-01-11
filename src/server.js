import "dotenv/config";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { testDbConnection } from "./db/db.js";

const PORT = process.env.PORT || 5001;
const SERVER_URL = process.env.SERVER_URL || "http://localhost:";
const requiredEnvs = ["DB_HOST", "DB_USER", "DB_NAME", "DB_PASS"];

requiredEnvs.forEach((name) => {
  if (!process.env[name]) {
    console.error(`CHYBA: Chybí konfigurační proměnná ${name} v souboru .env!`);
    process.exit(1);
  }
});

const app = express();

app.use(express.json());
app.use(express.static("frontend"));

app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, async () => {
  const dbConnection = await testDbConnection();
  if (!dbConnection) process.exit(1);
  console.log(`Server běží na ${SERVER_URL}:${PORT}`);
});
