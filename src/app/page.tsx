import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles, getFeaturedArticles, getTrendingArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import BookmarkButton from '@/components/BookmarkButton';
import NewsletterForm from '@/components/NewsletterForm';
import BoxOfficeWidget from '@/components/BoxOfficeWidget';
import { Clock, Flame, Sparkles, ChevronRight, Mail } from 'lucide-react';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function HomePage() {
  const [allArticles, featuredArticles, trendingArticles] = await Promise.all([
    getAllArticles(),
    getFeaturedArticles(),
    getTrendingArticles(),
  ]);

  const heroArticle = featuredArticles[0] || allArticles[0];
  const secondaryFeatured = featuredArticles.slice(1);
  const latestArticles = allArticles.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. HERO SPOTLIGHT SECTION */}
      {heroArticle && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Hero (8 cols) */}
          <div className="lg:col-span-8 group relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 min-h-[440px] sm:min-h-[520px] flex flex-col justify-end p-6 sm:p-10">
            <Image
              src={heroArticle.featuredImage}
              alt={heroArticle.featuredImageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition duration-700 brightness-[0.75]"
            />
            {/* Gradient Overlay for high text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-600 text-white shadow-lg">
                  {heroArticle.category.toUpperCase()}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {heroArticle.readTimeMinutes} MIN READ
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-[1.15] group-hover:text-brand-300 transition">
                <Link href={`/${heroArticle.category}/${heroArticle.slug}`}>
                  {heroArticle.title}
                </Link>
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 line-clamp-2 max-w-2xl leading-relaxed">
                {heroArticle.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-700/60">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-brand-500">
                    <Image
                      src={heroArticle.author.avatar}
                      alt={heroArticle.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      {heroArticle.author.name}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      {heroArticle.author.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <BookmarkButton
                    articleSlug={heroArticle.slug}
                    articleTitle={heroArticle.title}
                    className="bg-neutral-900/80 backdrop-blur-md hover:bg-neutral-800"
                    showText
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Trending Rail (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl bg-neutral-900/60 border border-neutral-800/80 p-6">
            <div>
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-neutral-800 text-brand-500 font-display font-bold text-lg tracking-tight">
                <Flame className="w-5 h-5 fill-brand-500" />
                <span>Trending Right Now</span>
              </div>

              <div className="space-y-6">
                {trendingArticles.slice(0, 4).map((art, index) => (
                  <article key={art.id} className="group flex items-start gap-4">
                    <span className="text-3xl font-black font-display text-neutral-700 group-hover:text-brand-500 transition leading-none select-none">
                      0{index + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-400">
                        {art.category}
                      </span>
                      <h4 className="text-sm font-semibold text-white group-hover:text-brand-300 transition line-clamp-2 leading-snug">
                        <Link href={`/${art.category}/${art.slug}`}>
                          {art.title}
                        </Link>
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        {art.readTimeMinutes} min read • {art.viewsCount.toLocaleString()} views
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800/80">
              <Link
                href="/movies"
                className="flex items-center justify-between text-xs font-semibold text-neutral-300 hover:text-white group"
              >
                <span>Browse all entertainment stories</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-brand-400 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 2. AD PLACEMENT: LEADERBOARD AD */}
      <AdBanner variant="leaderboard" slot="1029384756" />

      {/* Industry Charts & Spotlight Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10 items-start">
        <div className="lg:col-span-5">
          <BoxOfficeWidget />
        </div>
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-900/60 border border-neutral-800 h-full">
          <div>
            <span className="text-[11px] font-bold text-brand-500 uppercase tracking-widest">
              Industry Spotlight
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
              Tracking Hollywood Box Office & US Streaming Trends
            </h3>
            <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
              Updated every weekend with Nielsen streaming statistics and Comscore theatrical grosses across North America. Get data-driven analyses on which blockbusters are driving theatrical admissions and which prestige series are dominating living room conversations.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
            <span>Source: Studio Distribution Reports & Comscore</span>
            <Link href="/movies" className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1">
              <span>Read Box Office Analysis</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. LATEST STORIES FEED */}
      <section className="my-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-800">
          <div>
            <span className="text-xs font-bold text-brand-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Latest Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Fresh From the Wire
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-0 text-xs text-neutral-400">
            <Link
              href="/movies"
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-800 transition"
            >
              Movies
            </Link>
            <Link
              href="/tv-shows"
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-800 transition"
            >
              TV & Streaming
            </Link>
            <Link
              href="/celebrities"
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-800 transition"
            >
              Celebrities
            </Link>
            <Link
              href="/gaming"
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 hover:text-white border border-neutral-800 transition"
            >
              Gaming
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 4. NEWSLETTER & INSIDER BRIEFING */}
      <section className="my-16 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-rose-950/40 border border-neutral-800 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl">
        <div className="inline-flex p-3 rounded-2xl bg-brand-500/10 text-brand-500 mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
          Get the Hollywood Insider Briefing
        </h3>
        <p className="mt-3 text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
          Join 150,000+ entertainment executives, critics, and film lovers. Curated box office reports, exclusive casting scoops, and review roundups delivered every weekday morning.
        </p>

        <NewsletterForm />

        <p className="mt-3 text-xs text-neutral-500">
          Zero spam. Unsubscribe anytime with one click. Read our{' '}
          <Link href="/privacy-policy" className="underline hover:text-neutral-300">
            Privacy Policy
          </Link>.
        </p>
      </section>

      {/* 5. BOTTOM AD PLACEMENT */}
      <AdBanner variant="multiplex" slot="9876543210" />
    </div>
  );
}
