import "dotenv/config";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;

const app = express();

app.use(express.json());
app.use(express.static("frontend"));

app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server běží na ${SERVER_URL}:${PORT}`);
});
