import { Request, Response } from "express";
import Role from "../models/Role";
import Permission from "../models/Permission";

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, permissions } = req.body;

    const role = new Role({
      name,
      permissions,
    });

    await role.save();
    res.status(201).json(role);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
