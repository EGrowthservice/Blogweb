import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        try {
          const conn = await connectToDatabase();
          if (conn) {
            await User.findOneAndUpdate(
              { email: user.email },
              {
                name: user.name || 'Anonymous User',
                email: user.email,
                image: user.image || undefined,
                googleId: account.providerAccountId,
              },
              { upsert: true, new: true }
            );
          }
        } catch (error) {
          console.error('Error saving user to MongoDB during signIn:', error);
          // Still allow sign-in even if DB is temporarily unreachable
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'pulse_entertainment_default_secret_fallback',
};
