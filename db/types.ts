export type RoleType = {
  id: string;
  name: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password?: string;
  isActive: boolean;
  createdAt: Date;
  role: string;
  image?: string;
};

export type BlogType = {
  id: string;
  user: string;
  tags: string;
  description: string;
  type: string;
  isActive: boolean;
  title: string;
  createdAt: Date;
};

export type BlogResourceType = {
  id: string;
  blogId: string;
  url: string;
};
