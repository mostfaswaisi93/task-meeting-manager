import { Request, Response } from "express";
import Meeting from "../models/Meeting";

export const createMeeting = async (req: Request, res: Response) => {
  try {
    const { title, agenda, participants, scheduledAt } = req.body;

    const meeting = new Meeting({ title, agenda, participants, scheduledAt });
    await meeting.save();

    res.status(201).json({ message: res.__("meeting_created"), meeting });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
