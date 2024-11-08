import { AuthError, CallbackRouteError } from "@auth/core/errors";
import { ACTION_ERROR_CODES, ActionError, defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, eq, User } from "astro:db";
import bcrypt from "bcrypt";
import type { UserType } from "db/types";
import { normalizeError } from "src/utils/methods";

export const loginUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email({ message: "Correo inválido" }),
    password: z.string().min(6, { message: "Contraseña muy corta" }),
    remember: z.boolean().optional(),
  }),
  handler: async ({ email, password, remember }, { cookies }) => {
    if (remember) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año,
        path: "/",
      });
    } else {
      cookies.delete("email", {
        path: "/",
      });
    }

    try {
      const existingUser = await db
        .select()
        .from(User)
        .where(eq(User.email, email));
      console.log(existingUser[0]);

      if (existingUser.length == 0) {
        throw new Error("Usuario no existe");
      }
      if (!existingUser[0].isActive) {
        throw new Error("Usuario no activo");
      }
      if (!existingUser[0].password) {
        throw new Error("Contacte al admin, no hay datos de su cuenta");
      }
      const validPassword = await bcrypt.compare(
        password,
        existingUser[0].password!,
      );
      if (!validPassword) {
        throw new ActionError({
          message: "Contraseña incorrecta",
          code: ACTION_ERROR_CODES[1],
        });
      }
      const user = {
        name: existingUser[0].name,
        email,
        id: existingUser[0].id,
        isActive: existingUser[0].isActive,
        createdAt: existingUser[0].createdAt,
        role: existingUser[0].role,
      } as UserType;

      return { message: "Usuario valido", user: user };
    } catch (error: unknown) {
      console.error("Error creating user", error);
      const e = normalizeError(error);
      if (e.message) {
        throw new Error(e.message);
      }
      if (error instanceof AuthError) {
        throw new CallbackRouteError(error.message);
      }
      throw new Error(
        "Error al crear el usuario: Usuario ya existe o Servicio fuera de linea",
      );
    }
  },
});
