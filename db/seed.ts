import { Blog, BlogResource, db, NOW, Role, User } from "astro:db";
import bcrypt from "bcrypt";
import { Knock } from "@knocklabs/node";
const knock = new Knock(import.meta.env.KNOCK_API_KEY);

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

  await knock.users.identify("0", {
    name: "SUDO",
    email: "sudo@example.com",
  });
  await knock.users.identify("1", {
    name: "Admin User",
    email: "admin@example.com",
  });
  await knock.users.identify("2", {
    name: "Regular User",
    email: "user@example.com",
  });
  knock.objects.set("blogNotifications", "blogNotification", {
    name: "TakitoCorp",
  });
  await knock.objects.addSubscriptions(
    "blogNotifications",
    "blogNotification",
    {
      recipients: ["0", "1", "2"],
    },
  );
  // await knock.workflows.trigger("in-app", {
  //   recipients: [{ collection: "blogNotifications", id: "blogNotification" }],
  //   data: {
  //     message: "Hola mundo",
  //     primary_action_url: "/resource/1",
  //     variableKey: "Preview data value",
  //   },
  // });
  await db.insert(User).values(users);
  const blogs = [
    {
      id: "1",
      user: "1",
      tags: "tech, programming",
      description: "A blog about tech and programming",
      isActive: true,
      title: "Tech Blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: NOW,
    },
    {
      id: "2",
      user: "2",
      tags: "lifestyle, health",
      description: "A blog about lifestyle and health",
      isActive: true,
      title: "Corgi Blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: NOW,
    },
    {
      id: "3",
      user: "1",
      tags: "travel, adventure",
      description: "A blog about travel and adventure",
      isActive: true,
      title: "Travel Blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: NOW,
    },
    {
      id: "4",
      user: "2",
      tags: "food, recipes",
      description: "A blog about food and recipes",
      isActive: true,
      title: "Food Blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: NOW,
    },
    {
      id: "5",
      user: "1",
      tags: "fitness, wellness",
      description: "A blog about fitness and wellness",
      isActive: true,
      title: "Fitness Blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: NOW,
    },
    {
      id: "6",
      user: "2",
      tags: "finance, investing",
      description: "A blog about finance and investing",
      isActive: true,
      title: "Finance Blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: NOW,
    },
    {
      id: "7",
      user: "1",
      tags: "education, learning",
      description: "A blog about education and learning",
      isActive: true,
      title: "Education Blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: NOW,
    },
  ];
  await db.insert(Blog).values(blogs);
  const blogResources = [
    {
      id: "1",
      blogId: "1",
      url: "https://example.com/tech-blog",
      type: "image",
    },
    {
      id: "2",
      blogId: "2",
      url: "https://example.com/lifestyle-blog",
      type: "pdf",
    },
  ];

  await db.insert(BlogResource).values(blogResources);
}
