'use client';

import React from 'react';
import { Inbox, AlertCircle, RefreshCw } from 'lucide-react';

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-12 bg-zinc-800/60 border-b border-zinc-800 flex items-center px-6 gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={`header-${i}`} className="h-4 bg-zinc-700/50 rounded flex-1" />
        ))}
      </div>
      <div className="divide-y divide-zinc-800/60">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={`row-${i}`} className="h-16 flex items-center px-6 gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <div
                key={`cell-${i}-${j}`}
                className={`h-4 bg-zinc-800 rounded ${j === 0 ? 'w-1/3' : 'flex-1'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({
  title = 'Chưa có dữ liệu',
  description = 'Hiện tại chưa có mục nào được tạo hoặc không tìm thấy kết quả phù hợp.',
  actionLabel,
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="w-full bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
      <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
        <Inbox className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-zinc-100 mb-1">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function ErrorState({
  message = 'Đã xảy ra lỗi khi tải dữ liệu.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="w-full bg-rose-950/20 border border-rose-900/40 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-2xl bg-rose-900/30 flex items-center justify-center text-rose-400 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-rose-300 mb-1">Không thể kết nối dữ liệu</h4>
      <p className="text-xs text-rose-400/80 max-w-md mb-4 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-medium text-xs rounded-xl transition-colors flex items-center gap-2 border border-zinc-700"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Thử lại
        </button>
      )}
    </div>
  );
}
