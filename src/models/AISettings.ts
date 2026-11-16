import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAISettings extends Document {
  // Brand Identity
  websiteName: string;
  websiteDescription: string;
  defaultLanguage: string;
  writingTone: string;
  targetAudience: string;

  // Content Guidelines
  preferredArticleStructure: string;
  formattingRules: string;
  contentQualityRequirements: string;
  citationRules: string;
  seoGuidelines: string;
  termsToAvoid: string;

  // System Prompt
  systemPrompt: string;

  // Editorial Guidelines (freeform)
  editorialGuidelines: string;

  // Category-specific templates (JSON string or plain text)
  categoryTemplates: {
    categorySlug: string;
    categoryName: string;
    template: string;
  }[];

  // Provider config (no API keys stored here — keys are in env vars)
  activeProvider: 'gemini' | 'openai';
  modelTemperature: number;
  maxOutputTokens: number;

  // Usage limits
  dailyRequestLimit: number;
  requestsUsedToday: number;
  lastResetDate: Date;

  createdAt: Date;
  updatedAt: Date;
}

const AISettingsSchema = new Schema<IAISettings>(
  {
    websiteName: { type: String, default: 'PULSE TechTips' },
    websiteDescription: { type: String, default: 'Tech tips, computer optimization & digital utilities website' },
    defaultLanguage: { type: String, default: 'en' },
    writingTone: { type: String, default: 'professional, practical, instructional' },
    targetAudience: { type: String, default: 'Global readers seeking practical computing tutorials and web tools' },

    preferredArticleStructure: {
      type: String,
      default: 'Lead paragraph → Key details → Background → Analysis → Conclusion',
    },
    formattingRules: {
      type: String,
      default: 'Use H2 for main sections, H3 for sub-sections. Short paragraphs. Include a quote if relevant.',
    },
    contentQualityRequirements: {
      type: String,
      default: 'Accurate, fact-based, no clickbait. Minimum 600 words for standard articles.',
    },
    citationRules: { type: String, default: 'Cite sources inline using [Source Name] notation.' },
    seoGuidelines: {
      type: String,
      default: 'Include main keyword in H1, first paragraph, and at least 2 H2 headings.',
    },
    termsToAvoid: { type: String, default: '' },

    systemPrompt: {
      type: String,
      default: `You are an expert editorial AI assistant for PULSE TechTips, a professional technology tutorials, computing guides, and digital tools publication. 
Your role is to help writers create authoritative, high-E-E-A-T, field-tested articles that follow rigorous editorial standards.
Always write factual, well-structured content with real terminal commands, step-by-step instructions, and actionable advice. Do not fabricate statistics or quotes.
Write entirely in fluent, professional English.`,
    },
    editorialGuidelines: { type: String, default: '' },

    categoryTemplates: [
      {
        categorySlug: { type: String, required: true },
        categoryName: { type: String, required: true },
        template: { type: String, required: true },
      },
    ],

    activeProvider: { type: String, enum: ['gemini', 'openai'], default: 'gemini' },
    modelTemperature: { type: Number, min: 0, max: 1, default: 0.7 },
    maxOutputTokens: { type: Number, min: 256, max: 16384, default: 8192 },

    dailyRequestLimit: { type: Number, default: 500 },
    requestsUsedToday: { type: Number, default: 0 },
    lastResetDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const AISettings: Model<IAISettings> =
  mongoose.models.AISettings || mongoose.model<IAISettings>('AISettings', AISettingsSchema);
