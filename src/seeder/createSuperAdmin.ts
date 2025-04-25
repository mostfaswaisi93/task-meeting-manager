import User from "../models/User";
import Role from "../models/Role";
import Permission from "../models/Permission";
import bcrypt from "bcryptjs";
import { superAdminSeed } from "../config/superadmin";

export const createSuperAdmin = async () => {
  const existing = await User.findOne({ email: superAdminSeed.email });
  if (existing) return;

  const permissions = [
    "create_task",
    "edit_task",
    "delete_task",
    "view_task",
    "create_meeting",
    "edit_meeting",
    "delete_meeting",
    "view_meeting",
    "create_role",
    "assign_permissions",
    "assign_roles",
    "create_permission",
  ];

  const permissionDocs = await Promise.all(
    permissions.map(async (name) => {
      const existing = await Permission.findOne({ name });
      if (existing) return existing;
      return await new Permission({ name }).save();
    })
  );

  let role = await Role.findOne({ name: superAdminSeed.role });
  if (!role) {
    role = new Role({
      name: superAdminSeed.role,
      permissions: permissionDocs.map((p) => p._id),
    });
    await role.save();
  }

  const hashedPassword = await bcrypt.hash(superAdminSeed.password, 10);
  const user = new User({
    name: superAdminSeed.name,
    email: superAdminSeed.email,
    password: hashedPassword,
    role: role._id,
  });

  await user.save();
  console.log("✅ SuperAdmin created:", superAdminSeed.email);
};
