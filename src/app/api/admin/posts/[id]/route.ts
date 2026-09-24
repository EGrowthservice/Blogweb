import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db';
import { Article } from '@/models/Article';
import { Category } from '@/models/Category';
import { requireAuth, apiSuccess, apiError } from '@/lib/api-guard';
import { PostUpdateSchema } from '@/lib/validations';

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
      return apiError('ID bài viết không hợp lệ', 400, 'INVALID_ID');
    }

    await connectToDatabase();
    const post = await Article.findById(id)
      .populate('categoryId', 'name slug')
      .populate('authorId', 'name email role')
      .lean();

    if (!post) {
      return apiError('Không tìm thấy bài viết', 404, 'NOT_FOUND');
    }

    return apiSuccess(post);
  } catch (error: any) {
    console.error('GET /admin/posts/[id] error:', error);
    return apiError('Lỗi server', 500, 'SERVER_ERROR');
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { auth, response } = await requireAuth(['super_admin', 'admin', 'editor']);
  if (response) return response;

  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiError('ID bài viết không hợp lệ', 400, 'INVALID_ID');
    }

    await connectToDatabase();
    const existing = await Article.findById(id);
    if (!existing) {
      return apiError('Không tìm thấy bài viết cần cập nhật', 404, 'NOT_FOUND');
    }

    const body = await req.json();
    const parseResult = PostUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return apiError(
        parseResult.error.issues[0]?.message || 'Dữ liệu không hợp lệ',
        422,
        'VALIDATION_ERROR',
        parseResult.error.format()
      );
    }

    const data = parseResult.data;

    // Check Editor restrictions
    if (auth.role === 'editor') {
      if (data.status && data.status !== 'draft' && data.status !== existing.status) {
        return apiError(
          'Tài khoản Biên tập viên (Editor) không có quyền Xuất bản (Publish) hoặc Lưu trữ (Archive) bài viết.',
          403,
          'FORBIDDEN_STATUS_CHANGE'
        );
      }
    }

    // Check slug uniqueness if changed
    if (data.slug && data.slug !== existing.slug) {
      const duplicateSlug = await Article.findOne({ slug: data.slug, _id: { $ne: id } });
      if (duplicateSlug) {
        return apiError(`Slug "${data.slug}" đã được sử dụng bởi bài viết khác.`, 409, 'SLUG_EXISTS');
      }
      existing.slug = data.slug;
    }

    // Check category if changed
    if (data.categoryId) {
      let catDoc = null;
      if (mongoose.Types.ObjectId.isValid(data.categoryId)) {
        catDoc = await Category.findById(data.categoryId);
      } else {
        catDoc = await Category.findOne({ slug: data.categoryId });
      }

      if (!catDoc) {
        return apiError('Danh mục không tồn tại', 404, 'CATEGORY_NOT_FOUND');
      }
      existing.categoryId = catDoc._id;
      existing.category = catDoc.slug;
    }

    // Validate publish requirements
    const targetStatus = data.status || existing.status;
    const targetContent = data.content !== undefined ? data.content : existing.content;
    const targetExcerpt = data.excerpt !== undefined ? data.excerpt : existing.excerpt;

    if (targetStatus === 'published') {
      if (!targetContent || targetContent.trim().length < 20) {
        return apiError('Bài viết xuất bản yêu cầu nội dung tối thiểu 20 ký tự.', 422, 'CONTENT_TOO_SHORT');
      }
      if (!targetExcerpt || targetExcerpt.trim().length < 10) {
        return apiError('Bài viết xuất bản yêu cầu tóm tắt tối thiểu 10 ký tự.', 422, 'EXCERPT_TOO_SHORT');
      }
      if (!existing.publishedAt) {
        existing.publishedAt = new Date();
      }
    }

    if (data.title) existing.title = data.title;
    if (data.excerpt !== undefined) existing.excerpt = data.excerpt;
    if (data.content !== undefined) existing.content = data.content;
    if (data.thumbnail) existing.featuredImage = data.thumbnail;
    if (data.thumbnailAlt !== undefined) existing.featuredImageAlt = data.thumbnailAlt;
    if (data.status) existing.status = data.status;
    if (data.tags) existing.tags = data.tags;
    if (data.isFeatured !== undefined) existing.isFeatured = data.isFeatured;
    if (data.isTrending !== undefined) existing.isTrending = data.isTrending;
    if (data.readTimeMinutes !== undefined) existing.readTimeMinutes = data.readTimeMinutes;

    await existing.save();

    return apiSuccess(existing);
  } catch (error: any) {
    console.error('PUT /admin/posts/[id] error:', error);
    return apiError('Không thể cập nhật bài viết', 500, 'SERVER_ERROR');
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  // Only Super Admin and Admin can delete posts
  const { response } = await requireAuth(['super_admin', 'admin']);
  if (response) return response;

  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiError('ID bài viết không hợp lệ', 400, 'INVALID_ID');
    }

    await connectToDatabase();
    const post = await Article.findByIdAndDelete(id);
    if (!post) {
      return apiError('Không tìm thấy bài viết để xóa', 404, 'NOT_FOUND');
    }

    return apiSuccess({ message: 'Đã xóa bài viết thành công', id });
  } catch (error: any) {
    console.error('DELETE /admin/posts/[id] error:', error);
    return apiError('Không thể xóa bài viết', 500, 'SERVER_ERROR');
  }
}
