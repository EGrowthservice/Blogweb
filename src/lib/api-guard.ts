import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserRole } from '@/models/User';

export interface AuthContext {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
}

export type PermissionCheck = UserRole | UserRole[];

export type AuthResult =
  | { auth: AuthContext; response: null }
  | { auth: null; response: NextResponse };

export async function requireAuth(
  allowedRoles?: PermissionCheck
): Promise<AuthResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return {
        auth: null,
        response: NextResponse.json(
          {
            success: false,
            error: {
              code: 'UNAUTHORIZED',
              message: 'Bạn cần đăng nhập để thực hiện thao tác này.',
            },
          },
          { status: 401 }
        ),
      };
    }

    if (session.user.status === 'inactive') {
      return {
        auth: null,
        response: NextResponse.json(
          {
            success: false,
            error: {
              code: 'ACCOUNT_INACTIVE',
              message: 'Tài khoản của bạn đã bị vô hiệu hóa.',
            },
          },
          { status: 403 }
        ),
      };
    }

    const userRole = session.user.role || 'user';

    // Super Admin always has full access
    if (userRole === 'super_admin') {
      return {
        auth: {
          userId: session.user.id,
          name: session.user.name || '',
          email: session.user.email || '',
          role: userRole,
        },
        response: null,
      };
    }

    if (allowedRoles) {
      const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      if (!rolesArray.includes(userRole)) {
        return {
          auth: null,
          response: NextResponse.json(
            {
              success: false,
              error: {
                code: 'FORBIDDEN',
                message: 'Bạn không có quyền thực hiện thao tác này.',
              },
            },
            { status: 403 }
          ),
        };
      }
    }

    return {
      auth: {
        userId: session.user.id,
        name: session.user.name || '',
        email: session.user.email || '',
        role: userRole,
      },
      response: null,
    };
  } catch (error) {
    console.error('requireAuth Error:', error);
    return {
      auth: null,
      response: NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Lỗi xác thực hệ thống.',
          },
        },
        { status: 500 }
      ),
    };
  }
}

export function apiSuccess<T>(data: T, pagination?: { page: number; limit: number; total: number; totalPages: number }) {
  if (pagination) {
    return NextResponse.json({
      success: true,
      data,
      pagination,
    });
  }
  return NextResponse.json({
    success: true,
    data,
  });
}

export function apiError(message: string, status = 400, code = 'BAD_REQUEST', details?: any) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
}
