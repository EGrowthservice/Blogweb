import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { requireAuth, apiSuccess, apiError } from '@/lib/api-guard';
import { UserUpdateSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { response } = await requireAuth(['super_admin', 'admin']);
  if (response) return response;

  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiError('ID người dùng không hợp lệ', 400, 'INVALID_ID');
    }

    await connectToDatabase();
    const user = await User.findById(id).select('-password').lean();

    if (!user) {
      return apiError('Không tìm thấy người dùng', 404, 'NOT_FOUND');
    }

    return apiSuccess(user);
  } catch (error: any) {
    console.error('GET /admin/users/[id] error:', error);
    return apiError('Lỗi server', 500, 'SERVER_ERROR');
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { auth, response } = await requireAuth(['super_admin']);
  if (response) return response;

  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiError('ID người dùng không hợp lệ', 400, 'INVALID_ID');
    }

    await connectToDatabase();
    const existing = await User.findById(id);
    if (!existing) {
      return apiError('Không tìm thấy người dùng cần cập nhật', 404, 'NOT_FOUND');
    }

    const body = await req.json();
    const parseResult = UserUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return apiError(
        parseResult.error.issues[0]?.message || 'Dữ liệu không hợp lệ',
        422,
        'VALIDATION_ERROR',
        parseResult.error.format()
      );
    }

    const data = parseResult.data;

    // Protection rule: Check if modifying the last Super Admin
    if (existing.role === 'super_admin') {
      const willDemote = data.role && data.role !== 'super_admin';
      const willDeactivate = data.status && data.status === 'inactive';

      if (willDemote || willDeactivate) {
        const superAdminCount = await User.countDocuments({
          role: 'super_admin',
          status: 'active',
        });
        if (superAdminCount <= 1) {
          return apiError(
            'Không thể hạ quyền hoặc vô hiệu hóa Super Admin duy nhất trong hệ thống.',
            400,
            'CANNOT_MODIFY_LAST_SUPER_ADMIN'
          );
        }
      }
    }

    // Check email uniqueness if changed
    if (data.email && data.email !== existing.email) {
      const emailExists = await User.findOne({ email: data.email, _id: { $ne: id } });
      if (emailExists) {
        return apiError(`Email "${data.email}" đã tồn tại.`, 409, 'EMAIL_EXISTS');
      }
      existing.email = data.email;
    }

    if (data.name) existing.name = data.name;
    if (data.role) existing.role = data.role;
    if (data.status) existing.status = data.status;

    if (data.password && data.password.trim() !== '') {
      existing.password = await bcrypt.hash(data.password, 10);
    }

    await existing.save();

    const userObj = existing.toObject();
    delete userObj.password;

    return apiSuccess(userObj);
  } catch (error: any) {
    console.error('PUT /admin/users/[id] error:', error);
    return apiError('Không thể cập nhật thông tin người dùng', 500, 'SERVER_ERROR');
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { auth, response } = await requireAuth('super_admin');
  if (response) return response;

  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiError('ID người dùng không hợp lệ', 400, 'INVALID_ID');
    }

    // Rule: Cannot delete own account
    if (id === auth.userId) {
      return apiError('Bạn không thể tự xóa tài khoản của chính mình.', 400, 'CANNOT_DELETE_SELF');
    }

    await connectToDatabase();
    const existing = await User.findById(id);
    if (!existing) {
      return apiError('Không tìm thấy người dùng để xóa', 404, 'NOT_FOUND');
    }

    // Rule: Cannot delete last Super Admin
    if (existing.role === 'super_admin') {
      const superAdminCount = await User.countDocuments({ role: 'super_admin' });
      if (superAdminCount <= 1) {
        return apiError(
          'Không thể xóa Super Admin duy nhất trong hệ thống.',
          400,
          'CANNOT_DELETE_LAST_SUPER_ADMIN'
        );
      }
    }

    await User.findByIdAndDelete(id);

    return apiSuccess({ message: 'Đã xóa người dùng thành công', id });
  } catch (error: any) {
    console.error('DELETE /admin/users/[id] error:', error);
    return apiError('Không thể xóa người dùng', 500, 'SERVER_ERROR');
  }
}
