import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import ArticleDetailView from '@/components/ArticleDetailView';

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

  const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';
  const url = `${siteBase}/${article.category}/${article.slug}`;
  const publishedIso =
    typeof article.publishedAt === 'string'
      ? article.publishedAt
      : new Date(article.publishedAt).toISOString();

  return {
    title: `${article.title} | PULSE Entertainment`,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: 'PULSE Entertainment',
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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(params.slug),
    getAllArticles(),
  ]);

  if (!article || article.category !== params.category) {
    notFound();
  }

  return (
    <ArticleDetailView
      article={article}
      allArticles={allArticles}
      isCategoryPath={true}
    />
  );
}
