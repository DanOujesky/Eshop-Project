import express from "express";
import { getReport } from "../controllers/adminControllers.js";
import {
  importCustomers,
  importProducts,
} from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/report", getReport);
router.post("/import/products", importProducts);
router.post("/import/users", importCustomers);

export default router;
