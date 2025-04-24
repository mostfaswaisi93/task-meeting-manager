import express from "express";
import mongoose from "mongoose";
import i18n from "i18n";
import path from "path";
import logger from "./utils/logger";

const app = express();

i18n.configure({
  locales: ["en", "ar"],
  defaultLocale: "en",
  directory: path.join(__dirname, "locales"),
  objectNotation: true,
});
app.use(i18n.init);

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: res.__("welcome") });
});

app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err.stack);
  res.status(500).send({ error: res.__("internal_error") });
});

mongoose
  .connect(process.env.MONGO_URI || "", {
    dbName: "taskManager",
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default app;
