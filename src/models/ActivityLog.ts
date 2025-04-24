import { Schema, model, Document } from "mongoose";

export interface IActivityLog extends Document {
  user: Schema.Types.ObjectId;
  action: "create" | "update" | "delete" | "restore";
  entity: "Task" | "Meeting" | "Role" | "Permission";
  entityId: Schema.Types.ObjectId;
  description?: string;
  timestamp: Date;
}

const activityLogSchema = new Schema<IActivityLog>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: {
    type: String,
    enum: ["create", "update", "delete", "restore"],
    required: true,
  },
  entity: {
    type: String,
    enum: ["Task", "Meeting", "Role", "Permission"],
    required: true,
  },
  entityId: { type: Schema.Types.ObjectId, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default model<IActivityLog>("ActivityLog", activityLogSchema);
