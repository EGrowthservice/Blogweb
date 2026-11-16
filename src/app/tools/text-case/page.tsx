'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Type,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  FileText,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function TextCasePage() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute text statistics
  const stats = useMemo(() => {
    const raw = text;
    const trimmed = raw.trim();
    const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
    const chars = raw.length;
    const charsNoSpaces = raw.replace(/\s/g, '').length;
    const lines = trimmed.length === 0 ? 0 : raw.split(/\r\n|\r|\n/).length;
    const paragraphs = trimmed.length === 0 ? 0 : raw.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // 200 wpm average
    return { words, chars, charsNoSpaces, lines, paragraphs, readingTime };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toUppercase = () => setText((prev) => prev.toUpperCase());
  const toLowercase = () => setText((prev) => prev.toLowerCase());

  const toTitleCase = () => {
    setText((prev) =>
      prev.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      )
    );
  };

  const toSentenceCase = () => {
    setText((prev) =>
      prev
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
    );
  };

  const toSlugCase = () => {
    setText((prev) =>
      prev
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    );
  };

  const cleanExtraSpaces = () => {
    setText((prev) =>
      prev
        .split('\n')
        .map((line) => line.replace(/\s+/g, ' ').trim())
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    );
  };

  const handleClear = () => setText('');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách Tiện ích</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-200">
          <Type className="w-3.5 h-3.5" />
          <span>Tiện Ích Xử Lý Văn Bản</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Đếm Từ & Chuyển Đổi Định Dạng Chữ Trực Tuyến
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Đếm số từ, ký tự, số dòng theo thời gian thực và chuyển đổi văn bản sang CHỮ HOA, chữ thường, Title Case, Slug SEO cực nhanh.
        </p>
      </div>

      {/* Main Interactive Tool Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-10">
        {/* Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
            <span className="block text-2xl font-black text-gray-900">{stats.words}</span>
            <span className="text-xs text-gray-500 font-medium">Số Từ</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
            <span className="block text-2xl font-black text-blue-600">{stats.chars}</span>
            <span className="text-xs text-gray-500 font-medium">Ký Tự (có dấu cách)</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
            <span className="block text-2xl font-black text-emerald-600">{stats.charsNoSpaces}</span>
            <span className="text-xs text-gray-500 font-medium">Ký Tự (không cách)</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
            <span className="block text-2xl font-black text-purple-600">{stats.lines}</span>
            <span className="text-xs text-gray-500 font-medium">Số Dòng</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
            <span className="block text-2xl font-black text-amber-600">{stats.paragraphs}</span>
            <span className="text-xs text-gray-500 font-medium">Đoạn Văn</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
            <span className="block text-2xl font-black text-indigo-600">~{stats.readingTime}p</span>
            <span className="text-xs text-gray-500 font-medium">Thời Gian Đọc</span>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="relative mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Dán hoặc nhập nội dung văn bản của bạn tại đây để bắt đầu đếm từ và chuyển đổi định dạng..."
            className="w-full p-4 sm:p-5 text-sm sm:text-base border border-gray-300 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition leading-relaxed resize-y font-mono"
          />
          {text.length > 0 && (
            <button
              onClick={handleClear}
              className="absolute top-3 right-3 p-1.5 text-xs text-gray-400 hover:text-red-500 bg-white/80 rounded-md border border-gray-200 transition"
              title="Xóa toàn bộ nội dung"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toUppercase}
              disabled={!text}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-50 transition"
            >
              CHỮ HOA
            </button>
            <button
              onClick={toLowercase}
              disabled={!text}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-50 transition"
            >
              chữ thường
            </button>
            <button
              onClick={toTitleCase}
              disabled={!text}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-50 transition"
            >
              Viết Hoa Chữ Đầu
            </button>
            <button
              onClick={toSentenceCase}
              disabled={!text}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-50 transition"
            >
              Chữ Đầu Câu
            </button>
            <button
              onClick={toSlugCase}
              disabled={!text}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-50 transition"
              title="Chuyển thành định dạng url-slug không dấu"
            >
              slug-seo-case
            </button>
            <button
              onClick={cleanExtraSpaces}
              disabled={!text}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 disabled:opacity-50 transition"
              title="Xóa khoảng trắng thừa và dòng trống liên tiếp"
            >
              Xóa Khoảng Trắng Thừa
            </button>
          </div>

          <button
            onClick={handleCopy}
            disabled={!text}
            className={`inline-flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Đã Sao Chép!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Sao Chép Kết Quả
              </>
            )}
          </button>
        </div>
      </div>

      {/* Educational Article & Instructions for SEO & E-E-A-T */}
      <div className="prose prose-blue max-w-none bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          Hướng Dẫn & Mẹo Tối Ưu Hóa Định Dạng Văn Bản
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
          <p>
            Trong quá trình soạn thảo tài liệu văn phòng, viết bài chuẩn SEO, hoặc đăng tải nội dung mạng xã hội, việc chuẩn hóa định dạng văn bản đóng vai trò then chốt trong việc tạo ấn tượng chuyên nghiệp và thu hút độc giả.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6">1. Khi nào nên dùng từng kiểu chữ?</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>CHỮ HOA (UPPERCASE):</strong> Dùng cho tiêu đề cấp cao, từ viết tắt (SEO, HTML, RAM), hoặc thông báo cảnh báo khẩn cấp. Tránh viết hoa toàn bộ đoạn văn vì gây cảm giác la hét và khó đọc.
            </li>
            <li>
              <strong>Title Case (Viết Hoa Chữ Đầu Từ):</strong> Chuẩn mực cho tiêu đề bài viết blog, tiêu đề sách, và các nút kêu gọi hành động (CTA).
            </li>
            <li>
              <strong>Sentence case (Chữ Đầu Câu):</strong> Dùng cho các đoạn văn thông thường, mô tả sản phẩm và nội dung email chuyên nghiệp.
            </li>
            <li>
              <strong>slug-case (Đường dẫn SEO):</strong> Tự động chuyển đổi tiếng Việt có dấu thành chuỗi không dấu, phân cách bằng dấu gạch ngang (ví dụ: <code>thuat-toan-xlookup-excel</code>), thích hợp để đặt tên file và slug URL website.
            </li>
          </ul>

          <h3 className="text-lg font-bold text-gray-900 mt-6">2. Xóa khoảng trắng thừa và dòng trống</h3>
          <p>
            Văn bản copy từ PDF hoặc các trang web thường dính lỗi khoảng trắng kép hoặc ngắt dòng lộn xộn. Tính năng <strong>&quot;Xóa Khoảng Trắng Thừa&quot;</strong> sẽ tự động gom các khoảng trắng liên tiếp thành 1 dấu cách duy nhất và giữ cấu trúc đoạn văn sạch sẽ.
          </p>
        </div>
      </div>
    </div>
  );
}
