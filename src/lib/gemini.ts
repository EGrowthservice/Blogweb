/**
 * Gemini AI Provider — Server-side only
 * API key never exposed to client. All calls go through /api/ai/* routes.
 */
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY || '';

if (!API_KEY && typeof window === 'undefined') {
  console.warn('[Gemini] GEMINI_API_KEY is not configured. AI features will be unavailable.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

const DEFAULT_MODEL = 'gemini-1.5-flash';

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export interface GeminiRequest {
  prompt: string;
  systemInstruction?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface GeminiResponse {
  text: string;
  promptTokens?: number;
  candidateTokens?: number;
  totalTokens?: number;
}

/**
 * Call Gemini with retry logic (max 2 retries on transient errors)
 */
export async function callGemini(req: GeminiRequest): Promise<GeminiResponse> {
  if (!API_KEY) {
    throw new Error('AI provider chưa được cấu hình. Vui lòng thêm GEMINI_API_KEY vào biến môi trường.');
  }

  const model = genAI.getGenerativeModel({
    model: DEFAULT_MODEL,
    systemInstruction: req.systemInstruction,
    safetySettings,
    generationConfig: {
      maxOutputTokens: req.maxTokens ?? 8192,
      temperature: req.temperature ?? 0.7,
      topP: 0.95,
      topK: 64,
    },
  });

  let lastError: Error | null = null;
  const maxRetries = 2;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(req.prompt);
      const response = result.response;
      const text = response.text();
      const usage = response.usageMetadata;

      return {
        text,
        promptTokens: usage?.promptTokenCount,
        candidateTokens: usage?.candidatesTokenCount,
        totalTokens: usage?.totalTokenCount,
      };
    } catch (err: any) {
      lastError = err;

      // Don't retry on auth/quota errors
      const errMsg = err?.message || '';
      if (
        errMsg.includes('API_KEY_INVALID') ||
        errMsg.includes('PERMISSION_DENIED') ||
        errMsg.includes('QUOTA_EXCEEDED') ||
        errMsg.includes('RESOURCE_EXHAUSTED')
      ) {
        break;
      }

      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }

  throw lastError || new Error('Không thể kết nối đến AI provider.');
}

/**
 * Strip markdown code fences from AI output if present
 * (Gemini sometimes wraps HTML in ```html ... ```)
 */
export function stripCodeFences(text: string): string {
  return text
    .replace(/^```(?:html|markdown|md)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();
}

/**
 * Basic HTML sanitization — remove script/iframe (non-YouTube) tags
 * but preserve structural HTML tags used in article content.
 */
export function sanitizeArticleHTML(html: string): string {
  // Remove <script> tags
  let safe = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handler attributes (onclick, onload, etc.)
  safe = safe.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
  safe = safe.replace(/\s+on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: URLs
  safe = safe.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');

  return safe.trim();
}
