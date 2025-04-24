import { Request, Response } from "express";
import User from "../models/User";
import Role from "../models/Role";

export const assignRoleToUser = async (req: Request, res: Response) => {
  try {
    const { userId, roleId } = req.body;

    const role = await Role.findById(roleId);
    if (!role) return res.status(404).json({ error: "Role not found" });

    const user = await User.findByIdAndUpdate(
      userId,
      { role: roleId },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
