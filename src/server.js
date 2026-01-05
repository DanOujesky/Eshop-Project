import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;

const app = express();

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server běží na ${SERVER_URL}:${PORT}`);
});
