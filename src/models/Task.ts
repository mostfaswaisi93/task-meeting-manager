import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  assignedTo: Types.ObjectId;
  dueDate: Date;
  status: "pending" | "in_progress" | "done";
  isDeleted: Boolean;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["pending", "in_progress", "done"],
      default: "pending",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);
