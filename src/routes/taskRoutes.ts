import express from "express";
import { body, param } from "express-validator";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getDeletedTasks,
  restoreTask,
} from "../controllers/taskController";
import { authenticate } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import validate from "../middlewares/validate";

const router = express.Router();

router.get("/", authenticate, authorize("view_task"), getTasks);

router.get(
  "/:id",
  authenticate,
  authorize("view_task"),
  [param("id").isMongoId().withMessage("Invalid task ID")],
  validate,
  getTaskById
);

router.post(
  "/",
  authenticate,
  authorize("create_task"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("assignedTo")
      .notEmpty()
      .isMongoId()
      .withMessage("Valid user ID required"),
    body("dueDate").isISO8601().withMessage("Invalid date format"),
  ],
  validate,
  createTask
);

router.put(
  "/:id",
  authenticate,
  authorize("edit_task"),
  [
    param("id").isMongoId().withMessage("Invalid task ID"),
    body("title").optional().notEmpty(),
    body("description").optional().isString(),
    body("assignedTo").optional().isMongoId(),
    body("dueDate").optional().isISO8601(),
    body("status").optional().isIn(["pending", "in_progress", "completed"]),
  ],
  validate,
  updateTask
);

router.delete(
  "/:id",
  authenticate,
  authorize("delete_task"),
  [param("id").isMongoId().withMessage("Invalid task ID")],
  validate,
  deleteTask
);

router.get("/deleted", authenticate, authorize("view_task"), getDeletedTasks);

router.patch(
  "/restore/:id",
  authenticate,
  authorize("edit_task"),
  [param("id").isMongoId().withMessage("Invalid task ID")],
  validate,
  restoreTask
);

export default router;
