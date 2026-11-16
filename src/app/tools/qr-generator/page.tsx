'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  QrCode,
  Download,
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
  Link2,
  Wifi,
  Mail,
  FileText,
  Phone,
} from 'lucide-react';

export default function QrGeneratorPage() {
  const [qrType, setQrType] = useState<'url' | 'text' | 'wifi' | 'phone'>('url');
  const [content, setContent] = useState('https://www.pulseetm.click');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiType, setWifiType] = useState('WPA');
  const [copied, setCopied] = useState(false);

  // Compute final QR text
  const getPayload = () => {
    if (qrType === 'wifi') {
      return `WIFI:S:${wifiSsid};T:${wifiType};P:${wifiPassword};;`;
    }
    if (qrType === 'phone') {
      return `tel:${content}`;
    }
    return content || 'https://www.pulseetm.click';
  };

  const payload = getPayload();
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=15&data=${encodeURIComponent(
    payload
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(payload).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `qrcode-pulse-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(qrUrl, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-3 border border-purple-200">
          <QrCode className="w-3.5 h-3.5" />
          <span>Mã Phản Hồi Nhanh</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Trình Tạo Mã QR Code Miễn Phí
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Tạo mã QR tức thì cho đường link website, mạng WiFi, số điện thoại hoặc văn bản. Tải về ảnh PNG độ phân giải cao hoàn toàn miễn phí.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Left: Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm">
          {/* QR Type Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-3 overflow-x-auto">
            <button
              onClick={() => {
                setQrType('url');
                setContent('https://www.pulseetm.click');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                qrType === 'url'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" /> Link Website
            </button>
            <button
              onClick={() => {
                setQrType('text');
                setContent('Chào mừng bạn đến với PULSE TechTips!');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                qrType === 'text'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Văn Bản
            </button>
            <button
              onClick={() => setQrType('wifi')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                qrType === 'wifi'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" /> Mạng WiFi
            </button>
            <button
              onClick={() => {
                setQrType('phone');
                setContent('0901234567');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                qrType === 'phone'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Phone className="w-3.5 h-3.5" /> Số Điện Thoại
            </button>
          </div>

          {/* Form Inputs */}
          {qrType === 'wifi' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Tên Mạng WiFi (SSID)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="Ví dụ: WiFi_CongTy_Tang2"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Mật Khẩu WiFi
                </label>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="Nhập mật khẩu WiFi..."
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Loại Mã Hóa
                </label>
                <select
                  value={wifiType}
                  onChange={(e) => setWifiType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Phổ biến)</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Không có mật khẩu</option>
                </select>
              </div>
            </div>
          ) : qrType === 'phone' ? (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Số Điện Thoại
              </label>
              <input
                type="tel"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập số điện thoại (ví dụ: 0987654321)..."
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Khi quét mã, điện thoại sẽ tự động mở bàn phím gọi số này.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {qrType === 'url' ? 'Đường Dẫn URL' : 'Nội Dung Văn Bản'}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder={
                  qrType === 'url'
                    ? 'Nhập địa chỉ link (ví dụ: https://www.pulseetm.click)...'
                    : 'Nhập nội dung cần mã hóa thành mã QR...'
                }
                className="w-full p-3.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono"
              />
            </div>
          )}
        </div>

        {/* Right: QR Preview & Download (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-white border border-gray-200 rounded-2xl shadow-inner mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="Mã QR xem trước"
              width={220}
              height={220}
              className="rounded-xl"
            />
          </div>

          <div className="w-full space-y-2.5">
            <button
              onClick={handleDownload}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-purple-600 hover:bg-purple-700 text-white transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" /> Tải Xuống Ảnh PNG
            </button>
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 transition flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" /> Đã Copy Dữ Liệu!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Sao Chép Nội Dung Mã
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Guide & Best Practices */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-3 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Cách Quét & Ứng Dụng Mã QR Hiệu Quả
        </h2>
        <p>
          Mã QR (Quick Response) ngày nay có thể được quét trực tiếp bằng camera trên hầu hết điện thoại thông minh (iPhone, Samsung, Xiaomi) mà không cần cài thêm ứng dụng phụ trợ.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>
            <strong>Chia sẻ WiFi không cần nhập pass:</strong> In mã QR WiFi dán tại phòng khách hoặc quán cafe để khách hàng chỉ cần giơ máy quét là kết nối ngay.
          </li>
          <li>
            <strong>In trên danh thiếp & tài liệu:</strong> Giúp người nhận truy cập nhanh website hoặc danh bạ chỉ trong 1 giây.
          </li>
        </ul>
      </div>
    </div>
  );
}
