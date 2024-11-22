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
  }),
  handler: async (data) => {
    const { title, description, tags, userId } = data;

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

    const url = "https://example.com"; // Define the URL variable
    await db.insert(BlogResource).values({
      id: crypto.randomUUID(),
      productId: newBlog[0].id,
      url,
    });

    return newBlog;
  },
});
