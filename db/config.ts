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
// https://astro.build/db/config
export default defineDb({
  tables: { Users },
});
