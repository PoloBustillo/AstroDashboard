import { type DefaultSession } from "@auth/core/types";

export declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      role: string;
      idUser: string;
      isActive: boolean;
    } & DefaultSession["user"];
  }
  interface User extends DefaultSession["user"] {
    id: string;
    idUser: string;
    role: string;
    isActive: boolean;
  }
}
