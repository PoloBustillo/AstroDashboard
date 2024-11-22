import { defineAction } from "astro/actions/runtime/virtual/server.js";
import { z } from "astro/zod";
import { db, eq, Blog, BlogResource } from "astro:db";

export const getResourceById = defineAction({
  accept: "json",
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }) => {
    const resource = await db
      .select()
      .from(BlogResource)
      .where(eq(BlogResource.id, id));

    return resource[0];
  },
});
