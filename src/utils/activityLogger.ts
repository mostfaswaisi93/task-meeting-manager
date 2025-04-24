import ActivityLog from "../models/ActivityLog";
import { Request } from "express";

export const logActivity = async (
  user: string,
  action: string,
  entityType: string,
  entityId: string,
  details: string
) => {
  try {
    const log = new ActivityLog({
      user,
      action,
      entityType,
      entityId,
      details,
    });

    await log.save();
  } catch (err) {
    console.error("Error logging activity:", err);
  }
};
