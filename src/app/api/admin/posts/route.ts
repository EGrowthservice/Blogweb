import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db';
import { Article } from '@/models/Article';
import { Category } from '@/models/Category';
import { requireAuth, apiSuccess, apiError } from '@/lib/api-guard';
import { PostCreateSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { auth, response } = await requireAuth(['super_admin', 'admin', 'editor']);
  if (response) return response;

  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const category = searchParams.get('category')?.trim() || '';
    const categoryId = searchParams.get('categoryId')?.trim() || '';
    const status = searchParams.get('status')?.trim() || '';
    const sortKey = searchParams.get('sort')?.trim() || 'newest';

    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
      query.categoryId = new mongoose.Types.ObjectId(categoryId);
    } else if (category && category !== 'all') {
      query.category = category;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    let sortOption: any = { createdAt: -1 };
    if (sortKey === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sortKey === 'views') {
      sortOption = { viewsCount: -1 };
    } else if (sortKey === 'published') {
      sortOption = { publishedAt: -1 };
    }

    const skip = (page - 1) * limit;

    const [total, posts] = await Promise.all([
      Article.countDocuments(query),
      Article.find(query)
        .populate('categoryId', 'name slug')
        .populate('authorId', 'name email image role')
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return apiSuccess(posts, {
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error: any) {
    console.error('GET /admin/posts error:', error);
    return apiError('Không thể tải danh sách bài viết', 500, 'SERVER_ERROR');
  }
}

export async function POST(req: NextRequest) {
  const { auth, response } = await requireAuth(['super_admin', 'admin', 'editor']);
  if (response) return response;

  try {
    await connectToDatabase();
    const body = await req.json();

    const parseResult = PostCreateSchema.safeParse(body);
    if (!parseResult.success) {
      return apiError(
        parseResult.error.issues[0]?.message || 'Dữ liệu không hợp lệ',
        422,
        'VALIDATION_ERROR',
        parseResult.error.format()
      );
    }

    const data = parseResult.data;

    // Check Editor role restrictions
    if (auth.role === 'editor' && (data.status === 'published' || data.status === 'archived')) {
      return apiError(
        'Tài khoản Biên tập viên (Editor) chỉ có thể tạo bài viết ở trạng thái Bản nháp (Draft).',
        403,
        'FORBIDDEN_STATUS'
      );
    }

    // Verify Category exists
    let categoryDoc = null;
    if (mongoose.Types.ObjectId.isValid(data.categoryId)) {
      categoryDoc = await Category.findById(data.categoryId);
    } else {
      categoryDoc = await Category.findOne({ slug: data.categoryId });
    }

    if (!categoryDoc) {
      return apiError('Danh mục được chọn không tồn tại', 404, 'CATEGORY_NOT_FOUND');
    }

    // Verify slug uniqueness
    const slugExists = await Article.findOne({ slug: data.slug });
    if (slugExists) {
      return apiError(`Slug "${data.slug}" đã tồn tại. Vui lòng chọn slug khác.`, 409, 'SLUG_EXISTS');
    }

    const article = await Article.create({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      category: categoryDoc.slug,
      categoryId: categoryDoc._id,
      authorId: auth.userId,
      featuredImage: data.thumbnail,
      featuredImageAlt: data.thumbnailAlt || data.title,
      status: data.status,
      tags: data.tags || [],
      isFeatured: data.isFeatured ?? false,
      isTrending: data.isTrending ?? false,
      readTimeMinutes: data.readTimeMinutes ?? 5,
      author: {
        name: auth.name || 'Admin',
        role: auth.role === 'editor' ? 'Contributing Writer' : 'Editorial Director',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
        bio: 'Pulse Editorial Team',
      },
      publishedAt: data.status === 'published' ? new Date() : undefined,
    });

    return apiSuccess(article);
  } catch (error: any) {
    console.error('POST /admin/posts error:', error);
    return apiError('Không thể tạo bài viết', 500, 'SERVER_ERROR');
  }
}
