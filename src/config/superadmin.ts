export const superAdminSeed = {
  name: "Super Admin",
  email: process.env.SUPER_ADMIN_EMAIL || "admin@example.com",
  password: process.env.SUPER_ADMIN_PASSWORD || "admin123",
  role: "superadmin",
};
