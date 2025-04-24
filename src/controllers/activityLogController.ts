import ActivityLog from "../models/ActivityLog";
import { Request, Response } from "express";

export const getActivityLogs = async (req: Request, res: Response) => {
  try {
    const logs = await ActivityLog.find()
      .populate("userId", "name email")
      .limit(50);
    res.status(200).json(logs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
