import { addResource } from "./add-recursos.action";
import { loginUser } from "./auth/loginUser.action";
import { registerUser } from "./auth/register.action";
import { isAdmin } from "./is-admin.action";

export const server = {
  isAdmin,
  registerUser,
  loginUser,
  addResource,
};
