import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, Cookie, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & CCPA Compliance | PULSE Entertainment',
  description:
    'Our comprehensive Privacy Policy detailing cookie usage, Google AdSense disclosures, CCPA rights for California residents, and data practices.',
  alternates: {
    canonical: 'https://pulse-entertainment.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 20, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-neutral-300 space-y-8 leading-relaxed text-[15px]">
      <div>
        <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
          Legal & Transparency
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mt-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-400 mt-2">
          Last Updated: {lastUpdated} • Effective Date: January 1, 2026
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
        <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
          <Shield className="w-5 h-5" />
          <span>Commitment to Reader Privacy</span>
        </div>
        <p className="text-xs text-neutral-300">
          PULSE Entertainment (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) values your privacy. This policy outlines the types of information we collect when you visit our website, how we use and protect that information, and your legal rights under United States state and federal privacy statutes, including the California Consumer Privacy Act (CCPA/CPRA).
        </p>
      </div>

      {/* 1. Google AdSense & Third-Party Cookies (MANDATORY FOR ADSENSE) */}
      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
          <Cookie className="w-6 h-6 text-brand-500" />
          1. Google AdSense & Third-Party Advertising Disclosures
        </h2>
        <p>
          We partner with third-party advertising companies, including <strong>Google LLC (Google AdSense)</strong>, to serve advertisements when you visit our website.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Third-Party Vendor Cookies:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site.
          </li>
          <li>
            <strong>Personalized Advertising:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve personalized ads to our users based on their visit to our site and/or other sites on the Internet.
          </li>
          <li>
            <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting{' '}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 underline hover:text-brand-300"
            >
              Google Ads Settings
            </a>
            . Alternatively, you can opt out of third-party vendors&apos; use of cookies for personalized advertising by visiting{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 underline hover:text-brand-300"
            >
              www.aboutads.info
            </a>
            .
          </li>
        </ul>
      </section>

      {/* 2. Information We Collect */}
      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
          <Eye className="w-6 h-6 text-brand-500" />
          2. Information We Collect
        </h2>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">A. Information You Provide Voluntarily</h3>
          <p>
            When you sign in with your Google account (via Google OAuth), we receive your basic public profile information, consisting of your name, email address, and profile picture. This information is used exclusively to authenticate your account, allow you to bookmark articles, and attribute your community comments.
          </p>
          <p>
            You may browse all news articles, reviews, and editorial content without creating an account or signing in.
          </p>

          <h3 className="text-lg font-semibold text-white pt-2">B. Automatically Collected Data (Log Files & Analytics)</h3>
          <p>
            Like most standard website servers, we utilize log files. This includes internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, platform type, date/time stamp, and number of clicks. We use this data via Google Analytics 4 to analyze trends, administer the site, track user movement in the aggregate, and gather demographic information for aggregate use.
          </p>
        </div>
      </section>

      {/* 3. California Consumer Privacy Act (CCPA / CPRA) Rights */}
      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
          <Lock className="w-6 h-6 text-brand-500" />
          3. Notice to California Residents (CCPA / CPRA Rights)
        </h2>
        <p>
          If you reside in the State of California, the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), affords you specific rights regarding your personal information:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Right to Know:</strong> You have the right to request that we disclose what personal information we collect, use, disclose, and sell.
          </li>
          <li>
            <strong>Right to Delete:</strong> You have the right to request the deletion of your personal information collected or maintained by us.
          </li>
          <li>
            <strong>Right to Opt-Out of Sale/Sharing:</strong> We do not sell your personal information for monetary consideration. However, like many digital publishers, we allow third-party advertising partners (such as Google) to collect data via cookies for targeted advertising. You have the right to opt out of this sharing at any time.
          </li>
          <li>
            <strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights.
          </li>
        </ul>
        <p>
          To exercise any of these rights, please email our Data Privacy Officer at{' '}
          <a href="mailto:privacy@pulse-entertainment.com" className="text-brand-400 underline">
            privacy@pulse-entertainment.com
          </a>
          .
        </p>
      </section>

      {/* 4. Children's Information (COPPA) */}
      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-brand-500" />
          4. Children&apos;s Online Privacy Protection Act (COPPA)
        </h2>
        <p>
          PULSE Entertainment is directed to general audiences aged 13 and older. We do not knowingly collect or solicit personal identifiable information from children under the age of 13. If we discover that a child under 13 has provided us with personal information, we immediately delete such information from our servers.
        </p>
      </section>

      {/* 5. Contact Information */}
      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-2xl font-bold font-display text-white">
          5. Privacy Questions & Data Controller Contact
        </h2>
        <p>
          If you have questions, comments, or requests regarding this Privacy Policy, please contact our privacy compliance desk:
        </p>
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs space-y-1">
          <p className="font-bold text-white">PULSE Entertainment Media Group, Inc.</p>
          <p>Attn: Data Privacy & Legal Compliance</p>
          <p>9255 Sunset Blvd, Suite 800, West Hollywood, CA 90069</p>
          <p>Email: <a href="mailto:privacy@pulse-entertainment.com" className="text-brand-400 underline">privacy@pulse-entertainment.com</a></p>
        </div>
      </section>
    </div>
  );
}
