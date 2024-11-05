import { column, defineDb, defineTable } from "astro:db";

export const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    email: column.text(),
    password: column.text(),
    isActive: column.boolean(),
    role: column.text(),
    loggedAt: column.date(),
  },
});

export const Resources = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    user: column.number({ references: () => Users.columns.id }),
    name: column.text(),
    url: column.text(),
    type: column.text(),
    description: column.text(),
    isActive: column.boolean(),
    createdAt: column.date(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Users, Resources },
});
