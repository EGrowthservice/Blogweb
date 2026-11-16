import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Link2,
  Type,
  KeyRound,
  QrCode,
  Code2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bộ Tiện Ích Trực Tuyến Miễn Phí | PULSE TechTips',
  description:
    'Tổng hợp các công cụ tiện ích số trực tuyến miễn phí, hoạt động 100% trên trình duyệt: Rút gọn link, Đếm từ & Chuyển đổi chữ, Tạo mật khẩu mạnh, Tạo mã QR và Làm đẹp JSON.',
  alternates: {
    canonical: '/tools',
  },
};

const TOOLS = [
  {
    title: 'Rút Gọn Link (ShortLink)',
    slug: '/shortlink',
    description:
      'Tạo đường dẫn rút gọn siêu nhanh với 2 chế độ: Rút gọn theo Từ khóa tiêu đề (chuẩn SEO) hoặc Tạo chuỗi ngẫu nhiên bảo mật.',
    icon: Link2,
    badge: 'Phổ biến nhất',
    color: 'from-blue-600 to-indigo-600',
    tags: ['ShortURL', 'Marketing', 'Chia sẻ'],
  },
  {
    title: 'Đếm Từ & Chuyển Đổi Định Dạng Chữ',
    slug: '/tools/text-case',
    description:
      'Đếm số từ, ký tự, số dòng, thời gian đọc. Chuyển đổi tức thì giữa CHỮ HOA, chữ thường, Title Case, camelCase, slug-case và xóa khoảng trắng thừa.',
    icon: Type,
    badge: 'Văn phòng',
    color: 'from-emerald-600 to-teal-600',
    tags: ['Text Tool', 'Soạn thảo', 'SEO Content'],
  },
  {
    title: 'Trình Tạo Mật Khẩu Mạnh & Bảo Mật',
    slug: '/tools/password-generator',
    description:
      'Sinh mật khẩu an toàn ngẫu nhiên chuẩn mã hóa. Tùy chỉnh độ dài 6-64 ký tự, kết hợp chữ hoa, chữ thường, số, ký tự đặc biệt và đo độ an toàn.',
    icon: KeyRound,
    badge: 'Bảo mật',
    color: 'from-amber-600 to-orange-600',
    tags: ['Security', 'Tài khoản', 'Mật khẩu'],
  },
  {
    title: 'Trình Tạo Mã QR Miễn Phí',
    slug: '/tools/qr-generator',
    description:
      'Tạo mã QR code chất lượng cao cho Website, liên kết, số điện thoại hoặc văn bản tùy ý. Quét nhanh tức thì và tải xuống miễn phí.',
    icon: QrCode,
    badge: 'Tiện dụng',
    color: 'from-purple-600 to-pink-600',
    tags: ['QR Code', 'Scan', 'Mobile'],
  },
  {
    title: 'Trình Định Dạng & Kiểm Tra Cú Pháp JSON',
    slug: '/tools/json-formatter',
    description:
      'Làm đẹp (Beautify 2-space/4-space) hoặc Nén nhỏ (Minify) chuỗi JSON. Tự động kiểm tra và báo lỗi cú pháp chính xác từng dòng.',
    icon: Code2,
    badge: 'Lập trình',
    color: 'from-cyan-600 to-blue-600',
    tags: ['JSON', 'Developer', 'Format'],
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>100% Miễn Phí • Xử Lý Trực Tiếp Trên Trình Duyệt</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight font-display mb-4">
          Trung Tâm Tiện Ích Trực Tuyến
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Bộ sưu tập các công cụ số thiết yếu giúp tối ưu hiệu suất công việc văn phòng, lập trình và xử lý tác vụ hàng ngày. Không cần đăng nhập, hoàn toàn an toàn và bảo mật dữ liệu.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={tool.slug}
              className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Top Accent Gradient Bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${tool.color}`}
              />

              {/* Icon & Badge */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition">
                  {tool.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
                {tool.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                {tool.description}
              </p>

              {/* Tags & Action Link */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-gray-50 text-gray-500 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:translate-x-1 transition duration-200">
                  Mở công cụ <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Trust & Privacy Guarantee */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50/40 rounded-2xl border border-gray-200 p-8 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Bảo Mật Client-Side</h4>
            <p className="text-xs sm:text-sm text-gray-600">
              Mọi dữ liệu văn bản, mật khẩu và JSON đều được xử lý cục bộ trên trình duyệt của bạn, không gửi về máy chủ.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Tốc Độ Siêu Tốc</h4>
            <p className="text-xs sm:text-sm text-gray-600">
              Công cụ phản hồi ngay tức thì trong mili-giây, không cần chờ đợi tải trang hay giới hạn lượt sử dụng.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Miễn Phí Vĩnh Viễn</h4>
            <p className="text-xs sm:text-sm text-gray-600">
              Không quảng cáo pop-up quấy rầy, không thu phí ngầm và tương thích hoàn hảo trên mọi thiết bị di động & máy tính.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
