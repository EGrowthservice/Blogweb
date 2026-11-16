import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, FileCheck, Mail, Globe, Sparkles, BookOpen, Laptop, Smartphone, FileSpreadsheet, ShieldCheck, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Giới Thiệu & Tiêu Chuẩn Biên Tập | PULSE TechTips',
  description:
    'Tìm hiểu về PULSE TechTips: Chuyên trang thủ thuật công nghệ, tối ưu máy tính, mẹo điện thoại, tin học văn phòng và công cụ trực tuyến miễn phí.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Về Chúng Tôi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Về PULSE TechTips & Bộ Công Cụ Tiện Ích Số
        </h1>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          PULSE TechTips là nền tảng chia sẻ thủ thuật công nghệ, kỹ năng tin học văn phòng và bộ công cụ trực tuyến miễn phí, được xây dựng với mục tiêu giúp người dùng giải quyết nhanh các vấn đề máy tính, tối ưu hóa năng suất làm việc và bảo vệ an toàn số mỗi ngày.
        </p>
      </div>

      {/* Editorial Pillars */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-blue-600">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Các Trụ Cột Nội Dung Cốt Lõi
          </h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Khác với các trang tin tức sao chép giật gân, toàn bộ hướng dẫn trên PULSE TechTips đều được biên soạn chi tiết theo từng bước thực hành, có hình ảnh minh họa và kiểm nghiệm thực tế:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: PC Tips */}
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Thủ Thuật Máy Tính & Hệ Điều Hành
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hướng dẫn chuyên sâu về tối ưu Windows 11/10, macOS, giải phóng ổ đĩa C, sửa lỗi màn hình xanh (BSOD), sửa lỗi mất kết nối WiFi và tổng hợp các tổ hợp phím tắt quyền năng.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link href="/pc-tips" className="text-xs font-semibold text-blue-600 hover:underline">
                Xem Thủ Thuật Máy Tính →
              </Link>
            </div>
          </div>

          {/* Pillar 2: Mobile Tips */}
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Thủ Thuật Smartphone & Bảo Mật
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Mẹo tối ưu thời lượng pin iPhone iOS, dọn dẹp bộ nhớ đệm Android, thiết lập xác thực 2 lớp cho Zalo/Telegram và các biện pháp chặn cuộc gọi rác lừa đảo.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link href="/mobile-tips" className="text-xs font-semibold text-emerald-600 hover:underline">
                Xem Thủ Thuật Di Động →
              </Link>
            </div>
          </div>

          {/* Pillar 3: Office Productivity & Tools */}
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Tin Học Văn Phòng & Tiện Ích
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Làm chủ hàm XLOOKUP, PivotTable, phím tắt Excel và bộ tiện ích trực tuyến xử lý tức thì: Rút gọn link, Đếm từ, Tạo mật khẩu mạnh, Tạo mã QR và Làm đẹp JSON.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link href="/tools" className="text-xs font-semibold text-amber-600 hover:underline">
                Khám Phá Tiện Ích Trực Tuyến →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Principles & E-E-A-T */}
      <section className="space-y-4 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 text-blue-600">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Tiêu Chuẩn Kiểm Chứng & Đạo Đức Biên Tập (E-E-A-T)
          </h2>
        </div>
        <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
          <p>
            Tại PULSE TechTips, chúng tôi tuân thủ nghiêm ngặt các nguyên tắc chất lượng theo chuẩn Google Search Quality Evaluator Guidelines:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>100% Thử nghiệm thực tế trước khi xuất bản:</strong> Mọi câu lệnh CMD, cú pháp hàm Excel và hướng dẫn cài đặt đều được đội ngũ kỹ thuật viên thử nghiệm trực tiếp trên hệ thống máy thật để đảm bảo không gây lỗi cho thiết bị của độc giả.
            </li>
            <li>
              <strong>Bảo mật thông tin người dùng:</strong> Toàn bộ các công cụ trên trang Tiện ích Trực tuyến (như Đếm từ, Tạo mật khẩu, Tạo mã QR) đều chạy trên cơ chế Client-side (xử lý trực tiếp trên trình duyệt của bạn). Dữ liệu văn bản và mật khẩu không bao giờ được gửi về hay lưu trữ trên bất kỳ máy chủ nào.
            </li>
            <li>
              <strong>Cập nhật và sửa lỗi kịp thời:</strong> Khi các hệ điều hành (Windows, iOS, Android) phát hành bản vá mới làm thay đổi giao diện thiết lập, chúng tôi sẽ cập nhật lại nội dung bài viết tương ứng.
            </li>
          </ul>
        </div>
      </section>

      {/* Contact Info */}
      <section className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 text-sm text-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-900">Bạn Cần Hỗ Trợ Kỹ Thuật Hoặc Đóng Góp Ý Kiến?</h3>
          <p className="text-xs text-gray-600 mt-1">
            Ban biên tập luôn sẵn sàng lắng nghe mọi phản hồi và câu hỏi từ độc giả.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition whitespace-nowrap shadow-sm"
        >
          Liên Hệ Ban Biên Tập →
        </Link>
      </section>
    </div>
  );
}
