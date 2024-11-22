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
import type { Profile } from "@auth/core/types";
import { v4 as uuidv4 } from "uuid";

const checkIfUserExistsOrCreate = async (profile: Partial<Profile>) => {
  const existingUser = await db
    .select()
    .from(User)
    .where(
      eq(
        User.email,
        (profile.email as string) ??
          (profile.data as { username?: string }).username,
      ),
    );
  if (existingUser.length > 0) {
    return existingUser[0];
  } else {
    const user = {
      email:
        (profile.email as string) ??
        (profile.data as { username?: string }).username,
      image:
        profile.picture ??
        profile.avatar_url ??
        (profile.data as { profile_image_url?: string }).profile_image_url ??
        `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp?size=240`,
      name:
        profile.name ??
        profile.login ??
        profile.global_name ??
        (profile.data as { name?: string })?.name,
      isActive: true,
      createdAt: new Date(),
      role: "user",
      id: uuidv4(),
    } as UserType;

    await db.insert(User).values(user);

    return user;
  }
};

export default defineConfig({
  debug: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async ({ email, password }) => {
        try {
          const existingUser = await db
            .select()
            .from(User)
            .where(eq(User.email, email as string));

          if (!existingUser[0].password) {
            throw new Error("Contacte al admin, no hay datos de su cuenta");
          }
          const validPassword = bcrypt.compare(
            password as string,
            existingUser[0].password!,
          );
          if (!validPassword) {
            throw new Error("Contraseña incorrecta");
          }
          const user = {
            name: existingUser[0].name,
            email,
            image: existingUser[0].image,
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
      async profile(profile) {
        let user = await checkIfUserExistsOrCreate({
          ...profile,
          id: profile.id?.toString(),
        });

        return {
          email: user.email,
          isActive: user.isActive,
          image: user.image,
          name: user.name,
          role: user.role,
          id: user.id,
        };
      },
    }),
    Discord({
      clientId: import.meta.env.DISCORD_CLIENT_ID,
      clientSecret: import.meta.env.DISCORD_CLIENT_SECRET,
      async profile(profile) {
        let user = await checkIfUserExistsOrCreate({
          ...profile,
          id: profile.id?.toString(),
        });

        return {
          email: user.email,
          isActive: user.isActive,
          image: user.image,
          name: user.name,
          role: user.role,
          id: user.id,
        };
      },
    }),
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        let user = await checkIfUserExistsOrCreate({
          ...profile,
          id: profile.id?.toString(),
        });
        console.log("🚀 ~ profile ~ user:", user);
        return {
          email: user.email,
          isActive: user.isActive,
          image: user.image,
          name: user.name,
          role: user.role,
          id: user.id,
        };
      },
    }),
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
      async profile(profile) {
        let user = await checkIfUserExistsOrCreate({
          ...profile,
          id: profile.id?.toString(),
        });

        return {
          email: user.email,
          isActive: user.isActive,
          image: user.image,
          name: user.name,
          role: user.role,
          id: user.id,
        };
      },
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isActive = user.isActive;
      }
      return token;
    },
    async session({ session, user, token, newSession, trigger }) {
      const { data, error } = await actions.isAdmin(
        session.user.email as string,
      );
      if (data?.isAdmin) {
        session.user.role = "admin";
      } else {
        session.user.role = "user";
      }
      if (token?.id) session.user.id = token.id as string;
      if (token?.role) session.user.role = token.role as string;
      if (token?.isActive) session.user.isActive = token.isActive as boolean;

      return session;
    },
  },
});
