import Google from "@auth/core/providers/google";
import Discord from "@auth/core/providers/discord";
import GitHub from "@auth/core/providers/github";
import X from "@auth/core/providers/twitter";
import bcrypt from "bcrypt";
import Credentials from "@auth/core/providers/credentials";
import { defineConfig } from "auth-astro";
import { actions } from "astro:actions";
import { eq, Users } from "astro:db";
import { db } from "astro:db";

export default defineConfig({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async ({ email, password }) => {
        return null;
        const [user] = await db
          .select()
          .from(Users)
          .where(eq(Users.email, `${email}`));

        if (!user) {
          throw new Error("User not found");
        }

        if (!bcrypt.compareSync(password as string, user.password)) {
          throw new Error("Invalid password");
        }

        const { password: _, id, ...rest } = user;

        return { id: id.toString(), ...rest };
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
    }),
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      const { data, error } = await actions.isAdmin(
        session.user.email as string,
      );
      if (data?.isAdmin) session.user.role = "admin";

      return session;
    },
  },
});
