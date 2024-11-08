import { column, defineDb, defineTable } from "astro:db";

export const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
  },
});

export const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    name: column.text({ optional: true }),
    image: column.text({ optional: true }),
    email: column.text({ unique: true }),
    password: column.text({ optional: true }),
    isActive: column.boolean(),
    createdAt: column.date({ default: new Date() }),
    role: column.text({ references: () => Role.columns.id }), // admin, user, super-user
  },
});

export const Blog = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    user: column.text({ references: () => User.columns.id }),
    tags: column.text(),
    description: column.text(),
    isActive: column.boolean(),
    title: column.text(),
    createdAt: column.date({ default: new Date() }),
  },
});

export const BlogResource = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    productId: column.text({ references: () => Blog.columns.id }),
    url: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Role,
    Blog,
    BlogResource,
  },
});
