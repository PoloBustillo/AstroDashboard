import Google from "@auth/core/providers/google";
import Discord from "@auth/core/providers/discord";
import GitHub from "@auth/core/providers/github";
import X from "@auth/core/providers/twitter";
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
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
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
