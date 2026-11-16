import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { ArticleData } from '@/types/article';

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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const articleUrl = showCategoryInUrl
    ? `/${article.category}/${article.slug}`
    : `/${article.slug}`;

  // Check if image is valid; if empty or null, we will omit the image container
  const hasValidImage = Boolean(article.featuredImage && article.featuredImage.trim().length > 5);
  const authorName =
    article.author?.name && article.author.name !== 'Super Admin'
      ? article.author.name
      : 'Editorial Desk';

  if (layout === 'compact') {
    return (
      <article className="group flex gap-3.5 items-center py-3 border-b border-slate-100 last:border-b-0">
        {hasValidImage && (
          <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt || article.title}
              fill
              sizes="80px"
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-black uppercase tracking-wider text-red-600 block mb-0.5">
            {article.category?.replace('-', ' ')}
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug">
            <Link href={articleUrl} prefetch={true}>
              {article.title}
            </Link>
          </h4>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
            <span className="text-slate-500 font-semibold">{article.readTimeMinutes} min read</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </article>
    );
  }

  if (layout === 'horizontal') {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:border-blue-500/40 transition duration-200">
        {hasValidImage && (
          <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
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
        )}

        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-wider border border-red-100">
                {article.category?.replace('-', ' ')}
              </span>
              <span className="text-[11px] font-bold text-blue-600">
                {article.readTimeMinutes} min read
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug mb-2">
              <Link href={articleUrl} prefetch={true}>
                {article.title}
              </Link>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Published {formattedDate}</span>
            </div>
            <Link
              href={articleUrl}
              className="font-bold text-blue-600 group-hover:translate-x-0.5 transition flex items-center gap-1"
            >
              Read Guide <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Standard vertical card
  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-blue-500/40 transition duration-300">
      {hasValidImage && (
        <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
          <Link href={articleUrl} tabIndex={-1} prefetch={true}>
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt || article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </Link>
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider">
              {article.category?.replace('-', ' ')}
            </span>
          </div>
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2.5">
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
            {article.readTimeMinutes} min read
          </span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug line-clamp-2 mb-2 font-display">
          <Link href={articleUrl} prefetch={true}>
            {article.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed flex-1 mb-4">
          {article.excerpt}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">By {authorName}</span>
          <span className="inline-flex items-center gap-1 font-bold text-blue-600 group-hover:translate-x-1 transition duration-200">
            Read Guide <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
