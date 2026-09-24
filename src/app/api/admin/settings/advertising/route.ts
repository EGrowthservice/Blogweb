import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { AdvertisingSettings, getOrCreateAdvertisingSettings } from '@/models/AdvertisingSettings';
import { requireAuth, apiSuccess, apiError } from '@/lib/api-guard';
import { AdvertisingSettingsSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { response } = await requireAuth(['super_admin', 'admin']);
  if (response) return response;

  try {
    await connectToDatabase();
    const settings = await getOrCreateAdvertisingSettings();
    return apiSuccess(settings);
  } catch (error: any) {
    console.error('GET /admin/settings/advertising error:', error);
    return apiError('Không thể tải cấu hình quảng cáo', 500, 'SERVER_ERROR');
  }
}

export async function PUT(req: NextRequest) {
  const { response } = await requireAuth(['super_admin', 'admin']);
  if (response) return response;

  try {
    await connectToDatabase();
    const body = await req.json();

    const parseResult = AdvertisingSettingsSchema.safeParse(body);
    if (!parseResult.success) {
      return apiError(
        parseResult.error.issues[0]?.message || 'Dữ liệu cấu hình không hợp lệ',
        422,
        'VALIDATION_ERROR',
        parseResult.error.format()
      );
    }

    const data = parseResult.data;

    let settings = await AdvertisingSettings.findOne();
    if (!settings) {
      settings = await AdvertisingSettings.create(data);
    } else {
      Object.assign(settings, data);
      await settings.save();
    }

    return apiSuccess(settings);
  } catch (error: any) {
    console.error('PUT /admin/settings/advertising error:', error);
    return apiError('Không thể cập nhật cấu hình quảng cáo', 500, 'SERVER_ERROR');
  }
}
