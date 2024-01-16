import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      first_name: string;
      last_name: string;
      avatar_url: string | null;
    } & DefaultSession["user"];
  }

  interface Profile {
    email: string;
    given_name: string;
    family_name: string;
    picture: string | null;
  }
}
