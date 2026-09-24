import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Category } from '@/models/Category';
import { Article } from '@/models/Article';
import { requireAuth, apiSuccess, apiError } from '@/lib/api-guard';
import { CategoryCreateSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { response } = await requireAuth(['super_admin', 'admin', 'editor']);
  if (response) return response;

  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status')?.trim() || '';

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    // Calculate post count for each category
    const categoryIds = categories.map((c) => c._id);
    const postCounts = await Article.aggregate([
      {
        $match: {
          $or: [
            { categoryId: { $in: categoryIds } },
            { category: { $in: categories.map((c) => c.slug) } },
          ],
        },
      },
      {
        $group: {
          _id: { $ifNull: ['$categoryId', '$category'] },
          count: { $sum: 1 },
        },
      },
    ]);

    const countMap = new Map<string, number>();
    for (const p of postCounts) {
      countMap.set(String(p._id), p.count);
    }

    const dataWithCounts = categories.map((c) => {
      const byId = countMap.get(String(c._id)) || 0;
      const bySlug = countMap.get(c.slug) || 0;
      return {
        ...c,
        postCount: Math.max(byId, bySlug),
      };
    });

    const totalPages = Math.ceil(total / limit) || 1;

    return apiSuccess(dataWithCounts, {
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error: any) {
    console.error('GET /admin/categories error:', error);
    return apiError('Không thể tải danh sách danh mục', 500, 'SERVER_ERROR');
  }
}

export async function POST(req: NextRequest) {
  const { response } = await requireAuth(['super_admin', 'admin']);
  if (response) return response;

  try {
    await connectToDatabase();
    const body = await req.json();

    const parseResult = CategoryCreateSchema.safeParse(body);
    if (!parseResult.success) {
      return apiError(
        parseResult.error.issues[0]?.message || 'Dữ liệu không hợp lệ',
        422,
        'VALIDATION_ERROR',
        parseResult.error.format()
      );
    }

    const { name, slug, description, status } = parseResult.data;

    // Check slug duplicate
    const existing = await Category.findOne({ slug });
    if (existing) {
      return apiError(`Slug "${slug}" đã tồn tại. Vui lòng chọn slug khác.`, 409, 'SLUG_EXISTS');
    }

    const category = await Category.create({
      name,
      slug,
      description,
      status,
    });

    return apiSuccess(category);
  } catch (error: any) {
    console.error('POST /admin/categories error:', error);
    return apiError('Không thể tạo danh mục', 500, 'SERVER_ERROR');
  }
}
