import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | PULSE Entertainment',
  description:
    'Terms of Service, intellectual property policies, DMCA notice, and conditions of use for PULSE Entertainment.',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-700 space-y-8 leading-relaxed text-[15px]">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-400 mt-2">
          Effective Date: January 1, 2026 • Last Revised: September 29, 2026
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
        <p className="text-sm text-gray-600">
          By accessing or using PULSE Entertainment (&quot;the Service&quot;), whether as a guest or visitor, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you should discontinue use of the site.
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">2. Intellectual Property & Fair Use</h2>
        <p className="text-sm text-gray-600">
          Original editorial articles, commentary, and analysis on PULSE Entertainment are protected by copyright and intellectual property laws.
        </p>
        <p className="text-sm text-gray-600">
          Photographs, classic television stills, and embedded video clips referenced on this website are utilized in accordance with the <strong>Fair Use Doctrine</strong> (17 U.S. Code § 107) for transformative purposes of criticism, cultural commentary, educational historical archiving, and reporting.
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">3. Digital Millennium Copyright Act (DMCA)</h2>
        <p className="text-sm text-gray-600">
          We respect intellectual property rights. If you believe your copyrighted material is displayed without authorization, please contact us with the URL and details at <a href="mailto:hieucv2004@gmail.com" className="font-semibold text-blue-600 underline">hieucv2004@gmail.com</a>.
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">4. Community Comments Policy</h2>
        <p className="text-sm text-gray-600">
          Readers may post comments on articles. Comments must remain civil, free of harassment, spam, hate speech, or commercial solicitations. We reserve the right to remove any comment that violates these guidelines.
        </p>
      </section>
    </div>
  );
}
