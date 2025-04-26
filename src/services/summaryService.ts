import { sendMail } from "./emailService";
import i18n from "../config/i18n";
import User from "../models/User";
import Task from "../models/Task";
import Meeting from "../models/Meeting";

export const sendWeeklySummary = async () => {
  try {
    const users = await User.find({});

    for (const user of users) {
      if (!user.email) continue;

      i18n.setLocale(user.lang || "en");

      const pendingTasks = await Task.find({
        assignedTo: user._id,
        isCompleted: false,
        isDeleted: false,
      });

      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      const upcomingMeetings = await Meeting.find({
        participants: user._id,
        date: { $lte: nextWeek },
        isDeleted: false,
      });

      const pendingTasksList = pendingTasks
        .map((task) => `<li>${task.title}</li>`)
        .join("");
      const upcomingMeetingsList = upcomingMeetings
        .map(
          (meeting) =>
            `<li>${meeting.title} - ${meeting.date.toDateString()}</li>`
        )
        .join("");

      const htmlContent = `
        <h3>${i18n.__("summary.hello")}, ${user.name}!</h3>
        <p>${i18n.__("summary.pendingTasks")}:</p>
        <ul>${
          pendingTasksList || `<li>${i18n.__("summary.noPendingTasks")}</li>`
        }</ul>
        <p>${i18n.__("summary.upcomingMeetings")}:</p>
        <ul>${
          upcomingMeetingsList ||
          `<li>${i18n.__("summary.noUpcomingMeetings")}</li>`
        }</ul>
      `;

      await sendMail(user.email, i18n.__("summary.subject"), htmlContent);
    }
  } catch (error) {
    console.error("Error sending weekly summary:", error);
  }
};
