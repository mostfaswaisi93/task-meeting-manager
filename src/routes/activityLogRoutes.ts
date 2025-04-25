import express from "express";
import { authenticate } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import { getActivityLogs } from "../controllers/activityLogController";

const router = express.Router();

router.get("/", authenticate, authorize("view_activity_log"), getActivityLogs);

export default router;
