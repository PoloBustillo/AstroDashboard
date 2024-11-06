import { defineAction } from "astro/actions/runtime/virtual/server.js";
import { z } from "astro/zod";
import { db, Users, eq } from "astro:db";

export const isAdmin = defineAction({
  accept: "json",
  input: z.string(),
  handler: async (email) => {
    const user = await db.select().from(Users).where(eq(Users.email, email));
    const role = user.at(0)?.role;
    return {
      isAdmin: role === "admin",
    };
  },
});
