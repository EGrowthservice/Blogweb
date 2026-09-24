import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Only protect /admin routes (excluding /admin/login)
    if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      const role = token.role;
      if (!role || !['super_admin', 'admin', 'editor'].includes(role as string)) {
        // Normal users or unauthorized roles redirected or forbidden
        return NextResponse.redirect(new URL('/admin/login?error=AccessDenied', req.url));
      }

      if (token.status === 'inactive') {
        return NextResponse.redirect(new URL('/admin/login?error=AccountDisabled', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (path === '/admin/login') {
          return true;
        }
        if (path.startsWith('/admin')) {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
