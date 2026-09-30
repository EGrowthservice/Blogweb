import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { getAllCategories } from '@/lib/categories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';

  // 1. Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/all-stories`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 2. Dynamic Categories from MongoDB
  const [categories, articles] = await Promise.all([
    getAllCategories(),
    getAllArticles(),
  ]);

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 0.9,
  }));

  // 3. Dynamic Articles from MongoDB
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/${article.category}/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
