import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { AISettings } from '@/models/AISettings';
import { requireAuth, apiSuccess, apiError } from '@/lib/api-guard';
import { callGemini, stripCodeFences, sanitizeArticleHTML } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export type AIAction =
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

interface AIRequestBody {
  action: AIAction;
  // Article Brief
  topic?: string;
  mainKeyword?: string;
  secondaryKeywords?: string;
  category?: string;
  language?: string;
  targetAudience?: string;
  articleType?: string;
  writingTone?: string;
  targetLength?: string;
  articleGoal?: string;
  referenceUrls?: string;
  customInstructions?: string;
  // Content
  outline?: string;
  selectedText?: string;
  currentContent?: string;
  newTone?: string;
  // Context
  articleTitle?: string;
  existingArticles?: { title: string; slug: string }[];
}

// ────────────────────────────────────────────────────────────────────────────
// POST /api/ai/generate
// ────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Auth check — only admin and editor roles
  const { auth, response } = await requireAuth(['super_admin', 'admin', 'editor']);
  if (response) return response;

  let body: AIRequestBody;
  try {
    body = await req.json();
  } catch {
    return apiError('Dữ liệu request không hợp lệ', 400, 'INVALID_JSON');
  }

  const { action } = body;
  if (!action) {
    return apiError('Thiếu tham số action', 400, 'MISSING_ACTION');
  }

  // Load AI settings for system prompt and guidelines
  let settings: any = null;
  try {
    await connectToDatabase();
    settings = await AISettings.findOne().lean();
  } catch {
    // Non-fatal — proceed with defaults
  }

  // Check daily usage limit
  if (settings) {
    const today = new Date().toDateString();
    const lastReset = new Date(settings.lastResetDate).toDateString();
    if (today !== lastReset) {
      // Reset counter
      await AISettings.findOneAndUpdate({}, { requestsUsedToday: 0, lastResetDate: new Date() });
      settings.requestsUsedToday = 0;
    }
    if (settings.requestsUsedToday >= settings.dailyRequestLimit) {
      return apiError(
        `Đã đạt giới hạn ${settings.dailyRequestLimit} yêu cầu AI/ngày. Vui lòng thử lại vào ngày mai.`,
        429,
        'RATE_LIMIT_EXCEEDED'
      );
    }
    // Increment usage (fire-and-forget)
    AISettings.findOneAndUpdate({}, { $inc: { requestsUsedToday: 1 } }).exec();
  }

  const language = body.language || settings?.defaultLanguage || 'vi';
  const tone = body.writingTone || settings?.writingTone || 'professional';
  const systemInstruction = buildSystemInstruction(settings, language);

  try {
    const { prompt, postProcess } = buildPrompt(action, body, settings, language, tone);
    const result = await callGemini({
      prompt,
      systemInstruction,
      maxTokens: settings?.maxOutputTokens ?? 8192,
      temperature: settings?.modelTemperature ?? 0.7,
    });

    let text = result.text;
    if (postProcess === 'html') {
      text = sanitizeArticleHTML(stripCodeFences(text));
    } else if (postProcess === 'strip') {
      text = stripCodeFences(text).trim();
    }

    return apiSuccess({
      text,
      action,
      tokenUsage: {
        prompt: result.promptTokens,
        output: result.candidateTokens,
        total: result.totalTokens,
      },
    });
  } catch (err: any) {
    console.error(`[AI] ${action} error:`, err?.message);
    const msg = err?.message || 'AI provider gặp lỗi không xác định';
    const isQuota = msg.includes('QUOTA') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota');
    return apiError(
      isQuota
        ? 'Đã vượt hạn mức API Gemini. Vui lòng kiểm tra quota của bạn hoặc thử lại sau.'
        : msg,
      isQuota ? 429 : 502,
      isQuota ? 'QUOTA_EXCEEDED' : 'AI_PROVIDER_ERROR'
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Prompt Builder
// ────────────────────────────────────────────────────────────────────────────

type PostProcess = 'html' | 'strip' | 'none';

function buildPrompt(
  action: AIAction,
  body: AIRequestBody,
  settings: any,
  language: string,
  tone: string
): { prompt: string; postProcess: PostProcess } {
  const langLabel = language === 'vi' ? 'tiếng Việt' : language === 'en' ? 'English' : language;
  const siteCtx = settings?.websiteName ? `for ${settings.websiteName}` : '';

  switch (action) {
    // ─── Full Article ─────────────────────────────────────────────────────
    case 'generate_full': {
      const length = body.targetLength || '800-1200 words';
      const prompt = `Write a complete, professional ${body.articleType || 'news article'} ${siteCtx} in ${langLabel}.

**Topic:** ${body.topic || 'No topic specified'}
**Main Keyword:** ${body.mainKeyword || 'N/A'}
**Secondary Keywords:** ${body.secondaryKeywords || 'N/A'}
**Category:** ${body.category || 'General'}
**Target Audience:** ${body.targetAudience || 'General readers'}
**Writing Tone:** ${tone}
**Target Length:** ${length}
**Article Goal:** ${body.articleGoal || 'Inform readers'}
${body.referenceUrls ? `**Reference Sources:** ${body.referenceUrls}` : ''}
${body.customInstructions ? `**Special Instructions:** ${body.customInstructions}` : ''}
${settings?.editorialGuidelines ? `**Editorial Guidelines:** ${settings.editorialGuidelines}` : ''}

OUTPUT FORMAT (strict):
- Write ONLY valid HTML
- Use <h2> for main sections, <h3> for sub-sections
- Use <p> for paragraphs, <ul>/<li> for lists, <strong> for bold, <em> for italic
- Add a blockquote <blockquote> for any notable quote if present
- Do NOT include <html>, <head>, <body> tags
- Do NOT include markdown — output pure HTML only
- Include the main keyword naturally in the first paragraph
- End with a proper conclusion paragraph`;
      return { prompt, postProcess: 'html' };
    }

    // ─── Generate from Outline ───────────────────────────────────────────
    case 'generate_from_outline': {
      const prompt = `Write a complete, professional article in ${langLabel} based on the following outline.

**Article Title:** ${body.articleTitle || body.topic || 'Article'}
**Writing Tone:** ${tone}
**Main Keyword:** ${body.mainKeyword || ''}
${body.customInstructions ? `**Special Instructions:** ${body.customInstructions}` : ''}

**OUTLINE:**
${body.outline || 'No outline provided'}

OUTPUT FORMAT (strict):
- Write ONLY valid HTML (no markdown, no code fences)
- Use <h2> and <h3> for headings exactly as in the outline
- Use <p>, <ul>/<li>, <strong>, <em>, <blockquote> as appropriate
- Do NOT include <html>, <head>, <body> tags
- Expand each outline point into full, detailed paragraphs
- Maintain the outline structure exactly`;
      return { prompt, postProcess: 'html' };
    }

    // ─── Generate Outline ────────────────────────────────────────────────
    case 'generate_outline': {
      const prompt = `Create a detailed article outline in ${langLabel} for the following:

**Topic:** ${body.topic || 'No topic specified'}
**Main Keyword:** ${body.mainKeyword || 'N/A'}
**Category:** ${body.category || 'General'}
**Article Type:** ${body.articleType || 'Standard article'}
**Target Length:** ${body.targetLength || 'Medium'}
**Article Goal:** ${body.articleGoal || 'Inform'}

Return a structured outline with:
1. Suggested H1 title (optimized for SEO)
2. H2 sections (3-6 sections)
3. H3 sub-points under each H2 (2-3 per section)
4. Key points to cover in each section
5. FAQ section if appropriate (2-4 questions)
6. Conclusion notes
7. Suggested reference sources to verify

Format as plain text with clear hierarchy using markdown-style headings (# for H1, ## for H2, ### for H3).`;
      return { prompt, postProcess: 'strip' };
    }

    // ─── Continue Writing ─────────────────────────────────────────────────
    case 'continue_writing': {
      const prompt = `Continue writing the following article in ${langLabel}. Write the next 2-4 paragraphs that naturally follow from where the article left off.

**Existing Content:**
${body.currentContent?.slice(-2000) || ''}

**Writing Tone:** ${tone}
${body.customInstructions ? `**Instructions:** ${body.customInstructions}` : ''}

OUTPUT: Return ONLY valid HTML continuation (no intro, no "here is the continuation", just the content). Use <p> tags for paragraphs.`;
      return { prompt, postProcess: 'html' };
    }

    // ─── Rewrite Text ─────────────────────────────────────────────────────
    case 'rewrite_text': {
      const prompt = `Rewrite the following text in ${langLabel} to improve quality, clarity, and engagement while preserving all key information.

**Original Text:**
${body.selectedText || ''}

**Writing Tone:** ${tone}
${body.customInstructions ? `**Instructions:** ${body.customInstructions}` : ''}

OUTPUT: Return ONLY the rewritten content as valid HTML. Preserve the same basic structure (headings, lists, etc.) but improve the writing. Do not add new sections.`;
      return { prompt, postProcess: 'html' };
    }

    // ─── Expand Section ───────────────────────────────────────────────────
    case 'expand_section': {
      const prompt = `Expand the following section of an article in ${langLabel}. Make it more detailed, informative, and engaging.

**Section to Expand:**
${body.selectedText || ''}

**Article Context:** ${body.articleTitle || 'Article about ' + body.topic}
**Writing Tone:** ${tone}
${body.customInstructions ? `**Instructions:** ${body.customInstructions}` : ''}

OUTPUT: Return the expanded section as valid HTML. Keep the same heading but add more paragraphs, examples, or details beneath it.`;
      return { prompt, postProcess: 'html' };
    }

    // ─── Summarize Section ────────────────────────────────────────────────
    case 'summarize_section': {
      const prompt = `Summarize the following section into 1-2 concise paragraphs in ${langLabel}. Keep the most important information.

**Section to Summarize:**
${body.selectedText || ''}

OUTPUT: Return ONLY the summarized text as valid HTML <p> tags.`;
      return { prompt, postProcess: 'html' };
    }

    // ─── Change Tone ──────────────────────────────────────────────────────
    case 'change_tone': {
      const prompt = `Rewrite the following text in ${langLabel} with a ${body.newTone || 'conversational'} tone. Preserve all information and structure.

**Original Text:**
${body.selectedText || body.currentContent?.slice(0, 3000) || ''}

OUTPUT: Return the rewritten content as valid HTML, same structure as the original.`;
      return { prompt, postProcess: 'html' };
    }

    // ─── Fix Grammar ──────────────────────────────────────────────────────
    case 'fix_grammar': {
      const prompt = `Fix grammar, spelling, punctuation, and style issues in the following text in ${langLabel}. Preserve the HTML formatting exactly.

**Text to Fix:**
${body.selectedText || body.currentContent || ''}

OUTPUT: Return ONLY the corrected HTML text. Do not change the meaning, structure, or add new content.`;
      return { prompt, postProcess: 'html' };
    }

    // ─── Generate FAQ ─────────────────────────────────────────────────────
    case 'generate_faq': {
      const prompt = `Generate a FAQ (Frequently Asked Questions) section in ${langLabel} for an article about:

**Topic:** ${body.topic || body.articleTitle || ''}
**Main Keyword:** ${body.mainKeyword || ''}
**Article Content (for context):**
${body.currentContent?.slice(0, 2000) || ''}

Create 4-6 relevant Q&A pairs that readers would likely ask.

OUTPUT FORMAT (valid HTML):
<h2>Frequently Asked Questions</h2>
<div class="faq-item">
  <h3>Question 1?</h3>
  <p>Answer 1...</p>
</div>
...and so on. Return ONLY HTML, no markdown.`;
      return { prompt, postProcess: 'html' };
    }

    // ─── Generate SEO Metadata ────────────────────────────────────────────
    case 'generate_seo': {
      const prompt = `Generate SEO metadata in ${langLabel} for the following article:

**Title:** ${body.articleTitle || body.topic}
**Main Keyword:** ${body.mainKeyword || ''}
**Secondary Keywords:** ${body.secondaryKeywords || ''}
**Category:** ${body.category || ''}
**Excerpt/Content (first 500 chars):** ${body.currentContent?.slice(0, 500) || ''}

Return a JSON object with these exact fields:
{
  "seoTitle": "...",
  "metaDescription": "...",
  "slug": "...",
  "suggestedTags": ["tag1", "tag2", "tag3"],
  "headingStructure": ["H1: ...", "H2: ...", "H2: ..."],
  "altTextSuggestion": "...",
  "readTimeEstimate": 5
}

Rules:
- seoTitle: 50-60 characters, include main keyword
- metaDescription: 150-160 characters, include main keyword, compelling
- slug: lowercase, hyphens only, 3-8 words
- suggestedTags: 4-6 relevant tags`;
      return { prompt, postProcess: 'strip' };
    }

    // ─── Suggest Internal Links ───────────────────────────────────────────
    case 'suggest_internal_links': {
      const existingList = (body.existingArticles || [])
        .slice(0, 20)
        .map((a) => `- "${a.title}" → /${a.slug}`)
        .join('\n');
      const prompt = `Based on the current article and the list of available articles on the website, suggest 3-5 relevant internal links in ${langLabel}.

**Current Article:** ${body.articleTitle || body.topic}
**Content snippet:** ${body.currentContent?.slice(0, 500) || ''}

**Available Articles:**
${existingList || 'No articles available'}

Return a JSON array:
[
  { "suggestedText": "anchor text to use", "targetSlug": "/slug", "targetTitle": "Article title", "reason": "Why this link is relevant" }
]`;
      return { prompt, postProcess: 'strip' };
    }

    // ─── Generate Headlines ───────────────────────────────────────────────
    case 'generate_headlines': {
      const prompt = `Generate 5 alternative headline/title options in ${langLabel} for an article about:

**Topic:** ${body.topic || body.articleTitle}
**Main Keyword:** ${body.mainKeyword || ''}
**Writing Tone:** ${tone}

Each headline should:
- Be 50-70 characters
- Include the main keyword if possible
- Be compelling and click-worthy but not clickbait
- Be different in structure and style

Return a JSON array of strings: ["Headline 1", "Headline 2", ...]`;
      return { prompt, postProcess: 'strip' };
    }

    // ─── Generate Excerpt ─────────────────────────────────────────────────
    case 'generate_excerpt': {
      const prompt = `Write a compelling excerpt/summary in ${langLabel} for the following article content. The excerpt should be 1-2 sentences (max 160 characters), engaging, and include the main keyword.

**Article Title:** ${body.articleTitle || body.topic}
**Main Keyword:** ${body.mainKeyword || ''}
**Content:** ${body.currentContent?.slice(0, 1000) || ''}

Return ONLY the excerpt text, no quotes or extra formatting.`;
      return { prompt, postProcess: 'strip' };
    }

    // ─── Generate Image Alt ───────────────────────────────────────────────
    case 'generate_image_alt': {
      const prompt = `Write descriptive alt text in ${langLabel} for a featured image of an article titled: "${body.articleTitle || body.topic}".

Alt text should be:
- Descriptive and specific (what's in the image conceptually)
- Include the main keyword: ${body.mainKeyword || ''}
- 80-120 characters
- Not start with "Image of" or "Photo of"

Return ONLY the alt text string.`;
      return { prompt, postProcess: 'strip' };
    }

    default:
      return {
        prompt: `Complete the following task in ${langLabel}: ${body.customInstructions || action}`,
        postProcess: 'strip',
      };
  }
}

function buildSystemInstruction(settings: any, language: string): string {
  const parts: string[] = [];

  if (settings?.systemPrompt) {
    parts.push(settings.systemPrompt);
  } else {
    parts.push(
      'You are an expert editorial AI assistant for a professional news and entertainment website. Write accurate, engaging, well-structured content.'
    );
  }

  parts.push(`Always respond in ${language === 'vi' ? 'Vietnamese (tiếng Việt)' : language === 'en' ? 'English' : language} unless otherwise specified in the prompt.`);

  if (settings?.editorialGuidelines) {
    parts.push(`Editorial Guidelines: ${settings.editorialGuidelines}`);
  }
  if (settings?.termsToAvoid) {
    parts.push(`Avoid these terms: ${settings.termsToAvoid}`);
  }
  if (settings?.seoGuidelines) {
    parts.push(`SEO Guidelines: ${settings.seoGuidelines}`);
  }

  return parts.join('\n\n');
}
