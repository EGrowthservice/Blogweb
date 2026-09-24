import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db';
import { Category } from '@/models/Category';
import { Article } from '@/models/Article';
import { requireAuth, apiSuccess, apiError } from '@/lib/api-guard';
import { CategoryUpdateSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { response } = await requireAuth(['super_admin', 'admin', 'editor']);
  if (response) return response;

  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiError('ID danh mục không hợp lệ', 400, 'INVALID_ID');
    }

    await connectToDatabase();
    const category = await Category.findById(id).lean();

    if (!category) {
      return apiError('Không tìm thấy danh mục', 404, 'NOT_FOUND');
    }

    return apiSuccess(category);
  } catch (error: any) {
    console.error('GET /admin/categories/[id] error:', error);
    return apiError('Lỗi server', 500, 'SERVER_ERROR');
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { response } = await requireAuth(['super_admin', 'admin']);
  if (response) return response;

  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiError('ID danh mục không hợp lệ', 400, 'INVALID_ID');
    }

    await connectToDatabase();
    const existing = await Category.findById(id);
    if (!existing) {
      return apiError('Không tìm thấy danh mục cần cập nhật', 404, 'NOT_FOUND');
    }

    const body = await req.json();
    const parseResult = CategoryUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return apiError(
        parseResult.error.issues[0]?.message || 'Dữ liệu không hợp lệ',
        422,
        'VALIDATION_ERROR',
        parseResult.error.format()
      );
    }

    const { name, slug, description, status } = parseResult.data;

    // Check slug uniqueness if changed
    if (slug && slug !== existing.slug) {
      const duplicateSlug = await Category.findOne({ slug, _id: { $ne: id } });
      if (duplicateSlug) {
        return apiError(`Slug "${slug}" đã được sử dụng bởi danh mục khác`, 409, 'SLUG_EXISTS');
      }
      existing.slug = slug;
    }

    if (name) existing.name = name;
    if (description !== undefined) existing.description = description;
    if (status) existing.status = status;

    await existing.save();

    return apiSuccess(existing);
  } catch (error: any) {
    console.error('PUT /admin/categories/[id] error:', error);
    return apiError('Không thể cập nhật danh mục', 500, 'SERVER_ERROR');
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { response } = await requireAuth(['super_admin', 'admin']);
  if (response) return response;

  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiError('ID danh mục không hợp lệ', 400, 'INVALID_ID');
    }

    await connectToDatabase();
    const category = await Category.findById(id);
    if (!category) {
      return apiError('Không tìm thấy danh mục', 404, 'NOT_FOUND');
    }

    // Check for associated articles (by categoryId or slug)
    const associatedCount = await Article.countDocuments({
      $or: [{ categoryId: id }, { category: category.slug }],
    });

    if (associatedCount > 0) {
      return apiError(
        `Không thể xóa danh mục này vì đang có ${associatedCount} bài viết liên kết. Vui lòng chuyển bài viết sang danh mục khác trước khi xóa.`,
        400,
        'HAS_ARTICLES',
        { count: associatedCount }
      );
    }

    await Category.findByIdAndDelete(id);

    return apiSuccess({ message: 'Đã xóa danh mục thành công', id });
  } catch (error: any) {
    console.error('DELETE /admin/categories/[id] error:', error);
    return apiError('Không thể xóa danh mục', 500, 'SERVER_ERROR');
  }
}
