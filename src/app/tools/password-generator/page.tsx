'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  Copy,
  Check,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  Sliders,
} from 'lucide-react';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const generatePassword = useCallback(() => {
    let uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeAmbiguous) {
      uppercaseChars = uppercaseChars.replace(/[OI]/g, '');
      lowercaseChars = lowercaseChars.replace(/[l]/g, '');
      numberChars = numberChars.replace(/[01]/g, '');
    }

    let validChars = '';
    const guaranteedChars: string[] = [];

    if (includeUpper) {
      validChars += uppercaseChars;
      guaranteedChars.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);
    }
    if (includeLower) {
      validChars += lowercaseChars;
      guaranteedChars.push(lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]);
    }
    if (includeNumbers) {
      validChars += numberChars;
      guaranteedChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    }
    if (includeSymbols) {
      validChars += symbolChars;
      guaranteedChars.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
    }

    if (validChars.length === 0) {
      setPassword('');
      return;
    }

    const remainingLength = Math.max(0, length - guaranteedChars.length);
    const resultChars = [...guaranteedChars];

    for (let i = 0; i < remainingLength; i++) {
      const randIdx = Math.floor(Math.random() * validChars.length);
      resultChars.push(validChars[randIdx]);
    }

    // Shuffle characters
    const shuffled = resultChars.sort(() => Math.random() - 0.5).join('');
    setPassword(shuffled);
    setCopied(false);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Calculate password strength
  const getStrength = () => {
    if (!password) return { label: 'Trống', score: 0, color: 'bg-gray-200', text: 'text-gray-500' };
    let score = 0;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (includeUpper) score += 1;
    if (includeLower) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score <= 2) return { label: 'Rất Yếu', score: 20, color: 'bg-red-500', text: 'text-red-600' };
    if (score === 3) return { label: 'Yếu', score: 40, color: 'bg-orange-500', text: 'text-orange-600' };
    if (score === 4) return { label: 'Trung Bình', score: 65, color: 'bg-amber-500', text: 'text-amber-600' };
    if (score === 5) return { label: 'Mạnh', score: 85, color: 'bg-emerald-500', text: 'text-emerald-600' };
    return { label: 'Cực Kỳ An Toàn', score: 100, color: 'bg-blue-600', text: 'text-blue-600' };
  };

  const strength = getStrength();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách Tiện ích</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-3 border border-amber-200">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Bảo Mật & An Toàn Số</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Trình Tạo Mật Khẩu Mạnh Trực Tuyến
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Sinh mật khẩu ngẫu nhiên có độ bảo mật cao, chống tấn công dò quét (Brute-Force), chạy 100% trên trình duyệt và không lưu trữ trên máy chủ.
        </p>
      </div>

      {/* Password Display Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-8">
        <div className="relative mb-4">
          <div className="w-full flex items-center justify-between p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-300 font-mono text-base sm:text-xl font-bold tracking-wider text-gray-900 select-all overflow-x-auto break-all">
            <span>{showPassword ? password : '•'.repeat(password.length)}</span>
            <div className="flex items-center gap-2 ml-4 flex-shrink-0">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-gray-500 hover:text-gray-700 bg-white rounded-lg border border-gray-200 transition"
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={generatePassword}
                className="p-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
                title="Tạo mật khẩu khác"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Strength Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-gray-500">Độ mạnh mật khẩu:</span>
            <span className={strength.text}>{strength.label}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strength.color}`}
              style={{ width: `${strength.score}%` }}
            />
          </div>
        </div>

        {/* Controls Grid */}
        <div className="space-y-6 pt-4 border-t border-gray-200">
          {/* Length Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password-length" className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                Độ dài mật khẩu
              </label>
              <span className="text-sm font-black text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full border border-blue-200">
                {length} ký tự
              </span>
            </div>
            <input
              id="password-length"
              type="range"
              min={6}
              max={48}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
              <span>6</span>
              <span>16 (Khuyến nghị)</span>
              <span>32</span>
              <span>48</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 font-medium">Chữ HOA (A - Z)</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 font-medium">Chữ thường (a - z)</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 font-medium">Chữ số (0 - 9)</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 font-medium">Ký tự đặc biệt (!@#$%)</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition sm:col-span-2">
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 font-medium">
                Loại bỏ ký tự dễ nhầm lẫn (O, 0, l, 1, I)
              </span>
            </label>
          </div>

          {/* Copy CTA */}
          <div className="pt-2">
            <button
              onClick={handleCopy}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" /> Đã Sao Chép Mật Khẩu Vào Bộ Nhớ Đệm!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" /> Sao Chép Mật Khẩu Này
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Security Guidance for SEO & E-E-A-T */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Quy Tắc Đặt Mật Khẩu An Toàn Cho Tài Khoản Trực Tuyến
        </h2>
        <p>
          Hơn 80% các vụ xâm nhập tài khoản xảy ra do người dùng đặt mật khẩu yếu hoặc sử dụng lại một mật khẩu cho nhiều dịch vụ. Dưới đây là các khuyến nghị bảo mật từ các chuyên gia an ninh mạng:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Độ dài tối thiểu 14-16 ký tự:</strong> Mỗi ký tự tăng thêm sẽ nhân số lượng tổ hợp mà hacker cần thử lên gấp hàng chục lần.
          </li>
          <li>
            <strong>Không dùng thông tin cá nhân:</strong> Tránh đưa ngày sinh, số điện thoại, tên thú cưng hoặc dãy số tuần tự như <code>123456</code> vào mật khẩu.
          </li>
          <li>
            <strong>Bật xác thực 2 lớp (2FA):</strong> Kết hợp mật khẩu mạnh với ứng dụng Google Authenticator hoặc tin nhắn xác thực để bảo vệ tuyệt đối.
          </li>
          <li>
            <strong>Sử dụng trình quản lý mật khẩu:</strong> Lưu trữ trong Bitwarden, 1Password hoặc Google Password Manager để không bao giờ phải nhớ thuộc lòng từng mật khẩu phức tạp.
          </li>
        </ul>
      </div>
    </div>
  );
}
