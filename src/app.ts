import express from "express";
import mongoose from "mongoose";
import i18n from "i18n";
import path from "path";

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
