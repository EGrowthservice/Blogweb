'use client';

import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  BarChart3,
  Target,
  LayoutGrid,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Tag,
  HelpCircle,
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastContext';
import { SkeletonTable, ErrorState } from '@/components/admin/StateViews';

export default function AdvertisingSettingsPage() {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  // 1. Google Analytics
  const [gaEnabled, setGaEnabled] = useState(true);
  const [gaMeasurementId, setGaMeasurementId] = useState('G-5F0GDVTZPE');

  // 2. Google Ads
  const [googleAdsEnabled, setGoogleAdsEnabled] = useState(false);
  const [googleAdsConversionId, setGoogleAdsConversionId] = useState('');
  const [googleAdsConversionLabel, setGoogleAdsConversionLabel] = useState('');

  // 3. Google AdSense
  const [adsenseEnabled, setAdsenseEnabled] = useState(false);
  const [adsensePublisherId, setAdsensePublisherId] = useState('ca-pub-0000000000000000');
  const [adsenseDefaultSlot, setAdsenseDefaultSlot] = useState('');
  const [adsenseHeaderSlot, setAdsenseHeaderSlot] = useState('');
  const [adsenseContentSlot, setAdsenseContentSlot] = useState('');
  const [adsenseSidebarSlot, setAdsenseSidebarSlot] = useState('');
  const [adsenseFooterSlot, setAdsenseFooterSlot] = useState('');

  // 4. Google Tag Manager
  const [gtmEnabled, setGtmEnabled] = useState(false);
  const [gtmContainerId, setGtmContainerId] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/settings/advertising');
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể tải cấu hình quảng cáo');
      }

      const d = json.data;
      setGaEnabled(d.gaEnabled ?? true);
      setGaMeasurementId(d.gaMeasurementId || 'G-5F0GDVTZPE');
      setGoogleAdsEnabled(d.googleAdsEnabled ?? false);
      setGoogleAdsConversionId(d.googleAdsConversionId || '');
      setGoogleAdsConversionLabel(d.googleAdsConversionLabel || '');
      setAdsenseEnabled(d.adsenseEnabled ?? false);
      setAdsensePublisherId(d.adsensePublisherId || 'ca-pub-0000000000000000');
      setAdsenseDefaultSlot(d.adsenseDefaultSlot || '');
      setAdsenseHeaderSlot(d.adsenseHeaderSlot || '');
      setAdsenseContentSlot(d.adsenseContentSlot || '');
      setAdsenseSidebarSlot(d.adsenseSidebarSlot || '');
      setAdsenseFooterSlot(d.adsenseFooterSlot || '');
      setGtmEnabled(d.gtmEnabled ?? false);
      setGtmContainerId(d.gtmContainerId || '');
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải cấu hình');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    // Client-side quick checks
    const errors: Record<string, string> = {};

    if (gaEnabled && (!gaMeasurementId.trim() || !/^G-[A-Z0-9]+$/i.test(gaMeasurementId.trim()))) {
      errors.gaMeasurementId = 'Measurement ID không đúng định dạng (Ví dụ: G-5F0GDVTZPE)';
    }

    if (googleAdsEnabled && !googleAdsConversionId.trim()) {
      errors.googleAdsConversionId = 'Vui lòng nhập Conversion ID khi bật Google Ads (Ví dụ: AW-123456789)';
    }

    if (adsenseEnabled && (!adsensePublisherId.trim() || !adsensePublisherId.startsWith('ca-pub-'))) {
      errors.adsensePublisherId = 'Publisher ID phải bắt đầu bằng ca-pub- (Ví dụ: ca-pub-1234567890123456)';
    }

    if (gtmEnabled && (!gtmContainerId.trim() || !gtmContainerId.startsWith('GTM-'))) {
      errors.gtmContainerId = 'GTM Container ID phải bắt đầu bằng GTM- (Ví dụ: GTM-XXXXXXX)';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.warning('Vui lòng kiểm tra lại thông tin chưa hợp lệ');
      return;
    }

    setSaving(true);

    try {
      const payload = {
        gaEnabled,
        gaMeasurementId: gaMeasurementId.trim(),
        googleAdsEnabled,
        googleAdsConversionId: googleAdsConversionId.trim(),
        googleAdsConversionLabel: googleAdsConversionLabel.trim(),
        adsenseEnabled,
        adsensePublisherId: adsensePublisherId.trim(),
        adsenseDefaultSlot: adsenseDefaultSlot.trim(),
        adsenseHeaderSlot: adsenseHeaderSlot.trim(),
        adsenseContentSlot: adsenseContentSlot.trim(),
        adsenseSidebarSlot: adsenseSidebarSlot.trim(),
        adsenseFooterSlot: adsenseFooterSlot.trim(),
        gtmEnabled,
        gtmContainerId: gtmContainerId.trim(),
      };

      const res = await fetch('/api/admin/settings/advertising', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Không thể lưu cấu hình');
      }

      toast.success('Đã lưu cấu hình Google Analytics & Quảng cáo thành công!');
    } catch (err: any) {
      toast.error(err.message || 'Lỗi khi lưu cấu hình');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-8">
        <div className="h-8 bg-zinc-800 rounded-xl w-1/3 animate-pulse" />
        <SkeletonTable rows={4} cols={2} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto py-12">
        <ErrorState message={error} onRetry={fetchSettings} />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Megaphone className="w-6 h-6 text-indigo-400" />
            Cấu hình Google Analytics, Ads & AdSense
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Quản lý mã đo lường Google Analytics 4, theo dõi chuyển đổi Google Ads và vị trí hiển thị quảng cáo AdSense
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Lưu cấu hình
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Google Analytics 4 Section */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Google Analytics 4 (GA4)</h3>
                <p className="text-xs text-zinc-400">
                  Theo dõi lượt xem trang thực tế và tương tác của người dùng qua Google tag (gtag.js)
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={gaEnabled}
                onChange={(e) => setGaEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Measurement ID (Mã đo lường)
              </label>
              <input
                type="text"
                value={gaMeasurementId}
                onChange={(e) => setGaMeasurementId(e.target.value)}
                placeholder="G-5F0GDVTZPE"
                disabled={!gaEnabled}
                className={`w-full bg-zinc-800 border rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-40 transition-colors ${
                  fieldErrors.gaMeasurementId ? 'border-rose-500' : 'border-zinc-700'
                }`}
              />
              {fieldErrors.gaMeasurementId ? (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.gaMeasurementId}</p>
              ) : (
                <p className="text-[11px] text-zinc-500 mt-1">
                  Mã mặc định đã được thiết lập: <code className="text-zinc-400">G-5F0GDVTZPE</code>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 2. Google Ads Section */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Google Ads (Conversion Tracking)</h3>
                <p className="text-xs text-zinc-400">
                  Theo dõi hiệu quả chiến dịch quảng cáo và các chuyển đổi (Conversion)
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={googleAdsEnabled}
                onChange={(e) => setGoogleAdsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Conversion ID
              </label>
              <input
                type="text"
                value={googleAdsConversionId}
                onChange={(e) => setGoogleAdsConversionId(e.target.value)}
                placeholder="AW-123456789"
                disabled={!googleAdsEnabled}
                className={`w-full bg-zinc-800 border rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-40 transition-colors ${
                  fieldErrors.googleAdsConversionId ? 'border-rose-500' : 'border-zinc-700'
                }`}
              />
              {fieldErrors.googleAdsConversionId ? (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.googleAdsConversionId}</p>
              ) : (
                <p className="text-[11px] text-zinc-500 mt-1">Định dạng: AW-XXXXX hoặc số ID</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Conversion Label (Nhãn chuyển đổi)
              </label>
              <input
                type="text"
                value={googleAdsConversionLabel}
                onChange={(e) => setGoogleAdsConversionLabel(e.target.value)}
                placeholder="Ví dụ: AbC-dEFg123"
                disabled={!googleAdsEnabled}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-40 transition-colors"
              />
              <p className="text-[11px] text-zinc-500 mt-1">Dùng khi gửi event chuyển đổi từ client</p>
            </div>
          </div>
        </div>

        {/* 3. Google AdSense Section */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Google AdSense</h3>
                <p className="text-xs text-zinc-400">
                  Quản lý mã nhà xuất bản (Publisher ID) và các Slot quảng cáo trên giao diện blog
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={adsenseEnabled}
                onChange={(e) => setAdsenseEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600" />
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Publisher ID (Mã nhà xuất bản)
              </label>
              <input
                type="text"
                value={adsensePublisherId}
                onChange={(e) => setAdsensePublisherId(e.target.value)}
                placeholder="ca-pub-0000000000000000"
                disabled={!adsenseEnabled}
                className={`w-full bg-zinc-800 border rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-40 transition-colors ${
                  fieldErrors.adsensePublisherId ? 'border-rose-500' : 'border-zinc-700'
                }`}
              />
              {fieldErrors.adsensePublisherId ? (
                <p className="text-xs text-rose-400 mt-1">{fieldErrors.adsensePublisherId}</p>
              ) : (
                <p className="text-[11px] text-zinc-500 mt-1">Định dạng: ca-pub-XXXXXXXXXXXXXXXX (16 chữ số)</p>
              )}
            </div>

            {/* Ad Slots by position */}
            <div className="pt-2 border-t border-zinc-800/80">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">
                Cấu hình Slot ID theo vị trí hiển thị
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Default Slot ID (Mặc định)
                  </label>
                  <input
                    type="text"
                    value={adsenseDefaultSlot}
                    onChange={(e) => setAdsenseDefaultSlot(e.target.value)}
                    placeholder="Ví dụ: 1234567890"
                    disabled={!adsenseEnabled}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-100 font-mono placeholder-zinc-500 focus:outline-none focus:border-indigo-500 disabled:opacity-40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Header Slot ID (Đầu trang / Leaderboard)
                  </label>
                  <input
                    type="text"
                    value={adsenseHeaderSlot}
                    onChange={(e) => setAdsenseHeaderSlot(e.target.value)}
                    placeholder="Ví dụ: 2345678901"
                    disabled={!adsenseEnabled}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-100 font-mono placeholder-zinc-500 focus:outline-none focus:border-indigo-500 disabled:opacity-40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    In-Content Slot ID (Trong bài viết)
                  </label>
                  <input
                    type="text"
                    value={adsenseContentSlot}
                    onChange={(e) => setAdsenseContentSlot(e.target.value)}
                    placeholder="Ví dụ: 3456789012"
                    disabled={!adsenseEnabled}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-100 font-mono placeholder-zinc-500 focus:outline-none focus:border-indigo-500 disabled:opacity-40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Sidebar Slot ID (Cột bên phải)
                  </label>
                  <input
                    type="text"
                    value={adsenseSidebarSlot}
                    onChange={(e) => setAdsenseSidebarSlot(e.target.value)}
                    placeholder="Ví dụ: 4567890123"
                    disabled={!adsenseEnabled}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-100 font-mono placeholder-zinc-500 focus:outline-none focus:border-indigo-500 disabled:opacity-40"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Footer Slot ID (Trước chân trang)
                  </label>
                  <input
                    type="text"
                    value={adsenseFooterSlot}
                    onChange={(e) => setAdsenseFooterSlot(e.target.value)}
                    placeholder="Ví dụ: 5678901234"
                    disabled={!adsenseEnabled}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-100 font-mono placeholder-zinc-500 focus:outline-none focus:border-indigo-500 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Google Tag Manager (GTM) */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Google Tag Manager (GTM)</h3>
                <p className="text-xs text-zinc-400">
                  Tùy chọn tích hợp GTM Container để quản lý các thẻ bên ngoài
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={gtmEnabled}
                onChange={(e) => setGtmEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" />
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              GTM Container ID
            </label>
            <input
              type="text"
              value={gtmContainerId}
              onChange={(e) => setGtmContainerId(e.target.value)}
              placeholder="GTM-XXXXXXX"
              disabled={!gtmEnabled}
              className={`w-full bg-zinc-800 border rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-40 transition-colors ${
                fieldErrors.gtmContainerId ? 'border-rose-500' : 'border-zinc-700'
              }`}
            />
            {fieldErrors.gtmContainerId && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.gtmContainerId}</p>
            )}
          </div>
        </div>

        {/* Action Button at bottom */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
