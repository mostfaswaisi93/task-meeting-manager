import { ActivityLog } from "../models/ActivityLog";
import { Request } from "express";

export const logActivity = async ({
  req,
  action,
  entity,
  entityId,
  description,
}: {
  req: Request;
  action: "create" | "update" | "delete" | "restore";
  entity: "Task" | "Meeting" | "User" | "Role";
  entityId: string;
  description?: string;
}) => {
  try {
    await ActivityLog.create({
      user: req.user?._id,
      action,
      entity,
      entityId,
      description,
    });
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
};
