import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMeeting extends Document {
  title: string;
  agenda?: string;
  participants: Types.ObjectId[];
  scheduledAt: Date;
}

const meetingSchema = new Schema<IMeeting>(
  {
    title: { type: String, required: true },
    agenda: { type: String },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    scheduledAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMeeting>("Meeting", meetingSchema);
