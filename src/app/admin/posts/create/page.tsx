'use client';

import React, { Suspense } from 'react';
import { PostEditor } from '@/components/admin/PostEditor';
import { Loader2 } from 'lucide-react';

function CreatePostInner() {
  return <PostEditor isEditMode={false} />;
}

export default function CreatePostPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-64">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      }
    >
      <CreatePostInner />
    </Suspense>
  );
}
