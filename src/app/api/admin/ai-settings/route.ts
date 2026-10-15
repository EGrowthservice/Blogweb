import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { AISettings, IAISettings } from '@/models/AISettings';
import { requireAuth, apiSuccess, apiError } from '@/lib/api-guard';

export const dynamic = 'force-dynamic';

// GET — Fetch AI settings (admin/super_admin only)
export async function GET() {
  const { auth, response } = await requireAuth(['super_admin', 'admin']);
  if (response) return response;

  try {
    await connectToDatabase();
    let settings = await AISettings.findOne().lean<IAISettings>();

    if (!settings) {
      // Create default settings on first access
      await AISettings.create({});
      settings = await AISettings.findOne().lean<IAISettings>();
    }

    // Never return internal Mongoose fields, keep it clean
    return apiSuccess(settings);
  } catch (error: any) {
    console.error('GET /api/admin/ai-settings error:', error);
    return apiError('Không thể tải cấu hình AI', 500, 'SERVER_ERROR');
  }
}

// PUT — Update AI settings (admin/super_admin only)
export async function PUT(req: NextRequest) {
  const { auth, response } = await requireAuth(['super_admin', 'admin']);
  if (response) return response;

  try {
    await connectToDatabase();
    const body = await req.json();

    const allowedKeys = [
      'websiteName',
      'websiteDescription',
      'defaultLanguage',
      'writingTone',
      'targetAudience',
      'preferredArticleStructure',
      'formattingRules',
      'contentQualityRequirements',
      'citationRules',
      'seoGuidelines',
      'termsToAvoid',
      'systemPrompt',
      'editorialGuidelines',
      'categoryTemplates',
      'activeProvider',
      'modelTemperature',
      'maxOutputTokens',
      'dailyRequestLimit',
    ] as const;

    const updateData: Record<string, any> = {};
    for (const key of allowedKeys) {
      if (key in body) {
        updateData[key] = body[key];
      }
    }

    const settings = await AISettings.findOneAndUpdate(
      {},
      { $set: updateData },
      { upsert: true, new: true, runValidators: true }
    ).lean();

    return apiSuccess(settings);
  } catch (error: any) {
    console.error('PUT /api/admin/ai-settings error:', error);
    if (error.name === 'ValidationError') {
      return apiError('Dữ liệu không hợp lệ: ' + error.message, 422, 'VALIDATION_ERROR');
    }
    return apiError('Không thể cập nhật cấu hình AI', 500, 'SERVER_ERROR');
  }
}
