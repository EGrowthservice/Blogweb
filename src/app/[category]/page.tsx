import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategoryBySlug, getAllCategories } from '@/lib/categories';
import { getArticlesByCategory, getAllArticles, getArticleBySlug } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import ArticleDetailView from '@/components/ArticleDetailView';
import { ChevronRight, Home, Sparkles, BookOpen, Wrench, ArrowRight } from 'lucide-react';

interface CategoryOrArticlePageProps {
  params: {
    category: string;
  };
}

export const revalidate = 60; // Cache for 60s at CDN edge

export async function generateMetadata({ params }: CategoryOrArticlePageProps): Promise<Metadata> {
  // 1. Check if category exists in database
  const cat = await getCategoryBySlug(params.category);
  if (cat) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';
    const categoryUrl = `${baseUrl}/${cat.slug}`;

    return {
      title: `${cat.name} Tutorials & Guides | PULSE TechTips`,
      description: cat.description,
      openGraph: {
        title: `${cat.name} Tutorials & Guides | PULSE TechTips`,
        description: cat.description,
        url: categoryUrl,
        siteName: 'PULSE TechTips',
      },
      alternates: {
        canonical: categoryUrl,
      },
    };
  }

  // 2. Check if it's an article slug accessed directly from homepage
  const article = await getArticleBySlug(params.category);
  if (article) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';
    const canonicalArticleUrl = `${baseUrl}/${article.category}/${article.slug}`;
    const publishedIso =
      typeof article.publishedAt === 'string'
        ? article.publishedAt
        : new Date(article.publishedAt).toISOString();

    return {
      title: `${article.title} | PULSE TechTips`,
      description: article.excerpt,
      alternates: {
        canonical: canonicalArticleUrl,
      },
      openGraph: {
        title: article.title,
        description: article.excerpt,
        url: canonicalArticleUrl,
        siteName: 'PULSE TechTips',
        type: 'article',
        publishedTime: publishedIso,
        images: [
          {
            url: article.featuredImage,
            width: 1200,
            height: 630,
            alt: article.featuredImageAlt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: [article.featuredImage],
      },
    };
  }

  return { title: 'Page Not Found | PULSE TechTips' };
}

export default async function CategoryOrArticlePage({ params }: CategoryOrArticlePageProps) {
  // 1. Query category from database
  const cat = await getCategoryBySlug(params.category);

  // If matching category in DB, render Category View
  if (cat) {
    const [articles, allCategories] = await Promise.all([
      getArticlesByCategory(params.category),
      getAllCategories(),
    ]);

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{cat.name}</span>
        </nav>

        {/* Category Hero Banner: White, Black, Red, Blue */}
        <div className="mb-10 rounded-3xl bg-slate-950 text-white p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
              <span>Category Knowledge Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display mb-3">
              {cat.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              {cat.description}
            </p>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white">
                {articles.length} {articles.length === 1 ? 'Tutorial' : 'Tutorials'} Available
              </span>
              <span>•</span>
              <span className="text-blue-400">Audited for Accuracy</span>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Articles List (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Curated Tutorials ({articles.length})</span>
              </h2>
            </div>

            {articles.length === 0 ? (
              <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 mb-1">No tutorials yet in this section</h3>
                <p className="text-xs text-slate-500">
                  New step-by-step guides are actively in review by our technical team.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {articles.map((art) => (
                  <ArticleCard
                    key={art.id || art.slug}
                    article={art}
                    showCategoryInUrl={true}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Interactive Tools Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-600 mb-2">
                <Wrench className="w-4 h-4" />
                <span>Instant Utilities</span>
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2 font-display">
                Free Browser Tools
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Test code, format documents, and create cryptographic passwords without leaving your browser.
              </p>
              <div className="space-y-2">
                <Link
                  href="/shortlink"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-slate-800 hover:text-blue-600 transition border border-slate-100"
                >
                  <span>ShortLink Generator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                </Link>
                <Link
                  href="/tools/text-case"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-slate-800 hover:text-blue-600 transition border border-slate-100"
                >
                  <span>Text Case &amp; Word Counter</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                </Link>
                <Link
                  href="/tools/password-generator"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-slate-800 hover:text-blue-600 transition border border-slate-100"
                >
                  <span>Secure Password Generator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                </Link>
                <Link
                  href="/tools/qr-generator"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-slate-800 hover:text-blue-600 transition border border-slate-100"
                >
                  <span>Instant QR Code Maker</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                </Link>
                <Link
                  href="/tools/json-formatter"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-slate-800 hover:text-blue-600 transition border border-slate-100"
                >
                  <span>JSON Formatter &amp; Validator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                </Link>
              </div>
            </div>

            {/* Other Categories Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 pb-3 mb-4 border-b border-slate-100 uppercase tracking-wider">
                Explore Other Topics
              </h3>
              <div className="space-y-2">
                {allCategories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}`}
                    className={`block text-xs sm:text-sm py-2 px-3 rounded-xl transition font-bold ${
                      c.slug === cat.slug
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Responsive AdSense Banner */}
            <AdBanner variant="sidebar" slot="3847291056" />
          </aside>
        </div>
      </div>
    );
  }

  // 2. If not a category, check if it's an article slug in database
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(params.category),
    getAllArticles(),
  ]);

  if (!article) {
    notFound();
  }

  // Render article view directly when opened from homepage /[slug]
  return (
    <ArticleDetailView
      article={article}
      allArticles={allArticles}
      isCategoryPath={false}
    />
  );
}
