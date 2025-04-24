import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMeeting extends Document {
  title: string;
  agenda?: string;
  participants: Types.ObjectId[];
  scheduledAt: Date;
  isDeleted: Boolean;
}

const meetingSchema = new Schema<IMeeting>(
  {
    title: { type: String, required: true },
    agenda: { type: String },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IMeeting>("Meeting", meetingSchema);
