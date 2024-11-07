import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, NOW, User } from "astro:db";
import bcrypt from "bcrypt";
import type { UserType } from "db/types";
import { USER_ROLE } from "src/utils/constants";
import { v4 as uuidv4 } from "uuid";

export const registerUser = defineAction({
  accept: "form",
  input: z
    .object({
      name: z.string().min(2, { message: "Nombre muy corto" }),
      email: z.string().email({ message: "Correo inválido" }),
      confirmpassword: z.string().min(6, { message: "Contraseña muy corta" }),
      password: z.string().min(6, { message: "Contraseña muy corta" }),
      terms: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: "Contraseñas no coinciden",
      path: ["confirm"],
    }),
  handler: async ({ email, name, password, terms }, { cookies }) => {
    // if (remember_me) {
    //   cookies.set("email", email, {
    //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año,
    //     path: "/",
    //   });
    // } else {
    //   cookies.delete("email", {
    //     path: "/",
    //   });
    // }
    if (!terms) {
      throw new Error("Debe aceptar los términos y condiciones");
    }
    const saltRounds = 10;

    try {
      const newUser = {
        name,
        email,
        password: await bcrypt.hash(password, saltRounds), // You should hash the password before saving it
        id: uuidv4(),
        isActive: true,
        createdAt: new Date(),
        role: USER_ROLE,
      } as UserType;

      const result = await db.insert(User).values(newUser);
      console.log("User created successfully", result);
    } catch (error) {
      console.error("Error creating user", error);
      throw new Error("Error al crear el usuario");
    }
  },
});
