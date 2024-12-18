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
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "SUDO",
      email: "sudo@example.com",
      password: await bcrypt.hash("1234567", 10),
      isActive: true,
      createdAt: NOW,
      role: "superadmin",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("adminpassword", 10),
      isActive: true,
      createdAt: NOW,
      role: "admin",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      name: "Regular User",
      email: "user@example.com",
      password: await bcrypt.hash("userpassword", 10),
      isActive: true,
      createdAt: NOW,
      role: "user",
    },
  ];

  await knock.users.identify("550e8400-e29b-41d4-a716-446655440000", {
    name: "SUDO",
    email: "sudo@example.com",
  });
  await knock.users.identify("550e8400-e29b-41d4-a716-446655440001", {
    name: "Admin User",
    email: "admin@example.com",
  });
  await knock.users.identify("550e8400-e29b-41d4-a716-446655440002", {
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
      recipients: [
        "550e8400-e29b-41d4-a716-446655440000",
        "550e8400-e29b-41d4-a716-446655440001",
        "550e8400-e29b-41d4-a716-446655440002",
      ],
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
      user: "550e8400-e29b-41d4-a716-446655440001",
      private: false,
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
      user: "550e8400-e29b-41d4-a716-446655440002",
      private: true,
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
      user: "550e8400-e29b-41d4-a716-446655440001",
      private: false,
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
      user: "550e8400-e29b-41d4-a716-446655440000",
      private: false,
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
      user: "550e8400-e29b-41d4-a716-446655440001",
      private: false,
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
      user: "550e8400-e29b-41d4-a716-446655440000",
      private: false,
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
      user: "550e8400-e29b-41d4-a716-446655440000",
      private: false,
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
      url: "https://media.istockphoto.com/id/1450969748/photo/developer-working-with-new-program.jpg?s=612x612&w=0&k=20&c=FTq2MTCXwMTJxGCA_8o7516KFDaNZ0WCxdZR5M--KYs=",
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
