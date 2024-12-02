import { defineAction } from "astro/actions/runtime/virtual/server.js";
import { z } from "astro/zod";
import { db, eq, Blog, BlogResource } from "astro:db";

export const deleteResource = defineAction({
  accept: "json",
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }) => {
    const resources = await db
      .select()
      .from(BlogResource)
      .where(eq(BlogResource.blogId, id));
    for (const resource of resources) {
      await db.delete(BlogResource).where(eq(BlogResource.id, resource.id));
    }
    await db.delete(Blog).where(eq(Blog.id, id));
    return { success: true };
  },
});
