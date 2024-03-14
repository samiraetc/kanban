import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      [x: string]: any;
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      access_token: string;
    };
  }
}
