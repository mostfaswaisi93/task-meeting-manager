import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const authorize = (requiredPermission: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = (req as any).user?.id;

    const user = await User.findById(userId).populate({
      path: "role",
      populate: {
        path: "permissions",
        model: "Permission",
      },
    });

    if (!user || !user.role) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const permissions = (user.role as any).permissions.map((p: any) => p.name);
    if (!permissions.includes(requiredPermission)) {
      res.status(403).json({ error: "Permission denied" });
      return;
    }

    next();
  };
};
