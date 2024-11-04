import { db, NOW, Users } from "astro:db";
import { ADMIN_ROLE } from "src/utils/constants";

// https://astro.build/db/seed
export default async function seed() {
  // TODO

  // Example: Create a new record
  await db.insert(Users).values({
    name: "John Doe",
    email: "admin@admin",
    password: "1234",
    isActive: true,
    role: ADMIN_ROLE,
    loggedAt: NOW,
  });
}
