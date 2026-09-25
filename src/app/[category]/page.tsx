import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES } from '@/data/mockArticles';
import { getArticlesByCategory, getTrendingArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import CategoryArticleList from '@/components/CategoryArticleList';
import AdBanner from '@/components/AdBanner';
import { ChevronRight, Flame } from 'lucide-react';

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
    title: `${cat.name} News & Reviews | PULSE Entertainment`,
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';
  const categoryUrl = `${baseUrl}/${cat.slug}`;

  const [articles, trending] = await Promise.all([
    getArticlesByCategory(params.category),
    getTrendingArticles(),
  ]);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: cat.name,
        item: categoryUrl,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
        <Link href="/" className="hover:text-white transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
        <span className="text-white font-medium capitalize">{cat.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-10 pb-6 border-b border-neutral-800">
        <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
          Category Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mt-1">
          {cat.name}
        </h1>
        <p className="mt-3 text-base text-neutral-400 max-w-2xl leading-relaxed">
          {cat.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Articles List (8 cols) */}
        <div className="lg:col-span-8">
          <CategoryArticleList articles={articles} categoryName={cat.name} />
        </div>

        {/* Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Sticky Ad Banner */}
          <AdBanner variant="sidebar" slot="3847291056" />

          {/* Trending Box */}
          <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-6">
            <h3 className="flex items-center gap-2 text-base font-bold font-display text-white mb-4 pb-3 border-b border-neutral-800">
              <Flame className="w-4 h-4 text-brand-500" />
              Most Read Today
            </h3>
            <div className="space-y-4">
              {trending.slice(0, 4).map((art, idx) => (
                <div key={art.id} className="group flex items-start gap-3">
                  <span className="text-xl font-bold font-display text-neutral-600 group-hover:text-brand-500 transition">
                    #{idx + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-white group-hover:text-brand-300 transition line-clamp-2 leading-snug">
                      <Link href={`/${art.category}/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h4>
                    <span className="text-[10px] text-neutral-500 mt-1 block">
                      {art.readTimeMinutes} min read
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
