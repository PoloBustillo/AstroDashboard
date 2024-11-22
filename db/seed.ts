import { Blog, BlogResource, db, NOW, Role, User } from "astro:db";
import bcrypt from "bcrypt";

export default async function seed() {
  const roles = [
    { id: "admin", name: "Administrador" },
    { id: "user", name: "Usuario de sistema" },
    { id: "superadmin", name: "Super Admin" },
  ];

  await db.insert(Role).values(roles);

  const users = [
    {
      id: "0",
      name: "SUDO",
      email: "sudo@example.com",
      password: await bcrypt.hash("1234567", 10),
      isActive: true,
      createdAt: NOW,
      role: "superadmin",
    },
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("adminpassword", 10),
      isActive: true,
      createdAt: NOW,
      role: "admin",
    },
    {
      id: "2",
      name: "Regular User",
      email: "user@example.com",
      password: await bcrypt.hash("userpassword", 10),
      isActive: true,
      createdAt: NOW,
      role: "user",
    },
  ];

  await db.insert(User).values(users);
  const blogs = [
    {
      id: "1",
      user: "1",
      tags: "tech, programming",
      description: "A blog about tech and programming",
      isActive: true,
      title: "Tech Blog",
      createdAt: NOW,
    },
    {
      id: "2",
      user: "2",
      tags: "lifestyle, health",
      description: "A blog about lifestyle and health",
      isActive: true,
      title: "Lifestyle Blog",
      createdAt: NOW,
    },
  ];
  await db.insert(Blog).values(blogs);
  const blogResources = [
    {
      id: "1",
      blogId: "1",
      url: "https://example.com/tech-blog",
    },
    {
      id: "2",
      blogId: "2",
      url: "https://example.com/lifestyle-blog",
    },
  ];

  await db.insert(BlogResource).values(blogResources);
}
