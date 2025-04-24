import { Request, Response } from "express";
import Task from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    const task = new Task({ title, description, assignedTo, dueDate });
    await task.save();

    res.status(201).json({ message: res.__("task_created"), task });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
