import { defineAction } from "astro/actions/runtime/virtual/server.js";
import { z } from "astro/zod";
import { db, eq, Blog, BlogResource } from "astro:db";

export const getResourceById = defineAction({
  accept: "json",
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }) => {
    const resources = await db
      .select()
      .from(BlogResource)
      .where(eq(BlogResource.id, id));
    const blog = await db.select().from(Blog).where(eq(Blog.id, id));
    if (blog.length > 0) {
      return { blog: blog[0], blogResources: resources };
    }
    return null;
  },
});
