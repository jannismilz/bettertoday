import { upsertUser } from "@/db/repositories/UserRepository";
import { AuthOptions, NextAuthOptions, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile) {
        console.error(`No profile found. User: ${user}. Account: ${account}`)
      }

      const { email, given_name, family_name, picture } = profile as any // Any since every provider adds own values

      await upsertUser({ email, first_name: given_name, last_name: family_name, avatar_url: picture })

      return true;
    },
  },
};
