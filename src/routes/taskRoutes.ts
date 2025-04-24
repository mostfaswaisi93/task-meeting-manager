import express from "express";
import { body } from "express-validator";
import { createTask } from "../controllers/taskController";
import { authenticate } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import validate from "../middlewares/validate";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("create_task"),
  [
    body("title").notEmpty(),
    body("assignedTo").notEmpty(),
    body("dueDate").isISO8601().withMessage("Invalid date format"),
  ],
  validate,
  createTask
);

export default router;
