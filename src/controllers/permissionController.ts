import { Request, Response } from "express";
import Permission from "../models/Permission";

export const createPermission = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const existing = await Permission.findOne({ name });
    if (existing) return res.status(400).json({ error: "Permission exists" });

    const permission = new Permission({ name });
    await permission.save();
    res.status(201).json(permission);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
