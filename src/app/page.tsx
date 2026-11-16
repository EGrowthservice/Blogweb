import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/lib/articles';
import { getAllCategories } from '@/lib/categories';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import YouTubeVideoSection from '@/components/YouTubeVideoSection';
import {
  Clock,
  ArrowRight,
  Sparkles,
  Link2,
  Type,
  KeyRound,
  QrCode,
  Code2,
  Laptop,
  Smartphone,
  FileSpreadsheet,
  Globe,
  BookOpen,
  CheckCircle,
  Flame,
  ShieldCheck,
} from 'lucide-react';

export const revalidate = 60; // ISR cache 60s for blazing-fast initial load

const QUICK_TOOLS = [
  {
    title: 'ShortLink Generator',
    slug: '/shortlink',
    icon: Link2,
    desc: 'Create clean keyword-based or secure random short URLs',
    badge: 'Popular',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Text Case & Counter',
    slug: '/tools/text-case',
    icon: Type,
    desc: 'Count words, characters, convert UPPERCASE, Title Case & slug',
    badge: 'Editor',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'Password Generator',
    slug: '/tools/password-generator',
    icon: KeyRound,
    desc: 'Generate brute-force resistant cryptographic passwords',
    badge: 'Security',
    color: 'from-amber-600 to-orange-600',
  },
  {
    title: 'QR Code Maker',
    slug: '/tools/qr-generator',
    icon: QrCode,
    desc: 'Generate instant high-res QR codes for URLs, text & Wi-Fi',
    badge: 'Utility',
    color: 'from-purple-600 to-pink-600',
  },
  {
    title: 'JSON Formatter',
    slug: '/tools/json-formatter',
    icon: Code2,
    desc: 'Beautify, minify, and validate complex JSON syntax trees',
    badge: 'Developer',
    color: 'from-cyan-600 to-blue-600',
  },
];

