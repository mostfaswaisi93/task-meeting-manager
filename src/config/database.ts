import mongoose from "mongoose";
import dotenv from "dotenv";
import { createSuperAdmin } from "../seeder/createSuperAdmin";

dotenv.config();

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`);
    await createSuperAdmin();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
