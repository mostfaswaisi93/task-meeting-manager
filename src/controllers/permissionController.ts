import { Request, Response } from 'express';
import Permission from '../models/Permission';

export const createPermission = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const exists = await Permission.findOne({ name });
    if (exists) return res.status(400).json({ error: 'Permission already exists' });

    const permission = await new Permission({ name }).save();
    res.status(201).json(permission);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
