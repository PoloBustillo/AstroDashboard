import { addResource } from "./add-recursos.action";
import { loginUser } from "./auth/loginUser.action";
import { registerUser } from "./auth/register.action";
import { getAllBlogs } from "./getall-recursos.action";
import { getAllUsers } from "./getall-users.action";
import { getResourceById } from "./get-recurso.action";
import { isAdmin } from "./is-admin.action";
import { deleteResource } from "./delete-recurso.action";

export const server = {
  isAdmin,
  registerUser,
  loginUser,
  addResource,
  getAllBlogs,
  getAllUsers,
  getResourceById,
  deleteResource,
};
