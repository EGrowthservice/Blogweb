import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ArticleData } from '@/data/mockArticles';

const BookmarkButton = dynamic(() => import('./BookmarkButton'), {
  ssr: false,
  loading: () => <span className="inline-block w-8 h-8 rounded-full bg-neutral-800/40" />,
});

interface ArticleCardProps {
  article: ArticleData;
  layout?: 'standard' | 'horizontal' | 'compact';
}

export default function ArticleCard({ article, layout = 'standard' }: ArticleCardProps) {
  const categoryLabels: Record<string, string> = {
    'movies': 'Movies',
    'tv-shows': 'TV & Streaming',
    'celebrities': 'Celebrities',
    'music': 'Music',
    'gaming': 'Gaming',
  };

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (layout === 'horizontal') {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition">
        <div className="relative w-full sm:w-60 h-44 shrink-0 rounded-xl overflow-hidden bg-neutral-950">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover group-hover:scale-105 transition duration-500"
          />
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-neutral-900/90 text-brand-400 backdrop-blur-md">
            {categoryLabels[article.category] || article.category}
          </span>
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                {article.readTimeMinutes} min read
              </span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-brand-400 transition leading-snug line-clamp-2">
              <Link href={`/${article.category}/${article.slug}`}>
                {article.title}
              </Link>
            </h3>

            <p className="mt-2 text-sm text-neutral-400 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800/60">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs text-neutral-300 font-medium">
                {article.author.name}
              </span>
            </div>

            <BookmarkButton
              articleSlug={article.slug}
              articleTitle={article.title}
            />
          </div>
        </div>
      </article>
    );
  }

  // Standard vertical card
  return (
    <article className="group flex flex-col rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 overflow-hidden transition duration-200">
      <div className="relative w-full h-48 sm:h-52 bg-neutral-950 overflow-hidden">
        <Image
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-neutral-900/90 text-brand-400 backdrop-blur-md">
          {categoryLabels[article.category] || article.category}
        </span>
        <div className="absolute top-2.5 right-2.5">
          <BookmarkButton
            articleSlug={article.slug}
            articleTitle={article.title}
            className="bg-neutral-900/80 backdrop-blur-md hover:bg-neutral-800"
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-2.5">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-500" />
              {article.readTimeMinutes} min read
            </span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          <h3 className="text-lg font-bold font-display text-white group-hover:text-brand-400 transition leading-snug line-clamp-2">
            <Link href={`/${article.category}/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="mt-2 text-sm text-neutral-400 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center gap-2.5 mt-5 pt-3.5 border-t border-neutral-800/60">
          <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-neutral-700">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-neutral-200 font-medium">
              {article.author.name}
            </span>
            <span className="text-[10px] text-neutral-500">
              {article.author.role.split('&')[0]}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
