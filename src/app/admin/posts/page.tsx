'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  CheckCircle,
  Clock,
  Archive,
  Eye,
  Filter,
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastContext';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { ServerPagination } from '@/components/admin/ServerPagination';
import { SearchInput } from '@/components/admin/SearchInput';
import { SkeletonTable, EmptyState, ErrorState } from '@/components/admin/StateViews';

interface PostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categoryId?: { _id: string; name: string; slug: string };
  authorId?: { name: string; email: string };
  featuredImage: string;
  status: 'draft' | 'published' | 'archived';
  viewsCount: number;
  publishedAt?: string;
  createdAt: string;
}

export default function AdminPostsPage() {
  const toast = useToast();

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [categories, setCategories] = useState<Array<{ _id: string; name: string; slug: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState('newest');

  // Delete Confirm Dialog
  const [deleteTarget, setDeleteTarget] = useState<PostItem | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch Categories for the filter dropdown
  useEffect(() => {
    fetch('/api/admin/categories?limit=100')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setCategories(json.data);
        }
      })
      .catch((err) => console.error('Error fetching categories for filter:', err));
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        category: categoryFilter,
        status: statusFilter,
        sort: sortKey,
      });

      const res = await fetch(`/api/admin/posts?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể tải danh sách bài viết');
      }

      setPosts(json.data);
      setTotal(json.pagination.total);
      setTotalPages(json.pagination.totalPages);
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, categoryFilter, statusFilter, sortKey]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Execute Delete Post
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${deleteTarget._id}`, {
        method: 'DELETE',
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể xóa bài viết');
      }

      toast.success('Đã xóa bài viết thành công!');
      setDeleteTarget(null);
      fetchPosts();
    } catch (err: any) {
      toast.error(err.message || 'Không thể xóa bài viết');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-indigo-400" />
            Quản lý Bài viết & Tin tức
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Soạn thảo, phân loại, duyệt bài và quản lý trạng thái xuất bản
          </p>
        </div>

        <Link
          href="/admin/posts/create"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Soạn bài viết mới
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
        {/* Search */}
        <div className="sm:col-span-2">
          <SearchInput
            placeholder="Tìm theo tiêu đề hoặc slug..."
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="post-category-filter" className="sr-only">Lọc theo danh mục bài viết</label>
          <select
            id="post-category-filter"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="w-full bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map((c) => (
              <option key={c._id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="post-status-filter" className="sr-only">Lọc theo trạng thái bài viết</label>
          <select
            id="post-status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="published">Công khai (Published)</option>
            <option value="draft">Bản nháp (Draft)</option>
            <option value="archived">Lưu trữ (Archived)</option>
          </select>
        </div>
      </div>

      {/* Main Posts Table */}
      {loading ? (
        <SkeletonTable rows={6} cols={5} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchPosts} />
      ) : posts.length === 0 ? (
        <EmptyState
          title="Không có bài viết nào"
          description={
            search || categoryFilter !== 'all' || statusFilter !== 'all'
              ? 'Không tìm thấy bài viết phù hợp với bộ lọc hiện tại.'
              : 'Hiện chưa có bài viết nào trong hệ thống.'
          }
          actionLabel="Tạo bài viết mới"
          onAction={() => {
            window.location.href = '/admin/posts/create';
          }}
        />
      ) : (
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead>
                <tr className="border-b border-zinc-800 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-900/60">
                  <th className="py-3.5 px-4">Bài viết</th>
                  <th className="py-3.5 px-4">Danh mục</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4">Lượt xem</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="flex items-start gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700/60">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage}
                              alt={post.title}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                              <FileText className="w-5 h-5" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <Link
                            href={`/admin/posts/${post._id}/edit`}
                            className="font-semibold text-white hover:text-indigo-400 transition-colors line-clamp-1 text-sm"
                          >
                            {post.title}
                          </Link>
                          <div className="text-[11px] text-zinc-500 font-mono truncate mt-0.5">
                            /{post.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700 capitalize">
                        {post.categoryId?.name || post.category}
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

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-xs text-zinc-400 font-mono">
                        <Eye className="w-3.5 h-3.5 text-zinc-500" />
                        {post.viewsCount || 0}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.status === 'published' && (
                          <Link
                            href={`/${post.category}/${post.slug}`}
                            target="_blank"
                            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors"
                            title="Xem trên trang chủ"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post._id}/edit`}
                          className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors"
                          title="Sửa bài viết"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(post)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-950/40 rounded-lg border border-rose-900/30 transition-colors"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-800 px-4">
            <ServerPagination
              page={page}
              limit={limit}
              total={total}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
              onLimitChange={(l) => {
                setLimit(l);
                setPage(1);
              }}
            />
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Xóa bài viết"
        message={`Bạn có chắc chắn muốn xóa bài viết "${deleteTarget?.title}"? Thao tác này không thể hoàn tác.`}
        confirmLabel="Xác nhận xóa"
        isLoading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
