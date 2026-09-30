import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { ArticleData } from '@/data/mockArticles';

interface ArticleCardProps {
  article: ArticleData;
  layout?: 'standard' | 'horizontal' | 'compact';
  showCategoryInUrl?: boolean;
}

export default function ArticleCard({
  article,
  layout = 'standard',
  showCategoryInUrl = false,
}: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Slug behavior: if showCategoryInUrl is true (inside category view), use /[category]/[slug]
  // Otherwise on homepage or general listings, use /[slug] directly
  const articleUrl = showCategoryInUrl ? `/${article.category}/${article.slug}` : `/${article.slug}`;

  if (layout === 'compact') {
    return (
      <article className="group flex gap-3 items-center py-2.5 border-b border-gray-100 last:border-b-0">
        <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt || article.title}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug">
            <Link href={articleUrl} prefetch={true}>
              {article.title}
            </Link>
          </h4>
          <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span>Posted {formattedDate}</span>
          </div>
        </div>
      </article>
    );
  }

  if (layout === 'horizontal') {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 p-4 rounded-lg bg-white border border-gray-200 hover:shadow-sm transition">
        <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0 rounded-md overflow-hidden bg-gray-100">
          <Link href={articleUrl} prefetch={true}>
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt || article.title}
              fill
              sizes="(max-width: 640px) 100vw, 256px"
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </Link>
        </div>

        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug">
              <Link href={articleUrl} prefetch={true}>
                {article.title}
              </Link>
            </h3>

            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2 mb-2">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>Posted {formattedDate}</span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </div>
      </article>
    );
  }

  // Standard vertical card matching reference site: module-list-new__item module-card
  return (
    <article className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition duration-200">
      <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
        <Link href={articleUrl} tabIndex={-1} prefetch={true}>
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt || article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </Link>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug line-clamp-2">
          <Link href={articleUrl} prefetch={true}>
            {article.title}
          </Link>
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2 mb-3">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span>Posted {formattedDate}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}
