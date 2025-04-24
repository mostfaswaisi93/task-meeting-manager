import ActivityLog from "../models/ActivityLog";

export const logActivity = async ({
  userId,
  action,
  entity,
  entityId,
  description,
}: {
  userId: string;
  action: "create" | "update" | "delete" | "restore";
  entity: "Task" | "Meeting" | "Role" | "Permission";
  entityId: string;
  description?: string;
}) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      entity,
      entityId,
      description,
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};
