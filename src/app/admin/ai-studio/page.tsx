'use client';

/**
 * AI Article Studio — Main Page
 * Route: /admin/ai-studio
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Wand2,
  FileText,
  Search,
  Settings2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Copy,
  RefreshCw,
  Send,
  List,
  PenLine,
  Expand,
  Minimize2,
  MessageSquare,
  Tag,
  Image as ImageIcon,
  Youtube,
  Link2,
  RotateCcw,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Zap,
  Globe,
  BookOpen,
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

type AIAction =
  | 'generate_full'
  | 'generate_from_outline'
  | 'generate_outline'
  | 'continue_writing'
  | 'rewrite_text'
  | 'expand_section'
  | 'summarize_section'
  | 'change_tone'
  | 'fix_grammar'
  | 'generate_faq'
  | 'generate_seo'
  | 'suggest_internal_links'
  | 'generate_headlines'
  | 'generate_excerpt'
  | 'generate_image_alt';

type Tab = 'brief' | 'outline' | 'generate' | 'seo' | 'media';

interface Brief {
  topic: string;
  mainKeyword: string;
  secondaryKeywords: string;
  category: string;
  language: string;
  targetAudience: string;
  articleType: string;
  writingTone: string;
  targetLength: string;
  articleGoal: string;
  referenceUrls: string;
  customInstructions: string;
}

interface SEOResult {
  seoTitle?: string;
  metaDescription?: string;
  slug?: string;
  suggestedTags?: string[];
  headingStructure?: string[];
  altTextSuggestion?: string;
  readTimeEstimate?: number;
}

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

const DEFAULT_BRIEF: Brief = {
  topic: '',
  mainKeyword: '',
  secondaryKeywords: '',
  category: '',
  language: 'vi',
  targetAudience: 'Độc giả phổ thông',
  articleType: 'news',
  writingTone: 'professional',
  targetLength: '800-1200 words',
  articleGoal: 'Thông tin, giáo dục',
  referenceUrls: '',
  customInstructions: '',
};

// ────────────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────────────

export default function AIStudioPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();

  // ── State ────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<Tab>('brief');
  const [brief, setBrief] = useState<Brief>(DEFAULT_BRIEF);
  const [outline, setOutline] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedExcerpt, setGeneratedExcerpt] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [seoResult, setSeoResult] = useState<SEOResult | null>(null);
  const [alternativeHeadlines, setAlternativeHeadlines] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingAction, setGeneratingAction] = useState<AIAction | null>(null);
  const [lastError, setLastError] = useState('');
  const [tokenUsage, setTokenUsage] = useState<{ prompt?: number; output?: number; total?: number } | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [customTone, setCustomTone] = useState('');
  const [contentHistory, setContentHistory] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // ── Auth Guard ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login');
    if (status === 'authenticated') {
      const role = session?.user?.role;
      if (!role || !['super_admin', 'admin', 'editor'].includes(role)) {
        router.push('/admin');
      }
    }
  }, [status, session, router]);

  // ── Load categories ────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/admin/categories?limit=100&status=active')
      .then((r) => r.json())
      .then((j) => { if (j.success) setCategories(j.data || []); })
      .catch(() => {});
  }, []);

  // ── AI Call ────────────────────────────────────────────────────────────
  const callAI = useCallback(async (action: AIAction, extra?: Record<string, any>) => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGeneratingAction(action);
    setLastError('');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const payload = {
        action,
        topic: brief.topic,
        mainKeyword: brief.mainKeyword,
        secondaryKeywords: brief.secondaryKeywords,
        category: brief.category,
        language: brief.language,
        targetAudience: brief.targetAudience,
        articleType: brief.articleType,
        writingTone: brief.writingTone,
        targetLength: brief.targetLength,
        articleGoal: brief.articleGoal,
        referenceUrls: brief.referenceUrls,
        customInstructions: brief.customInstructions,
        outline,
        currentContent: generatedContent,
        articleTitle: generatedTitle || brief.topic,
        selectedText,
        newTone: customTone,
        ...extra,
      };

      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'AI request thất bại');
      }

      setTokenUsage(json.data?.tokenUsage || null);
      return json.data?.text as string;
    } catch (err: any) {
      if (err.name === 'AbortError') return null;
      const msg = err.message || 'Lỗi không xác định';
      setLastError(msg);
      toast.error(msg);
      return null;
    } finally {
      setIsGenerating(false);
      setGeneratingAction(null);
      abortRef.current = null;
    }
  }, [isGenerating, brief, outline, generatedContent, generatedTitle, selectedText, customTone, toast]);

  const cancelGeneration = () => {
    abortRef.current?.abort();
    setIsGenerating(false);
    setGeneratingAction(null);
  };

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleGenerateOutline = async () => {
    if (!brief.topic) { toast.warning('Vui lòng nhập chủ đề bài viết trước.'); return; }
    const text = await callAI('generate_outline');
    if (text) {
      setOutline(text);
      setActiveTab('outline');
      toast.success('Đã tạo dàn ý bài viết!');
    }
  };

  const handleGenerateFull = async () => {
    if (!brief.topic) { toast.warning('Vui lòng nhập chủ đề bài viết trước.'); return; }
    pushHistory();
    const text = await callAI('generate_full');
    if (text) {
      setGeneratedContent(text);
      if (!generatedTitle) setGeneratedTitle(brief.topic);
      setActiveTab('generate');
      toast.success('Đã tạo bài viết hoàn chỉnh!');
    }
  };

  const handleGenerateFromOutline = async () => {
    if (!outline) { toast.warning('Vui lòng tạo hoặc nhập dàn ý trước.'); return; }
    pushHistory();
    const text = await callAI('generate_from_outline');
    if (text) {
      setGeneratedContent(text);
      if (!generatedTitle) setGeneratedTitle(brief.topic);
      setActiveTab('generate');
      toast.success('Đã tạo bài viết từ dàn ý!');
    }
  };

  const handleRewrite = async () => {
    if (!selectedText && !generatedContent) { toast.warning('Không có nội dung để viết lại.'); return; }
    pushHistory();
    const text = await callAI('rewrite_text');
    if (text) {
      if (selectedText && generatedContent.includes(selectedText)) {
        setGeneratedContent(generatedContent.replace(selectedText, text));
      } else {
        setGeneratedContent(text);
      }
      toast.success('Đã viết lại nội dung!');
    }
  };

  const handleFixGrammar = async () => {
    if (!generatedContent) { toast.warning('Không có nội dung để kiểm tra.'); return; }
    pushHistory();
    const text = await callAI('fix_grammar');
    if (text) { setGeneratedContent(text); toast.success('Đã sửa ngữ pháp và chính tả!'); }
  };

  const handleContinue = async () => {
    if (!generatedContent) { toast.warning('Chưa có nội dung để tiếp tục.'); return; }
    const text = await callAI('continue_writing');
    if (text) {
      setGeneratedContent(generatedContent + '\n' + text);
      toast.success('Đã tiếp tục viết!');
    }
  };

  const handleGenerateFAQ = async () => {
    const text = await callAI('generate_faq');
    if (text) {
      setGeneratedContent(generatedContent + '\n\n' + text);
      toast.success('Đã thêm FAQ!');
    }
  };

  const handleGenerateSEO = async () => {
    const text = await callAI('generate_seo');
    if (text) {
      try {
        const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```\s*$/i, '').trim();
        const parsed = JSON.parse(cleaned);
        setSeoResult(parsed);
        setActiveTab('seo');
        toast.success('Đã tạo SEO metadata!');
      } catch {
        setSeoResult({ seoTitle: text.slice(0, 100) });
        toast.warning('Kết quả SEO được trả về dạng text — kiểm tra lại thủ công.');
      }
    }
  };

  const handleGenerateHeadlines = async () => {
    const text = await callAI('generate_headlines');
    if (text) {
      try {
        const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```\s*$/i, '').trim();
        const arr = JSON.parse(cleaned);
        setAlternativeHeadlines(Array.isArray(arr) ? arr : [text]);
        toast.success('Đã tạo các tiêu đề gợi ý!');
      } catch {
        setAlternativeHeadlines([text]);
      }
    }
  };

  const handleGenerateExcerpt = async () => {
    const text = await callAI('generate_excerpt');
    if (text) { setGeneratedExcerpt(text); toast.success('Đã tạo tóm tắt!'); }
  };

  const handleChangeTone = async () => {
    if (!customTone) { toast.warning('Vui lòng chọn hoặc nhập tone muốn thay đổi.'); return; }
    pushHistory();
    const text = await callAI('change_tone');
    if (text) { setGeneratedContent(text); toast.success('Đã thay đổi tone bài viết!'); }
  };

  const pushHistory = () => {
    if (generatedContent) {
      setContentHistory((h) => [...h.slice(-9), generatedContent]);
    }
  };

  const handleUndo = () => {
    if (contentHistory.length === 0) { toast.warning('Không có nội dung trước đó để khôi phục.'); return; }
    const prev = contentHistory[contentHistory.length - 1];
    setGeneratedContent(prev);
    setContentHistory((h) => h.slice(0, -1));
    toast.success('Đã khôi phục nội dung trước đó.');
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Đã sao chép!');
    } catch {
      toast.error('Không thể sao chép. Thử chọn text và Ctrl+C.');
    }
  };

  // ── Send to PostEditor ─────────────────────────────────────────────────
  const handleUseInEditor = () => {
    if (!generatedContent) { toast.warning('Chưa có nội dung để sử dụng.'); return; }
    const params = new URLSearchParams({
      ai_title: generatedTitle || brief.topic || '',
      ai_content: generatedContent,
      ai_excerpt: generatedExcerpt || '',
      ai_tags: (seoResult?.suggestedTags || []).join(', '),
    });
    router.push(`/admin/posts/create?${params.toString()}`);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-4 h-4 text-white" />
              </span>
              AI Article Studio
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">Tạo bài viết chất lượng cao với sức mạnh của AI</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {contentHistory.length > 0 && (
            <button
              onClick={handleUndo}
              title="Khôi phục nội dung trước"
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl border border-zinc-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          {generatedContent && (
            <>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl border border-zinc-700 flex items-center gap-1.5 transition-colors"
              >
                {showPreview ? <Minimize2 className="w-3.5 h-3.5" /> : <Expand className="w-3.5 h-3.5" />}
                {showPreview ? 'Ẩn Preview' : 'Preview'}
              </button>
              <button
                onClick={handleUseInEditor}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
              >
                <Send className="w-4 h-4" />
                Dùng trong Editor
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Token Usage & Error ── */}
      {lastError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-300 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">AI gặp lỗi</p>
            <p>{lastError}</p>
          </div>
          <button onClick={() => setLastError('')} className="ml-auto text-rose-400 hover:text-rose-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {tokenUsage && (
        <div className="flex items-center gap-3 text-[11px] text-zinc-500 bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Tokens: Prompt <span className="text-zinc-300 font-mono">{tokenUsage.prompt?.toLocaleString() || '—'}</span></span>
          <span className="text-zinc-700">·</span>
          <span>Output <span className="text-zinc-300 font-mono">{tokenUsage.output?.toLocaleString() || '—'}</span></span>
          <span className="text-zinc-700">·</span>
          <span>Total <span className="text-zinc-300 font-mono">{tokenUsage.total?.toLocaleString() || '—'}</span></span>
        </div>
      )}

      {/* ── Generating Banner ── */}
      {isGenerating && (
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3 text-indigo-300 text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
            <span>AI đang xử lý <span className="font-semibold">{ACTION_LABELS[generatingAction!] || generatingAction}</span>...</span>
          </div>
          <button
            onClick={cancelGeneration}
            className="text-xs text-zinc-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Hủy
          </button>
        </div>
      )}

      {/* ── Main Layout: Tabs + Content ── */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Tab Navigation */}
        <div className="xl:col-span-1">
          <nav className="p-2 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-1 sticky top-6">
            {(
              [
                { id: 'brief', label: 'Article Brief', icon: BookOpen, desc: 'Nhập thông tin bài viết' },
                { id: 'outline', label: 'Outline', icon: List, desc: 'Dàn ý bài viết' },
                { id: 'generate', label: 'Generate & Edit', icon: Wand2, desc: 'Tạo và chỉnh sửa nội dung' },
                { id: 'seo', label: 'SEO Assistant', icon: Search, desc: 'Tối ưu SEO' },
                { id: 'media', label: 'Media & Links', icon: ImageIcon, desc: 'Ảnh, video, liên kết' },
              ] as { id: Tab; label: string; icon: any; desc: string }[]
            ).map(({ id, label, icon: Icon, desc }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-start gap-3 px-3.5 py-3 rounded-xl text-left transition-all ${
                  activeTab === id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold leading-tight">{label}</div>
                  <div className={`text-[11px] mt-0.5 leading-tight ${activeTab === id ? 'text-indigo-200' : 'text-zinc-500'}`}>{desc}</div>
                </div>
              </button>
            ))}

            {/* Quick Actions */}
            <div className="pt-3 border-t border-zinc-800 space-y-1">
              <p className="px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Thao tác nhanh</p>
              <button
                onClick={handleGenerateOutline}
                disabled={isGenerating || !brief.topic}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {generatingAction === 'generate_outline' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <List className="w-3.5 h-3.5" />}
                Tạo Dàn ý
              </button>
              <button
                onClick={handleGenerateFull}
                disabled={isGenerating || !brief.topic}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {generatingAction === 'generate_full' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Tạo Bài Đầy đủ
              </button>
              <button
                onClick={handleGenerateSEO}
                disabled={isGenerating || !brief.topic}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-950/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {generatingAction === 'generate_seo' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                Tạo SEO Data
              </button>
            </div>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="xl:col-span-3 space-y-5">
          {/* ── Tab: Brief ── */}
          {activeTab === 'brief' && (
            <BriefTab brief={brief} setBrief={setBrief} categories={categories} />
          )}

          {/* ── Tab: Outline ── */}
          {activeTab === 'outline' && (
            <OutlineTab
              outline={outline}
              setOutline={setOutline}
              onGenerateOutline={handleGenerateOutline}
              onGenerateFromOutline={handleGenerateFromOutline}
              isGenerating={isGenerating}
              generatingAction={generatingAction}
              hasTopic={!!brief.topic}
            />
          )}

          {/* ── Tab: Generate ── */}
          {activeTab === 'generate' && (
            <GenerateTab
              generatedContent={generatedContent}
              setGeneratedContent={setGeneratedContent}
              generatedTitle={generatedTitle}
              setGeneratedTitle={setGeneratedTitle}
              generatedExcerpt={generatedExcerpt}
              setGeneratedExcerpt={setGeneratedExcerpt}
              selectedText={selectedText}
              setSelectedText={setSelectedText}
              customTone={customTone}
              setCustomTone={setCustomTone}
              alternativeHeadlines={alternativeHeadlines}
              isGenerating={isGenerating}
              generatingAction={generatingAction}
              showPreview={showPreview}
              onGenerateFull={handleGenerateFull}
              onGenerateFromOutline={handleGenerateFromOutline}
              onContinue={handleContinue}
              onRewrite={handleRewrite}
              onFixGrammar={handleFixGrammar}
              onChangeTone={handleChangeTone}
              onGenerateFAQ={handleGenerateFAQ}
              onGenerateHeadlines={handleGenerateHeadlines}
              onGenerateExcerpt={handleGenerateExcerpt}
              onUndo={handleUndo}
              onCopy={handleCopy}
              onUseInEditor={handleUseInEditor}
              hasTopic={!!brief.topic}
              hasOutline={!!outline}
              contentHistoryLength={contentHistory.length}
            />
          )}

          {/* ── Tab: SEO ── */}
          {activeTab === 'seo' && (
            <SEOTab
              seoResult={seoResult}
              onGenerateSEO={handleGenerateSEO}
              isGenerating={isGenerating}
              generatingAction={generatingAction}
              hasTopic={!!brief.topic}
              brief={brief}
            />
          )}

          {/* ── Tab: Media ── */}
          {activeTab === 'media' && (
            <MediaTab generatedContent={generatedContent} onCopy={handleCopy} />
          )}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────────────────────

const ACTION_LABELS: Record<string, string> = {
  generate_full: 'Tạo bài viết đầy đủ',
  generate_from_outline: 'Tạo bài từ dàn ý',
  generate_outline: 'Tạo dàn ý',
  continue_writing: 'Tiếp tục viết',
  rewrite_text: 'Viết lại nội dung',
  expand_section: 'Mở rộng đoạn',
  summarize_section: 'Tóm tắt đoạn',
  change_tone: 'Thay đổi tone',
  fix_grammar: 'Sửa ngữ pháp',
  generate_faq: 'Tạo FAQ',
  generate_seo: 'Tạo SEO metadata',
  suggest_internal_links: 'Gợi ý liên kết nội bộ',
  generate_headlines: 'Tạo tiêu đề thay thế',
  generate_excerpt: 'Tạo tóm tắt',
  generate_image_alt: 'Tạo alt text ảnh',
};

// ── Brief Tab ────────────────────────────────────────────────────────────────
function BriefTab({
  brief,
  setBrief,
  categories,
}: {
  brief: Brief;
  setBrief: React.Dispatch<React.SetStateAction<Brief>>;
  categories: CategoryOption[];
}) {
  const update = (key: keyof Brief, val: string) => setBrief((b) => ({ ...b, [key]: val }));

  return (
    <div className="space-y-5">
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-5">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Article Brief — Thông tin bài viết
        </h2>

        {/* Topic */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Chủ đề / Tiêu đề bài viết <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={brief.topic}
            onChange={(e) => update('topic', e.target.value)}
            placeholder="Ví dụ: Đánh giá phim Inception (2010) - Kiệt tác điện ảnh Christopher Nolan"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Main Keyword */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Từ khóa chính</label>
            <input
              type="text"
              value={brief.mainKeyword}
              onChange={(e) => update('mainKeyword', e.target.value)}
              placeholder="Ví dụ: phim Inception"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Secondary Keywords */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Từ khóa phụ</label>
            <input
              type="text"
              value={brief.secondaryKeywords}
              onChange={(e) => update('secondaryKeywords', e.target.value)}
              placeholder="Christopher Nolan, phim khoa học viễn tưởng..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Danh mục</label>
            <select
              value={brief.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((c) => (
                <option key={c._id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              <Globe className="w-3 h-3 inline mr-1 text-zinc-400" />
              Ngôn ngữ đầu ra
            </label>
            <select
              value={brief.language}
              onChange={(e) => update('language', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="vi">🇻🇳 Tiếng Việt</option>
              <option value="en">🇺🇸 English</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="es">🇪🇸 Español</option>
              <option value="zh">🇨🇳 中文</option>
              <option value="ja">🇯🇵 日本語</option>
              <option value="ko">🇰🇷 한국어</option>
            </select>
          </div>

          {/* Article Type */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Loại bài viết</label>
            <select
              value={brief.articleType}
              onChange={(e) => update('articleType', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="news">Tin tức (News)</option>
              <option value="review">Đánh giá (Review)</option>
              <option value="analysis">Phân tích (Analysis)</option>
              <option value="tutorial">Hướng dẫn (Tutorial)</option>
              <option value="interview">Phỏng vấn (Interview)</option>
              <option value="feature">Bài Feature</option>
              <option value="opinion">Ý kiến (Opinion)</option>
              <option value="listicle">Danh sách (Listicle)</option>
            </select>
          </div>

          {/* Writing Tone */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Giọng văn</label>
            <select
              value={brief.writingTone}
              onChange={(e) => update('writingTone', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="professional">Chuyên nghiệp</option>
              <option value="conversational">Gần gũi, trò chuyện</option>
              <option value="formal">Trang trọng</option>
              <option value="enthusiastic">Nhiệt tình, hứng khởi</option>
              <option value="analytical">Phân tích, sắc bén</option>
              <option value="storytelling">Kể chuyện</option>
              <option value="educational">Giáo dục</option>
            </select>
          </div>

          {/* Target Length */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Độ dài mục tiêu</label>
            <select
              value={brief.targetLength}
              onChange={(e) => update('targetLength', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="300-500 words">Ngắn (300-500 từ)</option>
              <option value="600-800 words">Vừa (600-800 từ)</option>
              <option value="800-1200 words">Tiêu chuẩn (800-1200 từ)</option>
              <option value="1200-2000 words">Dài (1200-2000 từ)</option>
              <option value="2000-3000 words">Rất dài (2000-3000 từ)</option>
            </select>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Đối tượng độc giả</label>
            <input
              type="text"
              value={brief.targetAudience}
              onChange={(e) => update('targetAudience', e.target.value)}
              placeholder="Ví dụ: Fan phim điện ảnh 18-35 tuổi"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Article Goal */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Mục tiêu bài viết</label>
          <input
            type="text"
            value={brief.articleGoal}
            onChange={(e) => update('articleGoal', e.target.value)}
            placeholder="Ví dụ: Giúp độc giả quyết định có nên xem phim này không"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Reference URLs */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">URL tham khảo (mỗi URL một dòng)</label>
          <textarea
            rows={2}
            value={brief.referenceUrls}
            onChange={(e) => update('referenceUrls', e.target.value)}
            placeholder="https://example.com/source1&#10;https://example.com/source2"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Custom Instructions */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Hướng dẫn thêm (Custom Instructions)</label>
          <textarea
            rows={3}
            value={brief.customInstructions}
            onChange={(e) => update('customInstructions', e.target.value)}
            placeholder="Ví dụ: Tập trung vào hiệu ứng hình ảnh. Tránh spoiler quan trọng. Kết bài bằng recommendation..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Info card */}
      <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-2xl flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-300/80">
          Sau khi điền thông tin, bấm <strong>&ldquo;Tạo Dàn ý&rdquo;</strong> để AI lên kế hoạch bài viết,
          hoặc <strong>&ldquo;Tạo Bài Đầy đủ&rdquo;</strong> để bỏ qua bước dàn ý. Cả hai nút đều ở thanh bên trái.
        </p>
      </div>
    </div>
  );
}

// ── Outline Tab ──────────────────────────────────────────────────────────────
function OutlineTab({
  outline,
  setOutline,
  onGenerateOutline,
  onGenerateFromOutline,
  isGenerating,
  generatingAction,
  hasTopic,
}: {
  outline: string;
  setOutline: (v: string) => void;
  onGenerateOutline: () => void;
  onGenerateFromOutline: () => void;
  isGenerating: boolean;
  generatingAction: AIAction | null;
  hasTopic: boolean;
}) {
  return (
    <div className="space-y-5">
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <List className="w-4 h-4 text-indigo-400" />
            Article Outline — Dàn ý bài viết
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onGenerateOutline}
              disabled={isGenerating || !hasTopic}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all disabled:opacity-40"
            >
              {generatingAction === 'generate_outline' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              AI Tạo Dàn ý
            </button>
          </div>
        </div>

        <p className="text-xs text-zinc-500">
          Dàn ý dưới đây có thể chỉnh sửa tự do. Sau khi hài lòng, bấm <strong className="text-zinc-300">&ldquo;Viết bài từ Dàn ý&rdquo;</strong>.
        </p>

        <textarea
          rows={20}
          value={outline}
          onChange={(e) => setOutline(e.target.value)}
          placeholder="Dàn ý sẽ xuất hiện ở đây sau khi AI tạo, hoặc bạn có thể nhập thủ công:

# Tiêu đề H1
## Phần 1: Giới thiệu
### Ý chính 1.1
### Ý chính 1.2
## Phần 2: Nội dung chính
..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
        />

        <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
          <button
            onClick={onGenerateFromOutline}
            disabled={isGenerating || !outline.trim()}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all disabled:opacity-40"
          >
            {generatingAction === 'generate_from_outline' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4" />
            )}
            Viết bài từ Dàn ý này
          </button>
          <span className="text-[11px] text-zinc-500">{outline.split('\n').filter(Boolean).length} dòng</span>
        </div>
      </div>
    </div>
  );
}

// ── Generate Tab ─────────────────────────────────────────────────────────────
function GenerateTab({
  generatedContent, setGeneratedContent,
  generatedTitle, setGeneratedTitle,
  generatedExcerpt, setGeneratedExcerpt,
  selectedText, setSelectedText,
  customTone, setCustomTone,
  alternativeHeadlines,
  isGenerating, generatingAction,
  showPreview,
  onGenerateFull, onGenerateFromOutline, onContinue, onRewrite,
  onFixGrammar, onChangeTone, onGenerateFAQ, onGenerateHeadlines,
  onGenerateExcerpt, onUndo, onCopy, onUseInEditor,
  hasTopic, hasOutline, contentHistoryLength,
}: any) {
  const wordCount = generatedContent.split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-5">
      {/* Generation Controls */}
      <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-indigo-400" />
          Tạo & Chỉnh sửa nội dung
        </h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton onClick={onGenerateFull} disabled={isGenerating || !hasTopic} icon={Sparkles} label="Tạo bài đầy đủ" color="indigo" loading={generatingAction === 'generate_full'} />
          <ActionButton onClick={onGenerateFromOutline} disabled={isGenerating || !hasOutline} icon={List} label="Từ Dàn ý" color="emerald" loading={generatingAction === 'generate_from_outline'} />
          <ActionButton onClick={onContinue} disabled={isGenerating || !generatedContent} icon={PenLine} label="Tiếp tục viết" color="violet" loading={generatingAction === 'continue_writing'} />
          <ActionButton onClick={onFixGrammar} disabled={isGenerating || !generatedContent} icon={CheckCircle2} label="Sửa ngữ pháp" color="teal" loading={generatingAction === 'fix_grammar'} />
          <ActionButton onClick={onGenerateFAQ} disabled={isGenerating || !hasTopic} icon={MessageSquare} label="Thêm FAQ" color="amber" loading={generatingAction === 'generate_faq'} />
          <ActionButton onClick={onRewrite} disabled={isGenerating || (!generatedContent && !selectedText)} icon={RefreshCw} label="Viết lại" color="rose" loading={generatingAction === 'rewrite_text'} />
        </div>
      </div>

      {/* Content Editor */}
      <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Tiêu đề bài viết</label>
          <input
            type="text"
            value={generatedTitle}
            onChange={(e) => setGeneratedTitle(e.target.value)}
            placeholder="Tiêu đề sẽ xuất hiện ở đây..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
          {/* Alternative Headlines */}
          {alternativeHeadlines.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-[11px] text-zinc-500">Tiêu đề gợi ý:</p>
              {alternativeHeadlines.map((h: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setGeneratedTitle(h)}
                  className="block w-full text-left text-xs text-indigo-300 hover:text-indigo-200 hover:bg-indigo-950/30 px-2 py-1 rounded-lg transition-colors"
                >
                  {i + 1}. {h}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={onGenerateHeadlines}
              disabled={isGenerating || !hasTopic}
              className="text-[11px] text-zinc-500 hover:text-indigo-400 transition-colors flex items-center gap-1 disabled:opacity-40"
            >
              {generatingAction === 'generate_headlines' ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
              Tạo tiêu đề thay thế
            </button>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Tóm tắt (Excerpt)</label>
          <div className="relative">
            <textarea
              rows={2}
              value={generatedExcerpt}
              onChange={(e) => setGeneratedExcerpt(e.target.value)}
              placeholder="Tóm tắt ngắn gọn bài viết..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 pr-24"
            />
            <button
              onClick={onGenerateExcerpt}
              disabled={isGenerating || !hasTopic}
              className="absolute right-2 top-2 text-[10px] text-zinc-500 hover:text-indigo-400 transition-colors flex items-center gap-1 disabled:opacity-40 bg-zinc-700 hover:bg-zinc-600 px-2 py-1 rounded-lg"
            >
              {generatingAction === 'generate_excerpt' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              AI Tạo
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 mt-1">{generatedExcerpt.length}/500 ký tự</p>
        </div>

        {/* Change Tone */}
        <div className="flex items-center gap-2">
          <select
            value={customTone}
            onChange={(e) => setCustomTone(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
          >
            <option value="">-- Thay đổi tone --</option>
            <option value="formal">Trang trọng hơn</option>
            <option value="conversational">Gần gũi hơn</option>
            <option value="enthusiastic">Nhiệt tình hơn</option>
            <option value="analytical">Phân tích sắc bén</option>
            <option value="storytelling">Kể chuyện</option>
            <option value="concise">Súc tích, ngắn gọn</option>
          </select>
          <button
            onClick={onChangeTone}
            disabled={isGenerating || !customTone || !generatedContent}
            className="px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all disabled:opacity-40"
          >
            {generatingAction === 'change_tone' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
            Áp dụng
          </button>
        </div>

        {/* Selected text for rewrite */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Đoạn văn muốn viết lại (paste vào đây để rewrite chỉ phần đó)
          </label>
          <textarea
            rows={3}
            value={selectedText}
            onChange={(e) => setSelectedText(e.target.value)}
            placeholder="Paste đoạn văn cần viết lại tại đây. Để trống để viết lại toàn bộ bài..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Nội dung bài viết (HTML)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-500">{wordCount.toLocaleString()} từ</span>
              {contentHistoryLength > 0 && (
                <button onClick={onUndo} className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Undo ({contentHistoryLength})
                </button>
              )}
              {generatedContent && (
                <button onClick={() => onCopy(generatedContent)} className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
                  <Copy className="w-3 h-3" />
                  Sao chép
                </button>
              )}
            </div>
          </div>
          <textarea
            rows={18}
            value={generatedContent}
            onChange={(e) => setGeneratedContent(e.target.value)}
            placeholder="Nội dung HTML sẽ xuất hiện ở đây sau khi AI tạo.

Bạn cũng có thể nhập hoặc dán nội dung thủ công và dùng các công cụ AI để cải thiện..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
          />
        </div>

        {/* Preview */}
        {showPreview && generatedContent && (
          <div className="border border-zinc-700 rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300">Preview — Xem trước</span>
              <span className="text-[11px] text-zinc-500">Render HTML</span>
            </div>
            <div
              className="p-5 bg-white text-gray-900 prose prose-sm max-w-none article-prose"
              dangerouslySetInnerHTML={{ __html: generatedContent }}
            />
          </div>
        )}

        {/* Bottom Actions */}
        {generatedContent && (
          <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
            <button
              onClick={onUseInEditor}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              Dùng trong PostEditor
            </button>
            <span className="text-[11px] text-zinc-500">
              Sẽ chuyển đến form tạo bài viết với nội dung đã điền sẵn
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SEO Tab ──────────────────────────────────────────────────────────────────
function SEOTab({
  seoResult, onGenerateSEO, isGenerating, generatingAction, hasTopic, brief,
}: {
  seoResult: SEOResult | null;
  onGenerateSEO: () => void;
  isGenerating: boolean;
  generatingAction: AIAction | null;
  hasTopic: boolean;
  brief: Brief;
}) {
  return (
    <div className="space-y-5">
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-400" />
            SEO Assistant
          </h2>
          <button
            onClick={onGenerateSEO}
            disabled={isGenerating || !hasTopic}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all disabled:opacity-40"
          >
            {generatingAction === 'generate_seo' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            Tạo SEO Data
          </button>
        </div>

        {!seoResult ? (
          <div className="text-center py-12 text-zinc-500">
            <Search className="w-10 h-10 mx-auto mb-3 text-zinc-700" />
            <p className="text-sm">Bấm &ldquo;Tạo SEO Data&rdquo; để AI phân tích và tạo metadata tối ưu</p>
          </div>
        ) : (
          <div className="space-y-4">
            <InfoRow label="SEO Title" value={seoResult.seoTitle} helper="50-60 ký tự" />
            <InfoRow label="Meta Description" value={seoResult.metaDescription} helper="150-160 ký tự" />
            <InfoRow label="Slug đề xuất" value={seoResult.slug} helper="3-8 từ, chữ thường" />
            <InfoRow label="Alt Text Ảnh" value={seoResult.altTextSuggestion} />
            {seoResult.readTimeEstimate && (
              <InfoRow label="Thời gian đọc ước tính" value={`${seoResult.readTimeEstimate} phút`} />
            )}

            {seoResult.suggestedTags && seoResult.suggestedTags.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">Tags gợi ý</label>
                <div className="flex flex-wrap gap-2">
                  {seoResult.suggestedTags.map((tag: string) => (
                    <span key={tag} className="px-2.5 py-1 bg-indigo-950/50 text-indigo-300 text-xs rounded-lg border border-indigo-500/20 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {seoResult.headingStructure && seoResult.headingStructure.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">Cấu trúc Heading</label>
                <div className="bg-zinc-800 rounded-xl p-3 space-y-1">
                  {seoResult.headingStructure.map((h: string, i: number) => (
                    <p key={i} className="text-xs text-zinc-300 font-mono">{h}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl text-xs text-amber-300/80 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Các đề xuất này chỉ mang tính gợi ý. Vui lòng review và điều chỉnh phù hợp với bài viết thực tế.
                Sao chép các giá trị và điền vào form bài viết sau khi bấm &ldquo;Dùng trong Editor&rdquo;.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value, helper }: { label: string; value?: string; helper?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-semibold text-zinc-300">{label}</label>
        {helper && <span className="text-[10px] text-zinc-600">{helper}</span>}
      </div>
      <div className="flex items-start gap-2">
        <p className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-200 min-h-[36px]">
          {value || <span className="text-zinc-600 italic">—</span>}
        </p>
        {value && (
          <button onClick={copy} className="p-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors">
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Media Tab ────────────────────────────────────────────────────────────────
function MediaTab({ generatedContent, onCopy }: { generatedContent: string; onCopy: (t: string) => void }) {
  const [ytUrl, setYtUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [altText, setAltText] = useState('');

  const generateYTEmbed = () => {
    const match = ytUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!match) { alert('URL YouTube không hợp lệ.'); return; }
    const videoId = match[1];
    const embed = `<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>`;
    setEmbedCode(embed);
  };

  const generateImgTag = () => {
    if (!imgUrl) { alert('Vui lòng nhập URL ảnh.'); return; }
    const tag = `<figure><img src="${imgUrl}" alt="${altText || 'Hình ảnh minh họa'}" style="max-width:100%;height:auto;" />${altText ? `<figcaption>${altText}</figcaption>` : ''}</figure>`;
    setEmbedCode(tag);
  };

  return (
    <div className="space-y-5">
      {/* YouTube Embed */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Youtube className="w-4 h-4 text-rose-400" />
          Nhúng YouTube Video
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={ytUrl}
            onChange={(e) => setYtUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
          />
          <button
            onClick={generateYTEmbed}
            className="px-3 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-all"
          >
            Tạo Embed
          </button>
        </div>
        {embedCode && embedCode.includes('youtube') && (
          <div className="space-y-2">
            <div dangerouslySetInnerHTML={{ __html: embedCode }} className="rounded-xl overflow-hidden" />
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-[11px] text-zinc-400 font-mono truncate">{embedCode.slice(0, 80)}...</code>
              <button onClick={() => onCopy(embedCode)} className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs rounded-xl flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5" /> Sao chép
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Image Tag */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-indigo-400" />
          Tạo thẻ ảnh HTML
        </h2>
        <div className="space-y-3">
          <input
            type="url"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="https://images.example.com/photo.jpg"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Mô tả ảnh (alt text)..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={generateImgTag}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all"
          >
            Tạo thẻ &lt;img&gt;
          </button>
        </div>
        {embedCode && embedCode.includes('<img') && (
          <div className="space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {imgUrl && <img src={imgUrl} alt={altText} className="max-w-full rounded-xl max-h-48 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-[11px] text-zinc-400 font-mono overflow-auto">{embedCode}</code>
              <button onClick={() => onCopy(embedCode)} className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs rounded-xl flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5" /> Sao chép
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <h3 className="text-xs font-bold text-zinc-300 mb-2 flex items-center gap-2">
          <Link2 className="w-3.5 h-3.5 text-zinc-400" />
          Hướng dẫn chèn media vào bài viết
        </h3>
        <ul className="space-y-1.5 text-xs text-zinc-500">
          <li>• Sao chép code HTML từ công cụ trên</li>
          <li>• Vào tab <strong className="text-zinc-300">Generate & Edit</strong> → dán vào vị trí mong muốn trong ô nội dung</li>
          <li>• Ảnh sử dụng URL trực tiếp (không upload file lên server)</li>
          <li>• YouTube: chỉ hỗ trợ URL dạng youtube.com/watch?v= hoặc youtu.be/</li>
          <li>• Luôn kiểm tra Preview trước khi dùng trong Editor</li>
        </ul>
      </div>
    </div>
  );
}

// ── Reusable ActionButton ────────────────────────────────────────────────────
function ActionButton({
  onClick, disabled, icon: Icon, label, color = 'indigo', loading,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: any;
  label: string;
  color?: string;
  loading?: boolean;
}) {
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/40',
    emerald: 'bg-emerald-600/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/40',
    violet: 'bg-violet-600/20 border-violet-500/30 text-violet-300 hover:bg-violet-600/40',
    teal: 'bg-teal-600/20 border-teal-500/30 text-teal-300 hover:bg-teal-600/40',
    amber: 'bg-amber-600/20 border-amber-500/30 text-amber-300 hover:bg-amber-600/40',
    rose: 'bg-rose-600/20 border-rose-500/30 text-rose-300 hover:bg-rose-600/40',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${colorMap[color] || colorMap.indigo}`}
    >
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Icon className="w-3.5 h-3.5" />}
      {label}
    </button>
  );
}
