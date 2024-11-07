import { registerUser } from "./auth/register.action";
import { isAdmin } from "./is-admin.action";

export const server = {
  isAdmin,
  registerUser,
};
