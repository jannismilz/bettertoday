import { getUserByEmail, upsertUser } from "@/db/repositories/UserRepository";
import { AuthOptions, NextAuthOptions, Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile) {
        console.error(`No profile found. User: ${user}. Account: ${account}`);
      }

      const { email, given_name, family_name, picture } = profile!;

      await upsertUser({
        email: email as string, // Force email to be a string (doesn't prioritize type definitions from types/next-auth.d.ts)
        first_name: given_name,
        last_name: family_name,
        avatar_url: picture,
      });

      return true;
    },
    async session({ session }) {
      const user = await getUserByEmail(session.user?.email || "");

      session.user.first_name = user!.first_name;
      session.user.last_name = user!.last_name;
      session.user.avatar_url = user!.avatar_url;

      return session;
    },
  },
};
