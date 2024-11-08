import Google from "@auth/core/providers/google";
import Discord from "@auth/core/providers/discord";
import GitHub from "@auth/core/providers/github";
import X from "@auth/core/providers/twitter";
import bcrypt from "bcrypt";
import Credentials from "@auth/core/providers/credentials";
import { defineConfig } from "auth-astro";
import { actions } from "astro:actions";
import { eq, User } from "astro:db";
import { db } from "astro:db";
import { normalizeError } from "src/utils/methods";
import type { UserType } from "db/types";

export default defineConfig({
  debug: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
        isCreation: { label: "Flag", type: "text" },
      },
      authorize: async ({ email, password, isCreation }) => {
        try {
          const existingUser = await db
            .select()
            .from(User)
            .where(eq(User.email, email as string));

          const validPassword = bcrypt.compare(
            password as string,
            existingUser[0].password,
          );
          if (!validPassword) {
            throw new Error("Contraseña incorrecta");
          }
          const user = {
            name: existingUser[0].name,
            email,
            id: existingUser[0].id,
            isActive: existingUser[0].isActive,
            createdAt: existingUser[0].createdAt,
            role: existingUser[0].role,
          } as UserType;
          return user;
        } catch (error: unknown) {
          console.error("Error creating user", error);
          const e = normalizeError(error);
          if (e.message) {
            throw new Error(e.message);
          }
          throw new Error(
            "Error al crear el usuario: Usuario ya existe o Servicio fuera de linea",
          );
        }
      },
    }),
    X({
      clientId: import.meta.env.X_CLIENT_ID,
      clientSecret: import.meta.env.X_CLIENT_SECRET,
    }),
    Discord({
      clientId: import.meta.env.DISCORD_CLIENT_ID,
      clientSecret: import.meta.env.DISCORD_CLIENT_SECRET,
    }),
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.login,
          name: "MICHI",
          email: profile.email,
          isActive: true,
          role: "user", // or any default role you want to assign
        };
      },
    }),
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const users = await db
        .select()
        .from(User)
        .where(eq(User.email, user.email as string));
      if (users.length == 0) return true;
      return users[0].isActive;
    },
    async session({ session }) {
      const { data, error } = await actions.isAdmin(
        session.user.email as string,
      );
      if (data?.isAdmin) session.user.role = "admin";

      return session;
    },
  },
});
