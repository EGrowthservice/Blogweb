import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  Laptop,
  Smartphone,
  FileSpreadsheet,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & Editorial Standards | PULSE TechTips',
  description:
    'Discover the editorial standards and technical testing principles behind PULSE TechTips: your source for computer optimization guides, smartphone tips, office productivity, and free digital utilities.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>About PULSE TechTips</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Empowering Users With Practical Tech Knowledge & Digital Tools
        </h1>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          PULSE TechTips is an independent digital publication and utility hub created to solve real-world technical problems. We deliver hands-on, step-by-step operating system troubleshooting, productivity software tutorials, and zero-install client-side browser utilities designed to maximize daily computing efficiency.
        </p>
      </div>

      {/* Editorial Pillars */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-blue-600">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Core Editorial Pillars
          </h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Unlike generic content aggregators, every tutorial published on PULSE TechTips is crafted with direct hands-on testing, verified command syntaxes, and actionable takeaways:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: PC Tips */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                PC & Operating Systems
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                In-depth optimization walkthroughs for Windows 11/10 and macOS: clearing system drive space, diagnosing BSOD crashes, restoring network interfaces, and mastering command terminal shortcuts.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Link href="/pc-tips" className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                Explore PC Tutorials →
              </Link>
            </div>
          </div>

          {/* Pillar 2: Mobile Tips */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Mobile & Cybersecurity
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Actionable tips for iOS and Android: battery calibration, RAM management, application sandboxing, two-factor authentication (2FA) enforcement, and phishing defense strategies.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Link href="/mobile-tips" className="text-xs font-semibold text-emerald-600 hover:text-emerald-800">
                Explore Mobile Guides →
              </Link>
            </div>
          </div>

          {/* Pillar 3: Office Productivity & Tools */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Office & Web Utilities
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Advanced Microsoft Excel, Google Sheets, and word processing workflows paired with 5 instant browser tools: text case transform, strong password generation, QR code synthesis, and JSON formatting.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Link href="/tools" className="text-xs font-semibold text-red-600 hover:text-red-800">
                Launch Browser Tools →
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
            Editorial Guidelines & E-E-A-T Standards
          </h2>
        </div>
        <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
          <p>
            At PULSE TechTips, we align our publishing workflow with the Google Search Quality Evaluator Guidelines, prioritizing Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T):
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>First-Hand Hardware & Software Verification:</strong> Every terminal command (DISM, SFC, PowerShell), Excel formula, and configuration setting is directly executed on dedicated test environments prior to release to ensure safe, repeatable results for our readers.
            </li>
            <li>
              <strong>Client-Side Data Privacy by Design:</strong> All interactive browser tools hosted under <Link href="/tools" className="text-blue-600 underline">/tools</Link> execute exclusively on your local machine using vanilla JavaScript and Web APIs. Neither passwords, transformed text, nor JSON inputs are ever transmitted or stored on external servers.
            </li>
            <li>
              <strong>Active Maintenance:</strong> Operating system updates (e.g. Windows builds, macOS major releases, iOS revisions) often change settings panels and command arguments. Our editorial desk routinely audits and refreshes past guides to maintain 100% technical accuracy.
            </li>
          </ul>
        </div>
      </section>

      {/* Contact Info */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Open Editorial Desk</span>
          </div>
          <h3 className="text-lg font-bold text-white">Have a Correction, Inquiry, or Technical Question?</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-md">
            Our team welcomes feedback, correction requests, and suggestions to keep our knowledge base accurate and helpful.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition whitespace-nowrap shadow-md shrink-0"
        >
          Contact Editorial Desk →
        </Link>
      </section>
    </div>
  );
}
