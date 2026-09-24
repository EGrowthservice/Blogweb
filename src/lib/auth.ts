import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import { User, UserRole, UserStatus } from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Vui lòng nhập đầy đủ email và mật khẩu');
        }

        await connectToDatabase();

        const user = await User.findOne({
          email: credentials.email.toLowerCase().trim(),
        }).select('+password');

        if (!user) {
          throw new Error('Tài khoản hoặc mật khẩu không chính xác');
        }

        if (user.status === 'inactive') {
          throw new Error('Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên');
        }

        if (!user.password) {
          throw new Error('Tài khoản này được đăng ký qua Google, vui lòng đăng nhập bằng Google');
        }

        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordMatch) {
          throw new Error('Tài khoản hoặc mật khẩu không chính xác');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          status: user.status,
        };
      },
    }),
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
            const existing = await User.findOne({ email: user.email.toLowerCase() });
            if (existing && existing.status === 'inactive') {
              return false; // Chặn đăng nhập nếu bị vô hiệu hóa
            }

            const updated = await User.findOneAndUpdate(
              { email: user.email.toLowerCase() },
              {
                $setOnInsert: { role: 'user', status: 'active' },
                $set: {
                  name: user.name || 'Anonymous User',
                  image: user.image || undefined,
                  googleId: account.providerAccountId,
                },
              },
              { upsert: true, new: true }
            );

            // Assign role to user object so jwt callback gets it
            if (updated) {
              user.role = updated.role;
              user.status = updated.status;
            }
          }
        } catch (error) {
          console.error('Error saving user to MongoDB during signIn:', error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.status = token.status as UserStatus;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'pulse_dev_secret_key_8f3d9a1b2c4e6f8a0b2d4e6f8a0b2d4e',
};
