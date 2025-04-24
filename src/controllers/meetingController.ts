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

export const getMeetings = async (req: Request, res: Response) => {
  try {
    const meetings = await Meeting.find().populate(
      "participants",
      "name email"
    );
    res.status(200).json(meetings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMeetingById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const meeting = await Meeting.findById(req.params.id).populate(
      "participants",
      "name email"
    );
    if (!meeting) {
      res.status(404).json({ error: "Meeting not found" });
      return;
    }
    res.status(200).json(meeting);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMeeting = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, agenda, participants, scheduledAt } = req.body;
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { title, agenda, participants, scheduledAt },
      { new: true }
    );
    if (!meeting) {
      res.status(404).json({ error: "Meeting not found" });
      return;
    }
    res.status(200).json(meeting);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMeeting = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!meeting) {
      res.status(404).json({ error: "Meeting not found" });
      return;
    }
    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
