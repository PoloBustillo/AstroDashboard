import { defineAction } from "astro/actions/runtime/virtual/server.js";
import { z } from "astro/zod";
import { db, eq, User } from "astro:db";

export const getAllUsers = defineAction({
  accept: "json",
  input: z.void(),
  handler: async () => {
    const users = await db.select().from(User).where(eq(User.isActive, true));
    return users;
  },
});
