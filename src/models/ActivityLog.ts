import { Schema, model, Document } from "mongoose";

interface IActivityLog extends Document {
  action: string;
  entityType: string;
  entityId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  data: Record<string, any>;
  createdAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "entityType",
    },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const ActivityLog = model<IActivityLog>("ActivityLog", activityLogSchema);

export default ActivityLog;
