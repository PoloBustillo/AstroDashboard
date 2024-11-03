import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   async session({ session, token }) {
  //     console.log("session", session);
  //     console.log("token", token);

  //     return session;
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     console.log("jwt", token);
  //     console.log("user", user);
  //     console.log("account", account);
  //     console.log("profile", profile);
  //     console.log("isNewUser", isNewUser);
  //     return token;
  //   },
  // },
});
