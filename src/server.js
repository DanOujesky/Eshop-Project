import "dotenv/config";
import express from "express";
import productRoutes from "./routes/productRoutes.js";

const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;

const app = express();

app.use(express.json());
app.use(express.static("frontend"));

app.use("api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server běží na ${SERVER_URL}:${PORT}`);
});
