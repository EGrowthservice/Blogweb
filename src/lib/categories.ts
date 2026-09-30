import { cache } from 'react';
import { connectToDatabase } from '@/lib/db';
import { Category } from '@/models/Category';

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive';
}

function formatCategoryDoc(doc: any): CategoryData {
  return {
    id: doc._id?.toString() || doc.id || '',
    name: doc.name || '',
    slug: doc.slug || '',
    description: doc.description || '',
    status: doc.status || 'active',
  };
}

let categoryCache: CategoryData[] | null = null;
let categoryCacheExpiresAt = 0;
const CATEGORY_CACHE_TTL_MS = 60 * 1000;

export function clearCategoriesCache(): void {
  categoryCache = null;
  categoryCacheExpiresAt = 0;
}

/**
 * Fetch all active categories dynamically from MongoDB database
 */
export const getAllCategories = cache(async (): Promise<CategoryData[]> => {
  if (categoryCache && Date.now() < categoryCacheExpiresAt) {
    return categoryCache;
  }

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const categories = await Category.find({ status: 'active' })
        .sort({ createdAt: 1 })
        .lean()
        .exec();

      const formatted = (categories || []).map(formatCategoryDoc);
      categoryCache = formatted;
      categoryCacheExpiresAt = Date.now() + CATEGORY_CACHE_TTL_MS;
      return formatted;
    }
  } catch (error) {
    console.error('Failed to fetch categories from database:', error);
  }

  return [];
});

/**
 * Fetch a single category by slug dynamically from MongoDB database
 */
export const getCategoryBySlug = cache(async (slug: string): Promise<CategoryData | null> => {
  const all = await getAllCategories();
  const found = all.find((c) => c.slug === slug);
  if (found) return found;

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const cat = await Category.findOne({ slug, status: 'active' }).lean().exec();
      if (cat) return formatCategoryDoc(cat);
    }
  } catch (error) {
    console.error('Failed to fetch category by slug from database:', error);
  }

  return null;
});
