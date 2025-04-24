import express from "express";
import { body } from "express-validator";
import { createMeeting } from "../controllers/meetingController";
import { authenticate } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import validate from "../middlewares/validate";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("create_meeting"),
  [body("title").notEmpty(), body("scheduledAt").isISO8601()],
  validate,
  createMeeting
);

export default router;
