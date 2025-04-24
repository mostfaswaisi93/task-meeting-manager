import express from "express";
import { body, param } from "express-validator";
import {
  getMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "../controllers/meetingController";
import { authenticate } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import validate from "../middlewares/validate";

const router = express.Router();

router.get("/", authenticate, authorize("view_meeting"), getMeetings);

router.get(
  "/:id",
  authenticate,
  authorize("view_meeting"),
  [param("id").isMongoId().withMessage("Invalid meeting ID")],
  validate,
  getMeetingById
);

router.post(
  "/",
  authenticate,
  authorize("create_meeting"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("scheduledAt").isISO8601().withMessage("Invalid date format"),
  ],
  validate,
  createMeeting
);

router.put(
  "/:id",
  authenticate,
  authorize("edit_meeting"),
  [
    param("id").isMongoId().withMessage("Invalid meeting ID"),
    body("title").notEmpty().withMessage("Title is required"),
    body("scheduledAt").isISO8601().withMessage("Invalid date format"),
  ],
  validate,
  updateMeeting
);

router.delete(
  "/:id",
  authenticate,
  authorize("delete_meeting"),
  [param("id").isMongoId().withMessage("Invalid meeting ID")],
  validate,
  deleteMeeting
);

export default router;
