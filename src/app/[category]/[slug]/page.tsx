import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { CATEGORIES } from '@/data/mockArticles';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';
import CommentSection from '@/components/CommentSection';
import AdBanner from '@/components/AdBanner';
import ArticleCard from '@/components/ArticleCard';
import ArticleReactions from '@/components/ArticleReactions';
import BoxOfficeWidget from '@/components/BoxOfficeWidget';
import { Clock, Calendar, ChevronRight, CheckCircle2, Award } from 'lucide-react';

interface ArticlePageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return { title: 'Article Not Found' };
  }

  const url = `https://pulse-entertainment.com/${article.category}/${article.slug}`;

  return {
    title: `${article.title} | PULSE Entertainment`,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    keywords: article.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: 'PULSE Entertainment',
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
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
      creator: article.author.twitter || '@pulse_ent',
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article || article.category !== params.category) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.slug, article.category, 3);
  const categoryInfo = CATEGORIES.find((c) => c.slug === article.category);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const pageUrl = `https://pulse-entertainment.com/${article.category}/${article.slug}`;

  // Rich Snippet JSON-LD Schema: NewsArticle + BreadcrumbList (E-E-A-T & Google News compliance)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    headline: article.title,
    description: article.excerpt,
    image: [article.featuredImage],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      url: `https://pulse-entertainment.com/about#${encodeURIComponent(article.author.name)}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PULSE Entertainment',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pulse-entertainment.com/logo.png',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://pulse-entertainment.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryInfo?.name || article.category,
        item: `https://pulse-entertainment.com/${article.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: pageUrl,
      },
    ],
  };

  // Extract FAQ Structured Data if available in article content (Google Rich Snippets)
  const faqRegex = /<h4[^>]*>(.*?)<\/h4>\s*<p[^>]*>(.*?)<\/p>/gi;
  const faqMatches: RegExpExecArray[] = [];
  let match: RegExpExecArray | null;
  while ((match = faqRegex.exec(article.content)) !== null) {
    faqMatches.push(match);
  }
  const faqJsonLd =
    faqMatches.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqMatches.map((m) => ({
            '@type': 'Question',
            name: m[1].replace(/<[^>]+>/g, '').trim(),
            acceptedAnswer: {
              '@type': 'Answer',
              text: m[2].replace(/<[^>]+>/g, '').trim(),
            },
          })),
        }
      : null;

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
          <Link href={`/${article.category}`} className="hover:text-white transition capitalize">
            {categoryInfo?.name || article.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
          <span className="text-neutral-300 truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <Link
              href={`/${article.category}`}
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-600/90 hover:bg-brand-600 text-white transition"
            >
              {categoryInfo?.name || article.category}
            </Link>
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              {article.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-serif">
            {article.excerpt}
          </p>

          {/* Author Card & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-brand-500">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">
                    {article.author.name}
                  </span>
                  <span title="Verified Journalist">
                    <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span>{article.author.role}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-neutral-500" />
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Save to Library & Social Share */}
            <div className="flex items-center gap-4">
              <BookmarkButton
                articleSlug={article.slug}
                articleTitle={article.title}
                className="bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-xl"
                showText
              />
              <ShareButtons title={article.title} url={pageUrl} />
            </div>
          </div>
        </header>

        {/* Featured Hero Image */}
        <figure className="max-w-5xl mx-auto mb-10 rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900">
          <div className="relative w-full h-[320px] sm:h-[480px] md:h-[540px]">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
          <figcaption className="p-3 text-center text-xs text-neutral-400 bg-neutral-950 border-t border-neutral-800">
            {article.featuredImageAlt} — Photo via Universal / Getty Images / WireImage
          </figcaption>
        </figure>

        {/* Article Body & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Main Article Prose (8 cols) */}
          <div className="lg:col-span-8">
            {/* Fact Check / Editorial Notice */}
            <div className="mb-8 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-3 text-xs text-neutral-400">
              <Award className="w-4 h-4 text-brand-400 shrink-0" />
              <span>
                <strong>Editorial Transparency:</strong> This story has been verified by the PULSE Entertainment editorial desk in accordance with our{' '}
                <Link href="/about#editorial-standards" className="underline hover:text-white">
                  Fact-Checking Guidelines
                </Link>.
              </span>
            </div>

            {/* Article Content */}
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* IN-ARTICLE ADSENSE BANNER */}
            <AdBanner variant="in-article" slot="5492817364" />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mr-2">
                  Filed Under:
                </span>
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs rounded-lg border border-neutral-800 transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Bio Box (E-E-A-T Standard) */}
            <div className="mt-10 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row gap-5 items-start">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 ring-2 ring-brand-500/50">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">
                  About the Author
                </span>
                <h4 className="text-lg font-bold font-display text-white">
                  {article.author.name}
                </h4>
                <p className="text-xs text-neutral-400 font-medium">
                  {article.author.role}
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                  {article.author.bio}
                </p>
                {article.author.twitter && (
                  <p className="text-xs text-brand-400 pt-1 font-medium">
                    Follow on X: {article.author.twitter}
                  </p>
                )}
              </div>
            </div>

            {/* Article Reactions Widget */}
            <ArticleReactions articleSlug={article.slug} />

            {/* Interactive Comment Section */}
            <CommentSection articleSlug={article.slug} />
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Sticky Ad Slot */}
            <div className="sticky top-28 space-y-8">
              <AdBanner variant="sidebar" slot="8374920156" />

              {/* Live Box Office / US Streaming Tracker */}
              <BoxOfficeWidget />

              {/* Related Stories */}
              {relatedArticles.length > 0 && (
                <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white mb-4 pb-3 border-b border-neutral-800">
                    Related Coverage
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((rel) => (
                      <div key={rel.id} className="group flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-950">
                          <Image
                            src={rel.featuredImage}
                            alt={rel.featuredImageAlt}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-105 transition"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-semibold text-white group-hover:text-brand-300 transition line-clamp-2 leading-snug">
                            <Link href={`/${rel.category}/${rel.slug}`}>
                              {rel.title}
                            </Link>
                          </h4>
                          <span className="text-[10px] text-neutral-500 mt-1 block">
                            {rel.readTimeMinutes} min read
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
