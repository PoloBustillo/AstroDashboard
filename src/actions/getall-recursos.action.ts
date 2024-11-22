import { defineAction } from "astro/actions/runtime/virtual/server.js";
import { z } from "astro/zod";
import { db, eq, Blog, BlogResource } from "astro:db";

export const getAllBlogs = defineAction({
  accept: "json",
  input: z.void(),
  handler: async () => {
    const blogs = await db.select().from(Blog).where(eq(Blog.isActive, true));
    return Promise.all(
      blogs.map(async (blog) => {
        const blogResources = await db
          .select()
          .from(BlogResource)
          .where(eq(BlogResource.blogId, blog.id));
        return { blog: blog, blogResources: blogResources };
      }),
    );
  },
});
