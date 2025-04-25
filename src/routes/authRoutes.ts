import express from "express";
import { register, login } from "../controllers/authController";
import { body } from "express-validator";
import validate from "../middlewares/validate";

const router = express.Router();

router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password at least 6 chars")
      .matches(/\d/)
      .withMessage("Password must contain a number")
      .matches(/[A-Za-z]/)
      .withMessage("Password must contain a letter"),
  ],
  validate,
  register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  validate,
  login
);

export default router;
