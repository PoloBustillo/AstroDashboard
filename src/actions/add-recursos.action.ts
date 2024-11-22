import { defineAction } from "astro/actions/runtime/virtual/server.js";
import { z } from "astro/zod";
import { db, BlogResource, Blog } from "astro:db";

export const addResource = defineAction({
  accept: "json",
  input: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    userId: z.string().uuid(),
    files: z.array(z.string()).optional(),
  }),
  handler: async (data) => {
    const { title, description, tags, userId, files } = data;

    try {
      const newBlog = await db
        .insert(Blog)
        .values({
          id: crypto.randomUUID(),
          user: userId,
          tags: tags ? tags.join(",") : "",
          description,
          isActive: true,
          title,
          createdAt: new Date(),
        })
        .returning();

      if (files) {
        for (const file of files) {
          await db.insert(BlogResource).values({
            id: crypto.randomUUID(),
            blogId: newBlog[0].id,
            url: file,
          });
        }
      }

      return newBlog;
    } catch (error) {
      console.error("Error adding resource: ", error);
      return null;
    }
  },
});
