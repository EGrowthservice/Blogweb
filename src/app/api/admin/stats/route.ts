import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Article } from '@/models/Article';
import { Category } from '@/models/Category';
import { User } from '@/models/User';
import { requireAuth, apiSuccess, apiError } from '@/lib/api-guard';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { auth, response } = await requireAuth(['super_admin', 'admin', 'editor']);
  if (response) return response;

  try {
    await connectToDatabase();

    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      totalCategories,
      activeCategories,
      totalUsers,
      recentPosts,
      metrics,
    ] = await Promise.all([
      Article.countDocuments(),
      Article.countDocuments({ status: 'published' }),
      Article.countDocuments({ status: 'draft' }),
      Article.countDocuments({ status: 'archived' }),
      Category.countDocuments(),
      Category.countDocuments({ status: 'active' }),
      User.countDocuments(),
      Article.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title slug category status viewsCount createdAt')
        .lean(),
      Article.aggregate([
        {
          $group: {
            _id: null,
            totalViews: { $sum: '$viewsCount' },
            totalLikes: { $sum: '$likesCount' },
          },
        },
      ]),
    ]);

    const totalViews = metrics[0]?.totalViews || 0;
    const totalLikes = metrics[0]?.totalLikes || 0;

    return apiSuccess({
      counts: {
        posts: totalPosts,
        publishedPosts,
        draftPosts,
        archivedPosts,
        categories: totalCategories,
        activeCategories,
        users: totalUsers,
        totalViews,
        totalLikes,
      },
      recentPosts,
    });
  } catch (error: any) {
    console.error('API /admin/stats error:', error);
    return apiError('Không thể tải dữ liệu thống kê', 500, 'SERVER_ERROR');
  }
}
