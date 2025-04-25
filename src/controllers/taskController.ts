import { Request, Response } from "express";
import Task from "../models/Task";
import ActivityLog from "../models/ActivityLog";
import RabbitMQService from "../services/rabbitmq";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ isDeleted: false }).populate("assignedTo");
    res.status(200).json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, assignedTo, dueDate, status } = req.body;
    const task = new Task({ title, description, assignedTo, dueDate, status });
    await task.save();

    const activityLog = new ActivityLog({
      action: "Create",
      entity: "Task",
      entityId: task._id,
      // performedBy: req.user._id,
      details: `Created new task: ${task.title}`,
    });
    await activityLog.save();

    const message = JSON.stringify({
      type: "task_created",
      taskId: task._id,
      title: task.title,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
    });
    await RabbitMQService.sendToQueue("task_notifications", message);

    res.status(201).json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, assignedTo, dueDate, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, assignedTo, dueDate, status },
      { new: true }
    );

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const activityLog = new ActivityLog({
      action: "Update",
      entity: "Task",
      entityId: task._id,
      // performedBy: req.user._id,
      details: `Updated task: ${task.title}`,
    });
    await activityLog.save();

    res.status(200).json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const activityLog = new ActivityLog({
      action: "Delete",
      entity: "Task",
      entityId: task._id,
      // performedBy: req.user._id,
      details: `Deleted task: ${task.title}`,
    });
    await activityLog.save();

    res.status(200).json({ message: "Task marked as deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getDeletedTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await Task.find({ isDeleted: true }).populate("assignedTo");
    res.status(200).json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const restoreTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true }
    );

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const activityLog = new ActivityLog({
      action: "Restore",
      entity: "Task",
      entityId: task._id,
      // performedBy: req.user._id,
      details: `Restored task: ${task.title}`,
    });
    await activityLog.save();

    res.status(200).json({ message: "Task restored successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
