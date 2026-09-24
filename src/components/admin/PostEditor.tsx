'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Save,
  Send,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  Clock,
  Sparkles,
  Flame,
  CheckCircle,
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastContext';

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

interface PostInitialData {
  _id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  categoryId?: string | { _id: string; name: string };
  category?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
  isFeatured?: boolean;
  isTrending?: boolean;
  readTimeMinutes?: number;
}

interface PostEditorProps {
  initialData?: PostInitialData;
  isEditMode?: boolean;
}

export function PostEditor({ initialData, isEditMode = false }: PostEditorProps) {
  const router = useRouter();
  const toast = useToast();

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Form State
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [categoryId, setCategoryId] = useState<string>(
    typeof initialData?.categoryId === 'object'
      ? initialData?.categoryId?._id
      : initialData?.categoryId || ''
  );
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || '');
  const [thumbnailAlt, setThumbnailAlt] = useState(initialData?.thumbnailAlt || '');
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(', ') || '');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(
    initialData?.status || 'draft'
  );
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);
  const [isTrending, setIsTrending] = useState(initialData?.isTrending ?? false);
  const [readTimeMinutes, setReadTimeMinutes] = useState(initialData?.readTimeMinutes ?? 5);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Helper to slugify
  const generateSlug = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  // Fetch categories
  useEffect(() => {
    fetch('/api/admin/categories?limit=100&status=active')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setCategories(json.data);
          // If no category selected yet and categories available, select first one
          if (!categoryId && json.data.length > 0) {
            setCategoryId(json.data[0]._id);
          }
        }
      })
      .catch((err) => console.error('Error fetching categories:', err))
      .finally(() => setLoadingCategories(false));
  }, [categoryId]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditMode) {
      setSlug(generateSlug(val));
    }
  };

  const validateForm = (targetStatus: 'draft' | 'published' | 'archived') => {
    const errors: Record<string, string> = {};

    if (!title.trim() || title.trim().length < 5) {
      errors.title = 'Tiêu đề bài viết cần ít nhất 5 ký tự.';
    }

    if (!slug.trim() || slug.trim().length < 5) {
      errors.slug = 'Slug cần ít nhất 5 ký tự (chữ thường, số và dấu gạch nối).';
    }

    if (!categoryId) {
      errors.categoryId = 'Vui lòng chọn danh mục bài viết.';
    }

    if (!thumbnail.trim()) {
      errors.thumbnail = 'Vui lòng nhập đường link URL ảnh đại diện.';
    }

    if (targetStatus === 'published') {
      if (!excerpt.trim() || excerpt.trim().length < 10) {
        errors.excerpt = 'Bài viết xuất bản yêu cầu tóm tắt tối thiểu 10 ký tự.';
      }
      if (!content.trim() || content.trim().length < 20) {
        errors.content = 'Bài viết xuất bản yêu cầu nội dung tối thiểu 20 ký tự.';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (targetStatus?: 'draft' | 'published' | 'archived') => {
    const finalStatus = targetStatus || status;
    setFormError('');

    if (!validateForm(finalStatus)) {
      setFormError('Vui lòng kiểm tra và hoàn thành các trường bắt buộc bên dưới.');
      toast.warning('Dữ liệu chưa hợp lệ. Vui lòng kiểm tra lại!');
      return;
    }

    setSubmitting(true);

    try {
      const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        categoryId,
        thumbnail: thumbnail.trim(),
        thumbnailAlt: thumbnailAlt.trim() || title.trim(),
        tags: parsedTags,
        status: finalStatus,
        isFeatured,
        isTrending,
        readTimeMinutes: Number(readTimeMinutes),
      };

      const url = isEditMode
        ? `/api/admin/posts/${initialData?._id}`
        : '/api/admin/posts';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể lưu bài viết');
      }

      toast.success(
        isEditMode
          ? 'Đã cập nhật bài viết thành công!'
          : finalStatus === 'published'
          ? 'Đã xuất bản bài viết thành công!'
          : 'Đã lưu bản nháp thành công!'
      );

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setFormError(err.message || 'Lỗi khi lưu dữ liệu');
      toast.error(err.message || 'Lỗi khi lưu dữ liệu');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {isEditMode ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
            </h2>
            <p className="text-xs text-zinc-400">
              {isEditMode ? 'Cập nhật nội dung và trạng thái bài viết' : 'Soạn thảo nội dung và xuất bản lên PULSE'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSave('draft')}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Clock className="w-4 h-4 text-amber-400" />
            Lưu bản nháp
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSave('published')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Xuất bản ngay
          </button>
        </div>
      </div>

      {formError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-300 text-xs flex items-center gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{formError}</span>
        </div>
      )}

      {/* Main Grid: Left editor (2 cols), Right sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Tiêu đề bài viết <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ví dụ: Đánh Giá Siêu Phẩm Điện Ảnh Đáng Xem Nhất Mùa Thu 2026"
                className={`w-full bg-zinc-800 border rounded-xl px-4 py-3 text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors ${
                  fieldErrors.title ? 'border-rose-500' : 'border-zinc-700'
                }`}
              />
              {fieldErrors.title && (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Đường dẫn tĩnh (Slug) <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center">
                <span className="bg-zinc-800 text-zinc-500 text-xs px-3 py-2.5 rounded-l-xl border-y border-l border-zinc-700 select-none">
                  pulse.com/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase())}
                  placeholder="sieu-pham-dien-anh-2026"
                  className={`w-full bg-zinc-800 border rounded-r-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono transition-colors ${
                    fieldErrors.slug ? 'border-rose-500' : 'border-zinc-700'
                  }`}
                />
              </div>
              {fieldErrors.slug && (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.slug}</p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Tóm tắt ngắn (Excerpt)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Đoạn văn ngắn 1-2 câu tóm tắt nội dung hấp dẫn để hiển thị trên danh sách và thẻ SEO..."
                className={`w-full bg-zinc-800 border rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed ${
                  fieldErrors.excerpt ? 'border-rose-500' : 'border-zinc-700'
                }`}
              />
              {fieldErrors.excerpt && (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.excerpt}</p>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-zinc-300">
                Nội dung chi tiết (Markdown / HTML) <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] text-zinc-500">
                {content.split(/\s+/).filter(Boolean).length} từ
              </span>
            </div>
            <textarea
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung bài viết tại đây. Hỗ trợ định dạng văn bản, danh sách, trích dẫn..."
              className={`w-full bg-zinc-800 border rounded-xl p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans ${
                fieldErrors.content ? 'border-rose-500' : 'border-zinc-700'
              }`}
            />
            {fieldErrors.content && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.content}</p>
            )}
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-5">
          {/* Publishing Meta Box */}
          <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
              Thiết lập Xuất bản
            </h3>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Trạng thái bài viết
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="draft">Bản nháp (Draft)</option>
                <option value="published">Công khai (Published)</option>
                <option value="archived">Lưu trữ (Archived)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Danh mục <span className="text-rose-400">*</span>
              </label>
              {loadingCategories ? (
                <div className="text-xs text-zinc-500">Đang tải danh mục...</div>
              ) : (
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={`w-full bg-zinc-800 border rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 ${
                    fieldErrors.categoryId ? 'border-rose-500' : 'border-zinc-700'
                  }`}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
              {fieldErrors.categoryId && (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.categoryId}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Thời gian đọc (phút)
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={readTimeMinutes}
                onChange={(e) => setReadTimeMinutes(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-indigo-600 focus:ring-0 cursor-pointer"
                />
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Đánh dấu bài viết nổi bật (Featured)
              </label>

              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-indigo-600 focus:ring-0 cursor-pointer"
                />
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                Đang thịnh hành (Trending)
              </label>
            </div>
          </div>

          {/* Thumbnail Box */}
          <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
              Ảnh đại diện (Thumbnail) <span className="text-rose-400">*</span>
            </h3>

            <div>
              <input
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={`w-full bg-zinc-800 border rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 ${
                  fieldErrors.thumbnail ? 'border-rose-500' : 'border-zinc-700'
                }`}
              />
              {fieldErrors.thumbnail && (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.thumbnail}</p>
              )}
            </div>

            {thumbnail ? (
              <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
                <Image
                  src={thumbnail}
                  alt="Preview"
                  fill
                  unoptimized
                  onError={() => setThumbnail('')}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-zinc-800/60 border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 gap-1.5 p-4 text-center">
                <ImageIcon className="w-6 h-6 text-zinc-500" />
                <span className="text-[11px]">Dán đường dẫn URL ảnh để xem trước</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                Alt Text (Mô tả hình ảnh cho SEO)
              </label>
              <input
                type="text"
                value={thumbnailAlt}
                onChange={(e) => setThumbnailAlt(e.target.value)}
                placeholder="Mô tả nội dung bức ảnh..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Tags Box */}
          <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
              Thẻ bài viết (Tags)
            </h3>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="movies, review, cinema, 2026..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[10px] text-zinc-500">
              Phân cách các thẻ bằng dấu phẩy (,).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
