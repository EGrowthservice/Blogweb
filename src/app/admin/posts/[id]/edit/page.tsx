'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PostEditor } from '@/components/admin/PostEditor';
import { SkeletonTable, ErrorState } from '@/components/admin/StateViews';

export default function EditPostPage() {
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = React.useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/posts/${id}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể tìm thấy bài viết');
      }

      setPost({
        ...json.data,
        categoryId: json.data.categoryId?._id || json.data.categoryId || '',
        thumbnail: json.data.featuredImage,
        thumbnailAlt: json.data.featuredImageAlt,
      });
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải dữ liệu bài viết');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) {
    return (
      <div className="space-y-4 max-w-5xl mx-auto py-8">
        <div className="h-8 bg-zinc-800 rounded-xl w-1/3 animate-pulse" />
        <SkeletonTable rows={4} cols={3} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-md mx-auto py-12">
        <ErrorState message={error || 'Không tìm thấy bài viết'} onRetry={fetchPost} />
      </div>
    );
  }

  return <PostEditor initialData={post} isEditMode={true} />;
}
