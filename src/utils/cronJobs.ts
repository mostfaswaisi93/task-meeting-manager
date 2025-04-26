import cron from "node-cron";
import { sendWeeklySummary } from "../services/summaryService";

export const scheduleWeeklySummary = () => {
  cron.schedule("0 9 * * 0", async () => {
    console.log("Sending weekly summaries...");
    await sendWeeklySummary();
  });
};
