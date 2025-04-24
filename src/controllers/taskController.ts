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

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    res.status(200).json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, assignedTo, dueDate, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, assignedTo, dueDate, status },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
