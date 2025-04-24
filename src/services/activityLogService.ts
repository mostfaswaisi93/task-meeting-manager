import ActivityLog from "../models/ActivityLog";
import { Types } from "mongoose";

export const logActivity = async (
  action: string,
  entityType: string,
  entityId: Types.ObjectId,
  userId: Types.ObjectId,
  data: Record<string, any>
) => {
  const log = new ActivityLog({
    action,
    entityType,
    entityId,
    userId,
    data,
  });
  await log.save();
};
