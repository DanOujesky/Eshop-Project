import express from "express";
import { getReport } from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/report", getReport);

export default router;
