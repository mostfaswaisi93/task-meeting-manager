import mongoose, { Document, Schema } from "mongoose";

export interface IPermission extends Document {
  name: string;
}

const permissionSchema = new Schema<IPermission>({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<IPermission>("Permission", permissionSchema);
