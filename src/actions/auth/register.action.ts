import { defineAction } from "astro:actions";
import { z } from "astro:content";

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
  handler: async (
    { email, name, confirmpassword, password, terms },
    { cookies },
  ) => {
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
    throw new Error("NONONO");
    console.log("registerUser", email, name, confirmpassword, password, terms);
  },
});
