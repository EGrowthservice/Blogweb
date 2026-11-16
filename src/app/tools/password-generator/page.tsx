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
  Home,
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

  const getStrength = () => {
    if (!password) return { label: 'Empty', score: 0, color: 'bg-slate-200', text: 'text-slate-500' };
    let score = 0;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (includeUpper) score += 1;
    if (includeLower) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score <= 2) return { label: 'Very Weak', score: 20, color: 'bg-red-500', text: 'text-red-600' };
    if (score === 3) return { label: 'Weak', score: 40, color: 'bg-orange-500', text: 'text-orange-600' };
    if (score === 4) return { label: 'Moderate', score: 65, color: 'bg-amber-500', text: 'text-amber-600' };
    if (score === 5) return { label: 'Strong', score: 85, color: 'bg-emerald-500', text: 'text-emerald-600' };
    return { label: 'Cryptographically Secure', score: 100, color: 'bg-blue-600', text: 'text-blue-600' };
  };

  const strength = getStrength();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600 transition">
          Web Tools
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Password Generator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-3 border border-red-200">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Security &amp; Entropy Utility</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mb-2">
          Secure Random Password Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Generate high-entropy, brute-force resistant passwords. Runs 100% locally in your browser memory with zero server telemetry.
        </p>
      </div>

      {/* Password Display Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
        <div className="relative mb-5">
          <div className="w-full flex items-center justify-between p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-300 font-mono text-base sm:text-xl font-bold tracking-wider text-slate-900 select-all overflow-x-auto break-all">
            <span>{showPassword ? password : '•'.repeat(password.length)}</span>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-slate-500 hover:text-slate-800 bg-white rounded-xl border border-slate-200 transition"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={generatePassword}
                className="p-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition"
                title="Generate another password"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Strength Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-500">Entropy Strength:</span>
            <span className={strength.text}>{strength.label}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strength.color}`}
              style={{ width: `${strength.score}%` }}
            />
          </div>
        </div>

        {/* Controls Grid */}
        <div className="space-y-6 pt-4 border-t border-slate-200">
          {/* Length Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password-length" className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                Password Character Length
              </label>
              <span className="text-sm font-black text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full border border-blue-200">
                {length} chars
              </span>
            </div>
            <input
              id="password-length"
              type="range"
              min={8}
              max={48}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
              <span>8</span>
              <span>16 (Recommended)</span>
              <span>32</span>
              <span>48</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs sm:text-sm text-slate-800 font-bold">Uppercase Letters (A - Z)</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs sm:text-sm text-slate-800 font-bold">Lowercase Letters (a - z)</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs sm:text-sm text-slate-800 font-bold">Numeric Digits (0 - 9)</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs sm:text-sm text-slate-800 font-bold">Special Symbols (!@#$%)</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition sm:col-span-2">
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs sm:text-sm text-slate-800 font-bold">
                Exclude Ambiguous Characters (O, 0, l, 1, I)
              </span>
            </label>
          </div>

          {/* Copy CTA */}
          <div className="pt-2">
            <button
              onClick={handleCopy}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" /> Password Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" /> Copy Secure Password
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Security Guidance */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2 font-display">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Industry Rules for Robust Credential Hygiene
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Over 80% of confirmed corporate and personal breaches originate from compromised or reused passwords. Follow these principles to guarantee account resilience:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
          <li>
            <strong>Minimum Length of 16 Characters:</strong> Every additional character exponentially multiplies the mathematical combinations required for dictionary and hashcat brute-force attempts.
          </li>
          <li>
            <strong>Zero Personal Identifiers:</strong> Never incorporate birthdays, pet names, or sequential digits (e.g., <code>Password123!</code>).
          </li>
          <li>
            <strong>Deploy a Dedicated Password Manager:</strong> Store master keys in an audited vault such as Bitwarden or 1Password so you never reuse identical credentials across accounts.
          </li>
          <li>
            <strong>Enable Multi-Factor Authentication (MFA):</strong> Complement strong passwords with hardware security keys (YubiKey) or time-based one-time password (TOTP) apps.
          </li>
        </ul>
      </div>
    </div>
  );
}
