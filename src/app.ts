import express from "express";
import mongoose from "mongoose";
import i18n from "i18n";
import path from "path";
import logger from "./utils/logger";
import { connectRabbitMQ } from "./config/rabbitmq";
import redisClient from "./config/redis";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import meetingRoutes from "./routes/meetingRoutes";
import { createSuperAdmin } from "./seeder/createSuperAdmin";
import adminRoutes from "./routes/adminRoutes";
import dotenv from "dotenv";
import connectDB from "./config/database";

dotenv.config();

const app = express();

// Middleware for routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/admin", adminRoutes);

// i18n configuration
i18n.configure({
  locales: ["en", "ar"],
  defaultLocale: "en",
  directory: path.join(__dirname, "locales"),
  objectNotation: true,
});
app.use(i18n.init);

// Middlewares
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send({ message: res.__("welcome") });
});

// MongoDB connection
connectDB();

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err.stack);
  res.status(500).send({ error: res.__("internal_error") });
});

// Connect to RabbitMQ and Redis
// (async () => {
//   try {
//     await connectRabbitMQ();
//     await redisClient.connect();
//   } catch (error) {
//     console.error("Error while connecting to RabbitMQ or Redis", error);
//     process.exit(1);
//   }
// })();

export default app;
