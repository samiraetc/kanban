import { BASE_URL } from "@/pages/api/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`https://kanban-kep9.vercel.app/api/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token.data) {
        session.user = token.data;
      }
      return session;
    },
    async redirect() {
      return "https://kanban-eight-ashen.vercel.app/";
    },
  },
};

export default NextAuth(authOptions);
