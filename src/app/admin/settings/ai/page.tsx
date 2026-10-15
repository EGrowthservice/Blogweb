'use client';

/**
 * AI Settings Page — Admin only
 * Route: /admin/settings/ai
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Settings2,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Globe,
  BookOpen,
  Tag,
  Zap,
  Info,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AISettingsData {
  websiteName: string;
  websiteDescription: string;
  defaultLanguage: string;
  writingTone: string;
  targetAudience: string;
  preferredArticleStructure: string;
  formattingRules: string;
  contentQualityRequirements: string;
  citationRules: string;
  seoGuidelines: string;
  termsToAvoid: string;
  systemPrompt: string;
  editorialGuidelines: string;
  activeProvider: string;
  modelTemperature: number;
  maxOutputTokens: number;
  dailyRequestLimit: number;
  requestsUsedToday: number;
  lastResetDate: string;
}

const DEFAULT_SETTINGS: Partial<AISettingsData> = {
  websiteName: 'TheHorizon',
  websiteDescription: 'Entertainment & News editorial website',
  defaultLanguage: 'vi',
  writingTone: 'professional, engaging, informative',
  targetAudience: 'General Vietnamese readers',
  preferredArticleStructure: 'Lead paragraph → Key details → Background → Analysis → Conclusion',
  formattingRules: 'Use H2 for main sections. Short paragraphs. Include quotes when relevant.',
  contentQualityRequirements: 'Accurate, factual, no clickbait. Minimum 600 words.',
  citationRules: 'Cite sources inline as [Source Name].',
  seoGuidelines: 'Include main keyword in H1, first paragraph, and H2 headings.',
  termsToAvoid: '',
  systemPrompt: `You are an expert editorial AI assistant for TheHorizon, a professional entertainment and news website.
Your role is to help writers create high-quality, engaging articles that follow editorial standards.
Always write factual, well-structured content. Do not fabricate statistics or quotes.
Generate content in the language specified by the user.`,
  editorialGuidelines: '',
  activeProvider: 'gemini',
  modelTemperature: 0.7,
  maxOutputTokens: 8192,
  dailyRequestLimit: 500,
};

export default function AISettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();

  const [settings, setSettings] = useState<Partial<AISettingsData>>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [geminiStatus, setGeminiStatus] = useState<'unknown' | 'ok' | 'error' | 'checking'>('unknown');

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/admin/login'); return; }
    if (status === 'authenticated') {
      const role = session?.user?.role;
      if (!['super_admin', 'admin'].includes(role || '')) {
        router.push('/admin');
        return;
      }
      fetchSettings();
    }
  }, [status, session, router]);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/ai-settings');
      const json = await res.json();
      if (json.success && json.data) {
        setSettings((prev) => ({ ...prev, ...json.data }));
      }
    } catch {
      toast.error('Không thể tải cấu hình AI');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/ai-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error?.message || 'Lỗi lưu cấu hình');
      toast.success('Đã lưu cấu hình AI thành công!');
    } catch (err: any) {
      toast.error(err.message || 'Không thể lưu cấu hình');
    } finally {
      setSaving(false);
    }
  };

  const testGeminiConnection = async () => {
    setGeminiStatus('checking');
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_excerpt',
          topic: 'Test connection',
          language: 'en',
          customInstructions: 'Respond with exactly: "Connection OK"',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setGeminiStatus('ok');
        toast.success('Kết nối Gemini API thành công!');
      } else {
        setGeminiStatus('error');
        toast.error('Gemini API lỗi: ' + json.error?.message);
      }
    } catch {
      setGeminiStatus('error');
      toast.error('Không thể kết nối Gemini API');
    }
  };

  const update = (key: keyof AISettingsData, val: any) =>
    setSettings((s) => ({ ...s, [key]: val }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-indigo-400" />
              Cấu hình AI — Editorial Guidelines
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Thiết lập phong cách viết, hướng dẫn biên tập và tham số AI
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Lưu cấu hình
        </button>
      </div>

      {/* Provider Status */}
      <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          AI Provider
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Provider</label>
            <select
              value={settings.activeProvider || 'gemini'}
              onChange={(e) => update('activeProvider', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="gemini">Google Gemini (configured)</option>
              <option value="openai" disabled>OpenAI (not configured)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Temperature (sáng tạo)</label>
            <input
              type="number"
              min={0} max={1} step={0.1}
              value={settings.modelTemperature ?? 0.7}
              onChange={(e) => update('modelTemperature', parseFloat(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[10px] text-zinc-600 mt-1">0 = chính xác · 1 = sáng tạo</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Max Output Tokens</label>
            <select
              value={settings.maxOutputTokens ?? 8192}
              onChange={(e) => update('maxOutputTokens', parseInt(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            >
              <option value={2048}>2,048 (ngắn)</option>
              <option value={4096}>4,096 (vừa)</option>
              <option value={8192}>8,192 (tiêu chuẩn)</option>
              <option value={16384}>16,384 (dài)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Giới hạn request/ngày</label>
            <input
              type="number"
              min={10} max={10000}
              value={settings.dailyRequestLimit ?? 500}
              onChange={(e) => update('dailyRequestLimit', parseInt(e.target.value))}
              className="w-40 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            />
          </div>
          {settings.requestsUsedToday !== undefined && (
            <div className="text-xs text-zinc-500">
              Hôm nay: <span className="text-zinc-200 font-semibold">{settings.requestsUsedToday}</span> / {settings.dailyRequestLimit} requests
            </div>
          )}
          <button
            onClick={testGeminiConnection}
            disabled={geminiStatus === 'checking'}
            className="ml-auto px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl border border-zinc-700 flex items-center gap-1.5 transition-colors"
          >
            {geminiStatus === 'checking' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            Kiểm tra kết nối Gemini
          </button>
          {geminiStatus === 'ok' && <span className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />Kết nối OK</span>}
          {geminiStatus === 'error' && <span className="text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />Lỗi kết nối</span>}
        </div>

        <div className="p-3 bg-zinc-800/60 border border-zinc-700 rounded-xl text-[11px] text-zinc-500 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-400" />
          <span>API key được lưu an toàn trong biến môi trường server (<code className="text-zinc-300">GEMINI_API_KEY</code>). Không bao giờ được lưu vào database hoặc client-side.</span>
        </div>
      </div>

      {/* Brand Identity */}
      <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-400" />
          Brand Identity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Tên website</label>
            <input type="text" value={settings.websiteName || ''} onChange={(e) => update('websiteName', e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Ngôn ngữ mặc định</label>
            <select value={settings.defaultLanguage || 'vi'} onChange={(e) => update('defaultLanguage', e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500">
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Giọng văn mặc định</label>
            <input type="text" value={settings.writingTone || ''} onChange={(e) => update('writingTone', e.target.value)} placeholder="professional, engaging, informative" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Đối tượng độc giả mặc định</label>
            <input type="text" value={settings.targetAudience || ''} onChange={(e) => update('targetAudience', e.target.value)} placeholder="Độc giả Việt Nam 18-35 tuổi" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Mô tả website</label>
          <textarea rows={2} value={settings.websiteDescription || ''} onChange={(e) => update('websiteDescription', e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500" />
        </div>
      </div>

      {/* Editorial Guidelines */}
      <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Editorial Guidelines
        </h2>

        <TextAreaField label="System Prompt AI" value={settings.systemPrompt || ''} onChange={(v) => update('systemPrompt', v)} rows={6} helper="Hướng dẫn cơ bản cho AI về vai trò và nguyên tắc." />
        <TextAreaField label="Hướng dẫn biên tập chi tiết" value={settings.editorialGuidelines || ''} onChange={(v) => update('editorialGuidelines', v)} rows={4} placeholder="Thêm các quy tắc biên tập cụ thể của tòa soạn..." />
        <TextAreaField label="Cấu trúc bài viết ưu tiên" value={settings.preferredArticleStructure || ''} onChange={(v) => update('preferredArticleStructure', v)} rows={2} />
        <TextAreaField label="Quy tắc định dạng" value={settings.formattingRules || ''} onChange={(v) => update('formattingRules', v)} rows={2} />
        <TextAreaField label="Yêu cầu chất lượng nội dung" value={settings.contentQualityRequirements || ''} onChange={(v) => update('contentQualityRequirements', v)} rows={2} />
        <TextAreaField label="Quy tắc trích dẫn nguồn" value={settings.citationRules || ''} onChange={(v) => update('citationRules', v)} rows={2} />
        <TextAreaField label="Hướng dẫn SEO cho AI" value={settings.seoGuidelines || ''} onChange={(v) => update('seoGuidelines', v)} rows={2} />
        <TextAreaField label="Các từ/cụm từ cần tránh" value={settings.termsToAvoid || ''} onChange={(v) => update('termsToAvoid', v)} rows={2} placeholder="Liệt kê các thuật ngữ, tuyên bố hoặc phong cách viết cần tránh..." />
      </div>

      {/* Save */}
      <div className="flex justify-end pb-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Lưu tất cả cấu hình
        </button>
      </div>
    </div>
  );
}

function TextAreaField({
  label, value, onChange, rows = 3, placeholder, helper,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  helper?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-zinc-300">{label}</label>
        {helper && <span className="text-[10px] text-zinc-600">{helper}</span>}
      </div>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
      />
    </div>
  );
}
