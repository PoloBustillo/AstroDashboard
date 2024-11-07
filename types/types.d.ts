import { type DefaultSession } from "@auth/core/types";

export declare module "@auth/core/types" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultSession["user"] {
    role: string;
  }
}
