import { Request, Response } from "express";
import * as authService from "../services/authService";
import logger from "../utils/logger";

export const register = async (req: Request, res: Response) => {
  console.log("REGISTER FUNCTION HIT");
  try {
    console.log("Received Body:", req.body);
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({ message: res.__("registered_success"), user });
  } catch (err: any) {
    logger.error(err.message);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res
      .status(200)
      .json({ message: res.__("login_success"), token: result.token });
  } catch (err: any) {
    logger.error(err.message);
    res.status(400).json({ error: err.message });
  }
};
