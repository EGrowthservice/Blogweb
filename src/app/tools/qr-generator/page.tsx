'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  QrCode,
  Download,
  Copy,
  Check,
  ArrowLeft,
  Link2,
  Wifi,
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
          <span>Back to Online Tools</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
          <QrCode className="w-3.5 h-3.5" />
          <span>Quick Response Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Free QR Code Generator
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Instantly generate high-resolution QR codes for websites, Wi-Fi networks, phone numbers, or arbitrary plain text. Download crystal-clear PNG images 100% free with no expiration.
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
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" /> Website URL
            </button>
            <button
              onClick={() => {
                setQrType('text');
                setContent('Welcome to PULSE TechTips & Digital Tools!');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                qrType === 'text'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Plain Text
            </button>
            <button
              onClick={() => setQrType('wifi')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                qrType === 'wifi'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" /> Wi-Fi Network
            </button>
            <button
              onClick={() => {
                setQrType('phone');
                setContent('+18005550199');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                qrType === 'phone'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Phone className="w-3.5 h-3.5" /> Phone Number
            </button>
          </div>

          {/* Form Inputs */}
          {qrType === 'wifi' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Network Name (SSID)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="e.g. Office_Guest_5GHz"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Wi-Fi Password
                </label>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="Enter Wi-Fi password..."
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Security Encryption
                </label>
                <select
                  value={wifiType}
                  onChange={(e) => setWifiType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
            </div>
          ) : qrType === 'phone' ? (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="e.g. +18005550199..."
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Scanning this code automatically initiates a dial prompt on mobile devices.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {qrType === 'url' ? 'Destination Web URL' : 'Plain Text Message'}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder={
                  qrType === 'url'
                    ? 'Enter web link (e.g., https://www.pulseetm.click)...'
                    : 'Type or paste content to encode into QR code...'
                }
                className="w-full p-3.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
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
              alt="QR Code Live Preview"
              width={220}
              height={220}
              className="rounded-xl"
            />
          </div>

          <div className="w-full space-y-2.5">
            <button
              onClick={handleDownload}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" /> Download High-Res PNG
            </button>
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 transition flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" /> Copied Payload!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Encoded Payload
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Guide & Best Practices */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-3 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          How to Scan and Utilize QR Codes Efficiently
        </h2>
        <p>
          Modern smartphones running iOS (Camera app) and Android (Google Lens / Camera) feature native QR code decoding without requiring third-party scanning software.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>
            <strong>Instant Wi-Fi Sharing:</strong> Print and display your Wi-Fi QR code so visitors and clients can connect immediately without manually entering complex passwords.
          </li>
          <li>
            <strong>Print Collateral & Business Cards:</strong> Place compact QR codes on physical flyers, posters, or business cards to direct high-intent traffic to specific landing pages.
          </li>
          <li>
            <strong>Static Security:</strong> Standard QR codes encode payload data statically, meaning they never expire and operate independently without tracking cookies or redirects.
          </li>
        </ul>
      </div>
    </div>
  );
}
