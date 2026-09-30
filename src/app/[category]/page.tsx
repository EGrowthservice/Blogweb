import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES } from '@/data/mockArticles';
import { getArticlesByCategory, getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import { ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) {
    return { title: 'Category Not Found' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';
  const categoryUrl = `${baseUrl}/${cat.slug}`;

  return {
    title: `${cat.name} | PULSE Entertainment`,
    description: cat.description,
    openGraph: {
      title: `${cat.name} | PULSE Entertainment`,
      description: cat.description,
      url: categoryUrl,
    },
    alternates: {
      canonical: categoryUrl,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) {
    notFound();
  }

  const [articles, allArticles] = await Promise.all([
    getArticlesByCategory(params.category),
    getAllArticles(),
  ]);

  const recommended = allArticles.filter((a) => a.category !== params.category);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-700 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-medium">{cat.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {cat.name}
        </h1>
        <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">
          {cat.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Articles List (8 cols) */}
        <div className="lg:col-span-8">
          {articles.length === 0 ? (
            <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
              No stories found in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {articles.map((art) => (
                <ArticleCard key={art.id || art.slug} article={art} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-bold text-gray-900 pb-3 mb-4 border-b border-gray-200">
              Explore More
            </h3>
            <div className="space-y-3">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="block text-sm text-gray-700 hover:text-blue-600 py-1 transition font-medium"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <AdBanner variant="sidebar" slot="3847291056" />
        </aside>
      </div>
    </div>
  );
}
