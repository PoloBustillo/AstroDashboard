import { defineAction } from "astro/actions/runtime/virtual/server.js";
import { z } from "astro/zod";
import { db, BlogResource, Blog } from "astro:db";
import { Knock } from "@knocklabs/node";
const knock = new Knock(import.meta.env.KNOCK_API_KEY);

export const addResource = defineAction({
  accept: "json",
  input: z.object({
    title: z.string(),
    description: z.string(),
    userId: z.string().uuid(),
    files: z.array(z.string()).optional(),
    tags: z.string().optional(),
    type: z.string().optional(),
    contentJson: z.string().optional(),
  }),
  handler: async (data) => {
    const { title, description, tags, userId, files, type, contentJson } = data;

    try {
      const newBlog = await db
        .insert(Blog)
        .values({
          id: crypto.randomUUID(),
          user: userId,
          tags: tags ? tags : "",
          content: contentJson ? contentJson : "",
          description,
          isActive: true,
          title,
          createdAt: new Date(),
        })
        .returning();
      await knock.workflows.trigger("in-app", {
        recipients: [
          { collection: "blogNotifications", id: "blogNotification" },
        ],
        data: {
          message: `El titulo ${title}, creado en ${new Date(newBlog[0].createdAt).toLocaleString("en-US", { timeZone: "America/Mexico_City" })}`,
          primary_action_url: `/resource/${newBlog[0].id}`,
        },
      });
      if (files) {
        for (const file of files) {
          await db.insert(BlogResource).values({
            id: crypto.randomUUID(),
            blogId: newBlog[0].id,
            url: file,
            type: type ? type : "default",
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
