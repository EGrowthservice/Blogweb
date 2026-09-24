import { z } from 'zod';

export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Category Validation Schemas
export const CategoryCreateSchema = z.object({
  name: z.string().min(2, 'Tên danh mục phải có ít nhất 2 ký tự').max(100, 'Tên danh mục không quá 100 ký tự').trim(),
  slug: z.string().min(2, 'Slug phải có ít nhất 2 ký tự').max(120, 'Slug không quá 120 ký tự').regex(slugRegex, 'Slug chỉ chứa chữ thường, số và dấu gạch ngang (-)').trim(),
  description: z.string().max(500, 'Mô tả không quá 500 ký tự').optional().default(''),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const CategoryUpdateSchema = CategoryCreateSchema.partial();

// Post Validation Schemas
export const PostBaseSchema = z.object({
  title: z.string().min(5, 'Tiêu đề bài viết phải có ít nhất 5 ký tự').max(200, 'Tiêu đề không quá 200 ký tự').trim(),
  slug: z.string().min(5, 'Slug phải có ít nhất 5 ký tự').max(220, 'Slug không quá 220 ký tự').regex(slugRegex, 'Slug chỉ chứa chữ thường, số và gạch nối (-)').trim(),
  excerpt: z.string().min(10, 'Tóm tắt bài viết ít nhất 10 ký tự').max(500, 'Tóm tắt không quá 500 ký tự').trim(),
  content: z.string().min(1, 'Nội dung bài viết không được để trống'),
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục'),
  thumbnail: z.string().url('Ảnh đại diện phải là đường link URL hợp lệ').min(1, 'Vui lòng cung cấp ảnh đại diện'),
  thumbnailAlt: z.string().optional().default(''),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  tags: z.array(z.string()).optional().default([]),
  isFeatured: z.boolean().optional().default(false),
  isTrending: z.boolean().optional().default(false),
  readTimeMinutes: z.number().int().min(1).max(180).optional().default(5),
});

export const PostCreateSchema = PostBaseSchema.refine(
  (data) => {
    // If status is published, content must not be blank and excerpt must be present
    if (data.status === 'published') {
      return data.content.trim().length >= 20 && data.excerpt.trim().length >= 10;
    }
    return true;
  },
  {
    message: 'Bài viết ở trạng thái Xuất bản (Published) cần có tóm tắt ít nhất 10 ký tự và nội dung tối thiểu 20 ký tự.',
    path: ['content'],
  }
);

export const PostUpdateSchema = PostBaseSchema.partial();

// User Validation Schemas
export const UserCreateSchema = z.object({
  name: z.string().min(2, 'Tên người dùng phải có ít nhất 2 ký tự').max(100).trim(),
  email: z.string().email('Email không đúng định dạng').toLowerCase().trim(),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').max(100),
  role: z.enum(['super_admin', 'admin', 'editor', 'user']).default('editor'),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const UserUpdateSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  email: z.string().email().toLowerCase().trim().optional(),
  password: z.string().min(6).max(100).optional().or(z.literal('')),
  role: z.enum(['super_admin', 'admin', 'editor', 'user']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

// Advertising & Analytics Settings Schema
export const AdvertisingSettingsSchema = z.object({
  gaEnabled: z.boolean().default(true),
  gaMeasurementId: z
    .string()
    .trim()
    .refine((val) => !val || /^G-[A-Z0-9]+$/i.test(val) || /^UA-[0-9]+-[0-9]+$/i.test(val), {
      message: 'Measurement ID của Google Analytics phải có định dạng hợp lệ (Ví dụ: G-5F0GDVTZPE)',
    })
    .default('G-5F0GDVTZPE'),
  googleAdsEnabled: z.boolean().default(false),
  googleAdsConversionId: z
    .string()
    .trim()
    .refine((val) => !val || /^(AW-)?[0-9]+$/i.test(val), {
      message: 'Google Ads Conversion ID phải có định dạng hợp lệ (Ví dụ: AW-123456789 hoặc 123456789)',
    })
    .default(''),
  googleAdsConversionLabel: z.string().trim().max(100).default(''),
  adsenseEnabled: z.boolean().default(false),
  adsensePublisherId: z
    .string()
    .trim()
    .refine((val) => !val || /^ca-pub-[0-9]{16}$/i.test(val) || val === 'ca-pub-0000000000000000', {
      message: 'Google AdSense Publisher ID phải bắt đầu bằng ca-pub- theo sau là 16 chữ số',
    })
    .default('ca-pub-0000000000000000'),
  adsenseDefaultSlot: z.string().trim().regex(/^[0-9]*$/, 'Slot ID chỉ được chứa chữ số').default(''),
  adsenseHeaderSlot: z.string().trim().regex(/^[0-9]*$/, 'Slot ID chỉ được chứa chữ số').default(''),
  adsenseContentSlot: z.string().trim().regex(/^[0-9]*$/, 'Slot ID chỉ được chứa chữ số').default(''),
  adsenseSidebarSlot: z.string().trim().regex(/^[0-9]*$/, 'Slot ID chỉ được chứa chữ số').default(''),
  adsenseFooterSlot: z.string().trim().regex(/^[0-9]*$/, 'Slot ID chỉ được chứa chữ số').default(''),
  gtmEnabled: z.boolean().default(false),
  gtmContainerId: z
    .string()
    .trim()
    .refine((val) => !val || /^GTM-[A-Z0-9]+$/i.test(val), {
      message: 'Google Tag Manager Container ID phải bắt đầu bằng GTM- (Ví dụ: GTM-XXXXXXX)',
    })
    .default(''),
});
