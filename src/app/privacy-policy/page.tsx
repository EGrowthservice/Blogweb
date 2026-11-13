import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, Cookie, FileText, Globe, CheckCircle2, Mail, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | PULSE Entertainment',
  description:
    'Comprehensive Privacy Policy for PULSE Entertainment detailing Google AdSense disclosures, cookie technologies, GDPR & CCPA rights, and reader data practices.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'November 13, 2026';
  const effectiveDate = 'January 1, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-700 space-y-10 leading-relaxed text-[15px]">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
          <Shield className="w-4 h-4" />
          <span>Reader Privacy & Security</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Last Updated: {lastUpdated} • Effective Date: {effectiveDate}
        </p>
      </div>

      {/* Intro Card */}
      <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 space-y-3">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
          <Lock className="w-5 h-5" />
          <span>Our Commitment to Your Privacy</span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          At <strong>PULSE Entertainment</strong> (&quot;PULSE,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), operating via <strong>https://www.pulseetm.click</strong>, we place paramount importance on safeguarding the privacy of our readers and visitors. This Privacy Policy details the types of information we collect, how it is processed and protected, our use of cookies and third-party advertising services (specifically <strong>Google AdSense</strong>), and your legal rights under regional and international data protection laws including the General Data Protection Regulation (<strong>GDPR</strong>) and the California Consumer Privacy Act (<strong>CCPA/CPRA</strong>).
        </p>
      </div>

      {/* 1. Google AdSense & Third-Party Advertising Disclosures */}
      <section className="space-y-4 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Cookie className="w-5 h-5 text-blue-600" />
          1. Google AdSense & Third-Party Advertising Disclosures
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We use third-party advertising companies, predominantly <strong>Google LLC (Google AdSense)</strong>, to serve advertisements when you visit our website. In compliance with Google Publisher Policies, we provide the following required disclosures:
        </p>
        <div className="p-5 rounded-lg bg-blue-50/50 border border-blue-200 space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Third-Party Vendor Cookies:</strong> Google, as a third-party vendor, uses cookies, web beacons, and unique identifiers to serve advertisements on PULSE Entertainment.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Personalized Advertising:</strong> Google&apos;s use of advertising cookies (such as the DoubleClick cookie) enables it and its certified ad partners to serve ads to our users based on their prior visits to our site and/or other sites across the Internet.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="mb-1">
                <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising at any time by visiting:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline font-medium hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <span>Google Ads Settings</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline font-medium hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <span>Digital Advertising Alliance (AboutAds Choice Tool)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youronlinechoices.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline font-medium hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <span>European Interactive Digital Advertising Alliance (EDAA - For EU users)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Cookies, Web Beacons & Log Files */}
      <section className="space-y-4 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600" />
          2. Log Files & Tracking Technologies
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Like virtually all standard web platforms, PULSE Entertainment utilizes standard log files and modern edge caching. Information collected inside log files includes:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
          <li>Internet Protocol (IP) addresses (anonymized for analytical assessment);</li>
          <li>Browser type, language, and operating system;</li>
          <li>Internet Service Provider (ISP);</li>
          <li>Date and time stamps of site requests;</li>
          <li>Referring and exit pages;</li>
          <li>Number of pageviews and reading duration per article.</li>
        </ul>
        <p className="text-xs text-gray-500">
          These log entries are not linked to any information that is personally identifiable. They are processed solely for site performance optimization, diagnosing server latency, administering the platform, and monitoring traffic authenticity.
        </p>
      </section>

      {/* 3. Analytics Tools (Google Analytics 4) */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          3. Web Analytics (Google Analytics 4)
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We use Google Analytics 4 (GA4) to understand reader interests across our entertainment and sports coverage. Google Analytics uses first-party cookies to track aggregated visitor metrics. You can prevent Google Analytics from recording your browsing activity across all websites by installing the{' '}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Google Analytics Opt-out Browser Add-on
          </a>.
        </p>
      </section>

      {/* 4. Information You Provide Voluntarily */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">4. Information You Voluntarily Provide</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            You are free to explore and read all articles, sports analyses, and archives on PULSE Entertainment without registering or disclosing any personal details.
          </p>
          <p>
            When you post a comment or submit an inquiry through our Contact Form, you may provide your name and email address. We use this information solely to display your public comment or respond to your inquiry. We never sell, lease, or monetize your contact details with external data brokers.
          </p>
        </div>
      </section>

      {/* 5. GDPR Compliance (EEA & UK Users) */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">5. GDPR Compliance & European Privacy Rights</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          If you reside in the European Economic Area (EEA) or the United Kingdom, you hold fundamental data protection rights under the General Data Protection Regulation (GDPR):
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
          <li><strong>The Right to Access:</strong> You may request copies of personal data stored about you;</li>
          <li><strong>The Right to Rectification:</strong> You may request correction of inaccurate information;</li>
          <li><strong>The Right to Erasure:</strong> You may request that we delete your stored comments or inquiries;</li>
          <li><strong>The Right to Restrict or Object to Processing:</strong> You may restrict or object to how we process your data;</li>
          <li><strong>The Right to Data Portability:</strong> You may request transfer of your data to another organization.</li>
        </ul>
        <p className="text-xs text-gray-500">
          To exercise any of these rights, email us at <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 underline">hieucv2004@gmail.com</a>. We will respond within 30 days.
        </p>
      </section>

      {/* 6. CCPA / CPRA Compliance (California Residents) */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">6. California Consumer Privacy Rights (CCPA / CPRA)</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Under the California Consumer Privacy Act as amended by the CPRA, California residents possess specific privacy rights:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
          <li><strong>Right to Know & Access:</strong> The right to request disclosure of personal information collected and shared over the prior 12 months;</li>
          <li><strong>Right to Deletion:</strong> The right to request deletion of personal information held by us;</li>
          <li><strong>Right to Opt-Out of Sale or Sharing:</strong> We do not sell personal information for monetary value. You can manage cookies via our cookie settings or browser controls;</li>
          <li><strong>Right to Non-Discrimination:</strong> We do not discriminate against readers who exercise their privacy rights.</li>
        </ul>
      </section>

      {/* 7. Children's Online Privacy Protection (COPPA) */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">7. Children&apos;s Online Privacy Protection Act (COPPA)</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Protecting the safety of children online is an absolute priority. PULSE Entertainment does not knowingly collect or solicit any personally identifiable information from children under the age of 13. If you believe your child has submitted personal details on our site, please contact us immediately at <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 underline">hieucv2004@gmail.com</a>, and we will promptly remove such records from our databases.
        </p>
      </section>

      {/* 8. Data Security & Storage */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">8. Data Security & Encryption</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We implement industry-standard administrative and technological safeguards to prevent unauthorized data exposure, alteration, or interception. All data transmission across PULSE Entertainment is encrypted using Modern Transport Layer Security (TLS/HTTPS).
        </p>
      </section>

      {/* 9. Contact Our Data Protection Officer */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          9. Privacy Inquiries & Contact Details
        </h2>
        <p className="text-sm text-gray-600">
          For any questions regarding this Privacy Policy, your rights, or our advertising disclosures, please contact:
        </p>
        <div className="p-4 rounded-md bg-gray-50 border border-gray-200 text-xs space-y-1 text-gray-700">
          <p className="font-bold text-gray-900">PULSE Entertainment — Privacy Desk</p>
          <p>Official Website: <a href="https://www.pulseetm.click" className="text-blue-600 hover:underline">https://www.pulseetm.click</a></p>
          <p>Compliance Inquiries: <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 hover:underline">hieucv2004@gmail.com</a></p>
          <p>
            Contact Form:{' '}
            <Link href="/contact" className="text-blue-600 hover:underline font-medium">
              Submit via Online Desk
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
