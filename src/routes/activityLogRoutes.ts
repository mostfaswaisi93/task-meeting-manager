import express from "express";
import { getActivityLogs } from "../controllers/activityLogController";

const router = express.Router();

router.get("/logs", getActivityLogs);

export default router;
