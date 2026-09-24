import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { requireAuth, apiSuccess, apiError } from '@/lib/api-guard';
import { UserCreateSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { response } = await requireAuth(['super_admin', 'admin']);
  if (response) return response;

  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const role = searchParams.get('role')?.trim() || '';
    const status = searchParams.get('status')?.trim() || '';

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (role && role !== 'all') {
      query.role = role;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return apiSuccess(users, {
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error: any) {
    console.error('GET /admin/users error:', error);
    return apiError('Không thể tải danh sách người dùng', 500, 'SERVER_ERROR');
  }
}

export async function POST(req: NextRequest) {
  // Only Super Admin can create new internal admin/editor accounts
  const { response } = await requireAuth('super_admin');
  if (response) return response;

  try {
    await connectToDatabase();
    const body = await req.json();

    const parseResult = UserCreateSchema.safeParse(body);
    if (!parseResult.success) {
      return apiError(
        parseResult.error.issues[0]?.message || 'Dữ liệu không hợp lệ',
        422,
        'VALIDATION_ERROR',
        parseResult.error.format()
      );
    }

    const { name, email, password, role, status } = parseResult.data;

    const existing = await User.findOne({ email });
    if (existing) {
      return apiError(`Email "${email}" đã được đăng ký trong hệ thống.`, 409, 'EMAIL_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      status,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`,
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    return apiSuccess(userObj);
  } catch (error: any) {
    console.error('POST /admin/users error:', error);
    return apiError('Không thể tạo tài khoản người dùng', 500, 'SERVER_ERROR');
  }
}
