import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, apiError, apiSuccess } from '@/lib/api-guard';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { response } = await requireAuth(['super_admin', 'admin', 'editor']);
  if (response) return response;

  try {
    const body = await req.json();
    const { imageBase64, fileName, mimeType } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return apiError('Dữ liệu hình ảnh (base64) không được để trống.', 400);
    }

    const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const type = mimeType || 'image/webp';
    if (!allowedMime.includes(type)) {
      return apiError('Định dạng ảnh không hợp lệ. Chỉ chấp nhận JPG, PNG, WEBP, GIF.', 400);
    }

    const commaIdx = imageBase64.indexOf(',');
    const base64Data = commaIdx !== -1 ? imageBase64.substring(commaIdx + 1) : imageBase64;
    const buffer = Buffer.from(base64Data, 'base64');

    if (buffer.length > 5 * 1024 * 1024) {
      return apiError('Dung lượng ảnh vượt quá giới hạn 5MB.', 400);
    }

    const extMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
    };
    const ext = extMap[type] || 'webp';
    const cleanName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = `uploads/${cleanName}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mmltqgekvpdnezqdavvc.supabase.co';
    const serviceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SECRET ||
      process.env.NEXT_PUBLIC_SUPABASE_SECRET ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      '';

    if (!serviceKey) {
      return apiError('Chưa cấu hình Supabase Storage key.', 500);
    }

    const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/postnew/${filePath}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
        'Content-Type': type,
        'x-upsert': 'true',
      },
      body: buffer,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error('[Supabase Upload Error]', uploadRes.status, errText);
      return apiError('Không thể tải ảnh lên cloud storage.', 500);
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/postnew/${filePath}`;
    return apiSuccess({ url: publicUrl, path: filePath });
  } catch (err: any) {
    console.error('[Upload Exception]', err);
    return apiError(err.message || 'Lỗi xử lý file tải lên.', 500);
  }
}
