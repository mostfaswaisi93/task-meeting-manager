import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRole extends Document {
  name: string;
  permissions: Types.ObjectId[];
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
});

export default mongoose.model<IRole>("Role", roleSchema);
