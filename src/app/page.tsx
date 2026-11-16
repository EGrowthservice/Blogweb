import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/lib/articles';
import { getAllCategories } from '@/lib/categories';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import {
  Clock,
  ArrowRight,
  Sparkles,
  Link2,
  Type,
  KeyRound,
  QrCode,
  Code2,
  CheckCircle2,
  Laptop,
  Smartphone,
  FileSpreadsheet,
  Globe,
  BookOpen,
} from 'lucide-react';

export const revalidate = 60; // ISR cache 60s for blazing-fast initial load

const QUICK_TOOLS = [
  {
    title: 'Rút Gọn Link',
    slug: '/shortlink',
    icon: Link2,
    desc: 'Tạo link ngắn ngẫu nhiên hoặc theo tiêu đề',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Đếm Từ & Đổi Chữ',
    slug: '/tools/text-case',
    icon: Type,
    desc: 'Đếm ký tự, chuyển HOA/thường, slug SEO',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'Tạo Mật Khẩu Mạnh',
    slug: '/tools/password-generator',
    icon: KeyRound,
    desc: 'Sinh mật khẩu ngẫu nhiên chống dò quét',
    color: 'from-amber-600 to-orange-600',
  },
  {
    title: 'Tạo Mã QR',
    slug: '/tools/qr-generator',
    icon: QrCode,
    desc: 'Tạo QR website, văn bản, kết nối WiFi',
    color: 'from-purple-600 to-pink-600',
  },
  {
    title: 'Làm Đẹp JSON',
    slug: '/tools/json-formatter',
    icon: Code2,
    desc: 'Định dạng và kiểm tra cú pháp JSON',
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
      {/* 1. Hero Platform Intro */}
      <section className="mb-12 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Nền Tảng Thủ Thuật Công Nghệ & Tiện Ích Số Thực Chiến</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight font-display mb-4 leading-tight">
          Giải Pháp Công Nghệ & Tiện Ích Số Hàng Ngày
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">
          Tổng hợp các hướng dẫn từng bước về tối ưu Windows, thủ thuật điện thoại Android/iOS, kỹ năng Excel văn phòng thực chiến và bộ công cụ trực tuyến miễn phí.
        </p>

        {/* Quick Category Navigation Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-semibold">
          <Link
            href="/pc-tips"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition border border-gray-200"
          >
            <Laptop className="w-3.5 h-3.5 text-blue-600" />
            <span>Thủ Thuật Máy Tính</span>
          </Link>
          <Link
            href="/mobile-tips"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-emerald-50 hover:text-emerald-600 text-gray-700 transition border border-gray-200"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Thủ Thuật Di Động</span>
          </Link>
          <Link
            href="/office-productivity"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-amber-50 hover:text-amber-600 text-gray-700 transition border border-gray-200"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-600" />
            <span>Tin Học Văn Phòng</span>
          </Link>
          <Link
            href="/web-tools"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-purple-50 hover:text-purple-600 text-gray-700 transition border border-gray-200"
          >
            <Globe className="w-3.5 h-3.5 text-purple-600" />
            <span>Mạng & Bảo Mật</span>
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bộ Tiện Ích Trực Tuyến</span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition border border-gray-200"
          >
            <BookOpen className="w-3.5 h-3.5 text-gray-500" />
            <span>Blog</span>
          </Link>
        </div>
      </section>

      {/* 2. Interactive Online Utilities Showcase (Value-Added Tool Suite) */}
      <section className="mb-14 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tiện Ích Trực Tuyến Miễn Phí</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Công Cụ Xử Lý Dữ Liệu & Năng Suất Số
            </h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition shadow-md self-start sm:self-auto"
          >
            <span>Tất Cả Tiện Ích</span>
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
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-blue-300 font-medium">
                  <span>Mở ngay</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Prominent High-Visibility Ad Placement */}
      <div className="my-10">
        <AdBanner variant="leaderboard" slot="7182930415" />
      </div>

      {/* 3. Category Highlights (PC, Mobile, Office, Web) */}
      {hasAnyCategoryArticles && (
        <section className="mb-14">
          <div className="border-b-2 border-gray-900 pb-2 mb-6 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              <span>Chuyên Mục Hướng Dẫn Trọng Tâm</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {categoryHighlights.slice(0, 3).map(({ category, article }) => (
              <div key={category.slug} className="flex flex-col">
                {/* Category Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200">
                  <h3 className="text-sm font-bold text-gray-900 hover:text-blue-600 transition">
                    <Link href={`/${category.slug}`}>{category.name}</Link>
                  </h3>
                  <Link
                    href={`/${category.slug}`}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Xem thêm
                  </Link>
                </div>

                {/* Category Featured Article Card */}
                {article ? (
                  <article className="group flex flex-col flex-1 bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition duration-200">
                    <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                      <Link href={`/${category.slug}/${article.slug}`} tabIndex={-1} prefetch={true}>
                        <Image
                          src={article.featuredImage}
                          alt={article.featuredImageAlt || article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </Link>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                          {article.readTimeMinutes} phút đọc
                        </span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug line-clamp-2 mb-2">
                        <Link href={`/${category.slug}/${article.slug}`} prefetch={true}>
                          {article.title}
                        </Link>
                      </h4>

                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed flex-1">
                        {article.excerpt}
                      </p>
                    </div>
                  </article>
                ) : (
                  <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-400">
                    Bài viết đang cập nhật
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Latest Tutorials Feed */}
      <section className="mb-14">
        <div className="border-b border-gray-200 pb-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Thủ Thuật & Hướng Dẫn Mới Nhất
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Các bài viết hướng dẫn chi tiết từng bước được biên tập và kiểm nghiệm thực tế
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat.slug}>
                {idx > 0 && <span>•</span>}
                <Link
                  href={`/${cat.slug}`}
                  className="hover:text-blue-600 transition font-medium"
                >
                  {cat.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="py-16 text-center bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Chưa có bài viết</h3>
            <p className="text-sm text-gray-500">
              Các hướng dẫn mới sẽ sớm xuất hiện tại đây.
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

            {/* Action Buttons: More stories / All Guides */}
            <div className="mt-10 pt-4 flex items-center justify-center gap-4">
              <Link
                href="/all-stories"
                prefetch={true}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gray-900 hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-sm hover:shadow transition duration-200"
              >
                <span>Xem Toàn Bộ Hướng Dẫn</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* 5. Subcategory Blog Callout */}
      {blogCategory && (
        <section className="mb-14 p-6 sm:p-8 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Chuyên Mục Nhỏ: Blog & Góc Nhìn</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Khám Phá Xu Hướng Công Nghệ & Trải Nghiệm Số
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
              Nơi chia sẻ các bài viết phân tích xu hướng AI, so sánh hệ điều hành và đánh giá thiết bị công nghệ hữu ích.
            </p>
          </div>
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-600 font-bold text-xs sm:text-sm border border-gray-200 shadow-sm transition whitespace-nowrap"
          >
            Đến Chuyên Mục Blog →
          </Link>
        </section>
      )}

      {/* Bottom Ad placement */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <AdBanner variant="multiplex" slot="9876543210" />
      </div>
    </div>
  );
}
