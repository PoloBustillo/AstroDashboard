export interface BlogData {
  blog: Blog;
  blogResources: BlogResource[];
}

export interface Blog {
  id: string;
  user: string;
  tags: string;
  description: string;
  isActive: boolean;
  title: string;
  createdAt: Date;
}

export interface BlogResource {
  id: string;
  blogId: string;
  url: string;
}