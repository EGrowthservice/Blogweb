import React from 'react';
import type { Metadata } from 'next';
import { Shield, Lock, Eye, Cookie, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | PULSE Entertainment',
  description:
    'Our Privacy Policy detailing cookie usage, Google AdSense disclosures, CCPA compliance, and reader data practices.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 29, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-700 space-y-8 leading-relaxed text-[15px]">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-400 mt-2">
          Last Updated: {lastUpdated} • Effective Date: January 1, 2026
        </p>
      </div>

      <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
          <Shield className="w-5 h-5" />
          <span>Commitment to Reader Privacy</span>
        </div>
        <p className="text-xs text-gray-600">
          PULSE Entertainment values your privacy. This policy outlines the types of information we collect when you visit our website, how we use and protect that information, and your legal rights under applicable privacy statutes.
        </p>
      </div>

      {/* 1. Google AdSense Disclosures */}
      <section className="space-y-4 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Cookie className="w-5 h-5 text-blue-600" />
          1. Google AdSense & Third-Party Advertising Disclosures
        </h2>
        <p>
          We partner with third-party advertising companies, including <strong>Google LLC (Google AdSense)</strong>, to serve advertisements when you visit our website.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
          <li>
            <strong>Third-Party Vendor Cookies:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site.
          </li>
          <li>
            <strong>Personalized Advertising:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
          </li>
          <li>
            <strong>Opting Out:</strong> Users may opt out of personalized advertising by visiting{' '}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google Ads Settings
            </a>
            .
          </li>
        </ul>
      </section>

      {/* 2. Information We Collect */}
      <section className="space-y-4 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600" />
          2. Information We Collect
        </h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            You can read all comedy articles and content on PULSE Entertainment without creating an account. When posting comments, you may optionally provide a display name.
          </p>
          <p>
            Like standard web servers, we automatically collect basic log files (IP addresses, browser type, referring pages, date/time stamps) through Google Analytics to analyze site performance and readership trends.
          </p>
        </div>
      </section>

      {/* 3. Contact Information */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          3. Privacy Inquiries
        </h2>
        <p className="text-sm text-gray-600">
          For any privacy questions or requests regarding your data, please contact our team at:
        </p>
        <div className="p-4 rounded-md bg-gray-50 border border-gray-200 text-xs space-y-1 text-gray-700">
          <p className="font-bold text-gray-900">PULSE Entertainment</p>
          <p>Email: <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 hover:underline">hieucv2004@gmail.com</a></p>
        </div>
      </section>
    </div>
  );
}