export default async function HomePage() {
  const [categories, articles] = await Promise.all([
    getAllCategories(),
    getAllArticles(),
  ]);

  // Separate blog category vs main tutorials categories
  const mainCategories = categories.filter((c) => c.slug !== 'blog');
  const blogCategory = categories.find((c) => c.slug === 'blog');

  // Find top featured article for each main category
  const categoryHighlights = mainCategories.map((cat) => {
    const featured =
      articles.find((a) => a.category === cat.slug && a.isFeatured) ||
      articles.find((a) => a.category === cat.slug);
    return {
      category: cat,
      article: featured,
    };
  });

  const hasAnyCategoryArticles = categoryHighlights.some((c) => c.article !== undefined);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* 1. High-Impact Hero Banner: White, Black, Red, Blue */}
      <section className="relative mb-12 sm:mb-16 rounded-3xl bg-slate-950 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-slate-800">
        {/* Subtle Decorative Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Red Hot Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider mb-5 shadow-sm">
            <Flame className="w-3.5 h-3.5" />
            <span>Master Modern Tech &amp; Digital Productivity</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display text-white mb-5 leading-tight">
            Step-by-Step Tech Hacks, PC Speed &amp; Digital Utilities
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
            In-depth, field-tested tutorials on Windows 11 optimization, smartphone battery longevity, Excel modeling automation, plus a suite of 100% free client-side browser tools.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/all-stories"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base transition shadow-lg shadow-blue-600/30"
            >
              <span>Explore All Tutorials</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-sm sm:text-base transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Launch Free Web Tools</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>20+ In-Depth Guides</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              <span>5 Client-Side Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>100% Free &amp; AdSense Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Category Filter Pills */}
      <section className="mb-12">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
          <Link
            href="/pc-tips"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-blue-50 hover:text-blue-600 text-slate-800 transition border border-slate-200 shadow-sm shrink-0"
          >
            <Laptop className="w-4 h-4 text-blue-600" />
            <span>PC &amp; Windows</span>
          </Link>
          <Link
            href="/mobile-tips"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-600 text-slate-800 transition border border-slate-200 shadow-sm shrink-0"
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Mobile &amp; iOS</span>
          </Link>
          <Link
            href="/office-productivity"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-amber-50 hover:text-amber-600 text-slate-800 transition border border-slate-200 shadow-sm shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-600" />
            <span>Office &amp; Excel</span>
          </Link>
          <Link
            href="/web-tools"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-purple-50 hover:text-purple-600 text-slate-800 transition border border-slate-200 shadow-sm shrink-0"
          >
            <Globe className="w-4 h-4 text-purple-600" />
            <span>Network &amp; Security</span>
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Online Tools Suite</span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 transition border border-slate-200 shadow-sm shrink-0"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Tech Blog</span>
          </Link>
        </div>
      </section>

      {/* 3. Interactive Web Tools Showcase */}
      <section className="mb-14 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Utilities</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">
              Free Browser-Based Productivity Tools
            </h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition shadow-md self-start sm:self-auto"
          >
            <span>Explore All 5 Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {QUICK_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={tool.slug}
                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition mb-1 leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-blue-300 font-bold">
                  <span>Open tool</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Prominent Leaderboard Ad Placement */}
      <div className="my-10">
        <AdBanner variant="leaderboard" slot="7182930415" />
      </div>

      {/* 4. Embedded YouTube Tech Video Masterclass (User Request) */}
      <YouTubeVideoSection />

      {/* 5. Category Highlights */}
      {hasAnyCategoryArticles && (
        <section className="mb-14">
          <div className="border-b-2 border-slate-900 pb-2 mb-6 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
              <span>Core Knowledge Disciplines</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {categoryHighlights.slice(0, 3).map(({ category, article }) => (
              <div key={category.slug} className="flex flex-col">
                {/* Category Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 hover:text-blue-600 transition">
                    <Link href={`/${category.slug}`}>{category.name}</Link>
                  </h3>
                  <Link
                    href={`/${category.slug}`}
                    className="text-xs text-blue-600 hover:underline font-bold"
                  >
                    View All →
                  </Link>
                </div>

                {/* Category Featured Article Card */}
                {article ? (
                  <article className="group flex flex-col flex-1 bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition duration-200">
                    <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Link href={`/${category.slug}/${article.slug}`} tabIndex={-1} prefetch={true}>
                        <Image
                          src={article.featuredImage}
                          alt={article.featuredImageAlt || article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </Link>
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider">
                          Featured Guide
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                          {article.readTimeMinutes} min read
                        </span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug line-clamp-2 mb-2">
                        <Link href={`/${category.slug}/${article.slug}`} prefetch={true}>
                          {article.title}
                        </Link>
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed flex-1">
                        {article.excerpt}
                      </p>
                    </div>
                  </article>
                ) : (
                  <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-400">
                    Articles in this category coming soon.
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Latest Tutorials Feed */}
      <section className="mb-14">
        <div className="border-b border-slate-200 pb-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              Latest Field-Tested Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Hands-on tutorials audited for accuracy across modern operating systems and software versions
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat.slug}>
                {idx > 0 && <span>•</span>}
                <Link
                  href={`/${cat.slug}`}
                  className="hover:text-blue-600 transition font-semibold text-slate-700"
                >
                  {cat.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 border border-slate-200 rounded-2xl">
            <h3 className="text-base font-semibold text-slate-900 mb-1">No articles published yet</h3>
            <p className="text-sm text-slate-500">
              New guides will appear here once published from the admin console.
            </p>
          </div>
        ) : (
          <>
            {/* 2-Columns Grid of Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id || article.slug}
                  article={article}
                  showCategoryInUrl={true}
                />
              ))}
            </div>

            {/* View Full Archive Action */}
            <div className="mt-10 pt-4 flex items-center justify-center">
              <Link
                href="/all-stories"
                prefetch={true}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-slate-950 hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition duration-200"
              >
                <span>Browse Complete Tutorial Archive ({articles.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* 7. Subcategory Blog Highlight */}
      {blogCategory && (
        <section className="mb-14 p-6 sm:p-8 bg-slate-900 text-white rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Dedicated Subcategory: Tech Blog</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Explorations in Artificial Intelligence &amp; Modern Computing
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Thoughtful long-form essays exploring autonomous AI agent ecosystems, operating system design paradigms, and hardware efficiency.
            </p>
          </div>
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm transition whitespace-nowrap shadow-sm shrink-0"
          >
            Visit Tech Blog →
          </Link>
        </section>
      )}

      {/* Bottom Ad placement */}
      <div className="mt-12 pt-6 border-t border-slate-200">
        <AdBanner variant="multiplex" slot="9876543210" />
      </div>
    </div>
  );
}
