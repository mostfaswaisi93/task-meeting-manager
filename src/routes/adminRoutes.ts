import { Router } from "express";
import { body } from "express-validator";
import { createPermission } from "../controllers/permissionController";
import { createRole } from "../controllers/roleController";
import { assignRoleToUser } from "../controllers/userController";
import { authenticate } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import validate from "../middlewares/validate";

const router = Router();

router.post(
  "/permissions",
  authenticate,
  authorize("create_permission"),
  [body("name").notEmpty()],
  validate,
  createPermission
);

router.post(
  "/roles",
  authenticate,
  authorize("create_role"),
  [body("name").notEmpty(), body("permissions").isArray()],
  validate,
  createRole
);

router.post(
  "/assign-role",
  authenticate,
  authorize("assign_roles"),
  [body("userId").notEmpty(), body("roleId").notEmpty()],
  validate,
  assignRoleToUser
);

export default router;
