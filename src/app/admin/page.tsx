'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  FileText,
  FolderTree,
  Users,
  Eye,
  Heart,
  PlusCircle,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertTriangle,
  Archive,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { SkeletonTable, ErrorState } from '@/components/admin/StateViews';

interface DashboardStats {
  counts: {
    posts: number;
    publishedPosts: number;
    draftPosts: number;
    archivedPosts: number;
    categories: number;
    activeCategories: number;
    users: number;
    totalViews: number;
    totalLikes: number;
  };
  recentPosts: Array<{
    _id: string;
    title: string;
    slug: string;
    category: string;
    status: 'draft' | 'published' | 'archived';
    viewsCount: number;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể tải thống kê');
      }
      setData(json.data);
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (error) {
    return (
      <div className="py-12">
        <ErrorState message={error} onRetry={fetchStats} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-zinc-900 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Bảng Điều Khiển Quản Trị
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              v1.0
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Tổng quan nội dung, số liệu tương tác và hoạt động xuất bản mới nhất trên PULSE.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link
            href="/admin/posts/create"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Soạn bài mới
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 flex items-center gap-1.5 transition-colors shrink-0"
          >
            Xem Blog
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Posts Stat Card */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Bài viết
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white">
              {loading ? '...' : data?.counts.posts || 0}
            </h3>
            <div className="flex items-center gap-3 mt-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="w-3 h-3" />
                {data?.counts.publishedPosts || 0} công khai
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Clock className="w-3 h-3" />
                {data?.counts.draftPosts || 0} nháp
              </span>
            </div>
          </div>
        </div>

        {/* Categories Stat Card */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Danh mục
            </span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white">
              {loading ? '...' : data?.counts.categories || 0}
            </h3>
            <div className="flex items-center gap-1 mt-3 text-xs text-emerald-400">
              <CheckCircle className="w-3 h-3" />
              {data?.counts.activeCategories || 0} danh mục đang hoạt động
            </div>
          </div>
        </div>

        {/* Users Stat Card */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Người dùng & Admin
            </span>
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white">
              {loading ? '...' : data?.counts.users || 0}
            </h3>
            <p className="text-xs text-zinc-400 mt-3">
              Tài khoản quản trị & bạn đọc
            </p>
          </div>
        </div>

        {/* Total Views Card */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Tổng lượt xem
            </span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Eye className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white">
              {loading ? '...' : (data?.counts.totalViews || 0).toLocaleString()}
            </h3>
            <div className="flex items-center gap-1 mt-3 text-xs text-rose-400">
              <Heart className="w-3 h-3 fill-rose-400" />
              {(data?.counts.totalLikes || 0).toLocaleString()} lượt thích
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-zinc-900 border border-zinc-800/80 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Bài viết mới nhất
            </h3>
            <p className="text-xs text-zinc-400">
              Các bài viết được tạo hoặc cập nhật gần đây
            </p>
          </div>

          <Link
            href="/admin/posts"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            Xem tất cả
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <SkeletonTable rows={5} cols={4} />
        ) : !data?.recentPosts || data.recentPosts.length === 0 ? (
          <div className="p-8 text-center text-sm text-zinc-400">
            Chưa có bài viết nào được đăng tải.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead>
                <tr className="border-b border-zinc-800 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Tiêu đề</th>
                  <th className="py-3 px-4">Danh mục</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4">Lượt xem</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {data.recentPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white max-w-md truncate">
                      {post.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-xs border border-zinc-700 capitalize">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {post.status === 'published' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle className="w-3 h-3" />
                          Công khai
                        </span>
                      ) : post.status === 'draft' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Clock className="w-3 h-3" />
                          Bản nháp
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
                          <Archive className="w-3 h-3" />
                          Lưu trữ
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 font-mono text-xs">
                      {post.viewsCount || 0}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/posts/${post._id}/edit`}
                        className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-lg transition-colors border border-zinc-700"
                      >
                        Chỉnh sửa
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
