'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  AlertTriangle,
  FileCode,
  CheckCircle2,
} from 'lucide-react';

const SAMPLE_JSON = `{
  "site": "PULSE TechTips",
  "domain": "https://www.pulseetm.click",
  "features": [
    "Tech Tutorials",
    "Computer Hacks",
    "Online Utilities"
  ],
  "stats": {
    "activeUsers": 15420,
    "uptime": "99.98%"
  },
  "isApproved": true
}`;

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState(SAMPLE_JSON);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleBeautify = (spaces = 2) => {
    try {
      if (!inputJson.trim()) return;
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, spaces));
      setError(null);
      setSuccessMsg(`Đã định dạng thành công (${spaces} spaces)`);
      setTimeout(() => setSuccessMsg(null), 2500);
    } catch (err: any) {
      setError(err.message || 'Cú pháp JSON không hợp lệ');
    }
  };

  const handleMinify = () => {
    try {
      if (!inputJson.trim()) return;
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
      setError(null);
      setSuccessMsg('Đã nén JSON thành 1 dòng duy nhất');
      setTimeout(() => setSuccessMsg(null), 2500);
    } catch (err: any) {
      setError(err.message || 'Cú pháp JSON không hợp lệ');
    }
  };

  const handleValidate = () => {
    try {
      if (!inputJson.trim()) {
        setError('Vui lòng nhập chuỗi JSON để kiểm tra');
        return;
      }
      JSON.parse(inputJson);
      setError(null);
      setSuccessMsg('Tuyệt vời! Cú pháp JSON hoàn toàn hợp lệ 100%');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Cú pháp JSON không hợp lệ');
    }
  };

  const handleCopy = () => {
    if (!inputJson) return;
    navigator.clipboard.writeText(inputJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleLoadSample = () => {
    setInputJson(SAMPLE_JSON);
    setError(null);
  };

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold mb-3 border border-cyan-200">
          <Code2 className="w-3.5 h-3.5" />
          <span>Công Cụ Lập Trình & Dữ Liệu</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Định Dạng & Kiểm Tra Cú Pháp JSON
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Làm đẹp cấu trúc JSON, nén gọn mã (Minify) và phát hiện vị trí lỗi cú pháp chính xác theo tiêu chuẩn RFC 8259.
        </p>
      </div>

      {/* Main Formatter Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleBeautify(2)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
            >
              Làm Đẹp (2 Spaces)
            </button>
            <button
              onClick={() => handleBeautify(4)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
            >
              Làm Đẹp (4 Spaces)
            </button>
            <button
              onClick={handleMinify}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
            >
              Nén Minify
            </button>
            <button
              onClick={handleValidate}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition"
            >
              Kiểm Tra Lỗi
            </button>
            <button
              onClick={handleLoadSample}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition"
            >
              Mẫu JSON
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setInputJson('')}
              className="p-1.5 text-xs text-gray-400 hover:text-red-500 rounded-md transition"
              title="Xóa trắng"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1 px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-900 hover:bg-blue-600 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Đã Copy!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Sao Chép
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Lỗi cú pháp: </span>
              <span className="font-mono">{error}</span>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Text Area */}
        <textarea
          value={inputJson}
          onChange={(e) => {
            setInputJson(e.target.value);
            if (error) setError(null);
          }}
          rows={16}
          placeholder="Dán chuỗi JSON cần định dạng vào đây..."
          className="w-full p-4 font-mono text-xs sm:text-sm border border-gray-300 rounded-xl bg-gray-900 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-y"
          spellCheck={false}
        />
      </div>

      {/* Developer FAQ */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-3 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Lợi Ích Của Việc Chuẩn Hóa Dữ Liệu JSON
        </h2>
        <p>
          JSON (JavaScript Object Notation) là định dạng trao đổi dữ liệu tiêu chuẩn trên toàn thế giới giữa máy chủ và ứng dụng web.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>
            <strong>Dễ đọc và gỡ lỗi (Debugging):</strong> Thụt dòng 2 hoặc 4 spaces giúp lập trình viên nhanh chóng nhìn ra cấu trúc lồng nhau của các object và array.
          </li>
          <li>
            <strong>Tiết kiệm băng thông (Minification):</strong> Chế độ Minify xóa bỏ mọi khoảng trắng và ngắt dòng không cần thiết, giúp payload API truyền qua mạng nhanh hơn.
          </li>
        </ul>
      </div>
    </div>
  );
}
