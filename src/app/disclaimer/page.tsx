import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, Scale, ShieldAlert, Video, Award, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer & Editorial Disclosures | PULSE TechTips',
  description:
    'Technical guide disclaimer, software execution notices, and programmatic advertising disclosures for PULSE TechTips.',
};

export default function DisclaimerPage() {
  const lastUpdated = 'November 16, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-700 space-y-10 leading-relaxed text-[15px]">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
          <AlertCircle className="w-4 h-4" />
          <span>Editorial Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Disclaimer & Editorial Disclosures
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Intro Card */}
      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
        <p className="text-sm text-gray-700 leading-relaxed">
          The tutorials, technical troubleshooting instructions, software guides, and browser utilities provided on <strong>PULSE TechTips</strong> (accessible at <strong>https://www.pulseetm.click</strong>) are published in good faith for general educational, practical troubleshooting, and computing productivity purposes only.
        </p>
      </div>

      {/* 1. Technical Guides & Educational Utility Purpose */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          1. Technical Guides & Computing Utility Scope
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          PULSE TechTips publishes verified step-by-step technological guides across four core domains:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
          <li><strong>Computer & Operating System Tips:</strong> Windows 11/10 and macOS performance tuning, disk space liberation, keyboard shortcuts, and driver error diagnosis.</li>
          <li><strong>Mobile Devices & Privacy:</strong> Smartphone battery health preservation, Android cache maintenance, and multi-factor authentication security setups.</li>
          <li><strong>Office Productivity:</strong> Advanced Microsoft Excel spreadsheet formulas (XLOOKUP, SUMIFS, Pivot Tables), Word document formatting, and automation scripts.</li>
          <li><strong>Online Browser Utilities:</strong> Instant client-side browser tools for URL shortening, text case transforms, cryptographic password creation, QR code generation, and JSON formatting.</li>
        </ul>
        <p className="text-xs text-gray-500">
          While all steps and terminal commands are thoroughly tested before publication, readers execute system-level alterations, command-line scripts, and software updates at their own risk. We strongly recommend maintaining recent system backups before undertaking major operating system changes.
        </p>
      </section>

      {/* 2. Software Brands & Fair Use Copyright Notice */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          2. Trademarks & Fair Use Notice (17 U.S. Code § 107)
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Product names, logos, brands, and software trademarks referenced on this website (such as Microsoft Windows, Apple iOS, macOS, Android, Microsoft Excel) belong exclusively to their respective owners. Their mention on PULSE TechTips is strictly for nominative identification, educational commentary, and instructional tutorial purposes under the <strong>Fair Use Doctrine</strong> (17 U.S. Code § 107).
        </p>
        <p className="text-xs text-gray-500">
          No endorsement, sponsorship, or affiliation with trademark holders is implied. For copyright concerns or attribution corrections, please contact our Editorial Desk at <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 underline">hieucv2004@gmail.com</a>.
        </p>
      </section>

      {/* 3. Advertising & Google AdSense Disclosures */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-blue-600" />
          3. Programmatic Advertising Disclosures (Google AdSense)
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          PULSE TechTips displays automated digital advertisements served by third-party ad networks, primarily <strong>Google AdSense</strong>. In compliance with Google AdSense program policies:
        </p>
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-2">
          <p>
            <strong>Automated Placement:</strong> Advertisements presented across our pages are delivered programmatically by Google ad algorithms based on context and user interest categories.
          </p>
          <p>
            <strong>Non-Endorsement:</strong> The appearance of an advertisement, software tool, or commercial service does not represent an endorsement, warranty, or recommendation by PULSE TechTips.
          </p>
          <p>
            <strong>Cookie Opt-Out:</strong> Third-party vendors, including Google, use cookies to serve ads based on prior visits. Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">aboutads.info</a>.
          </p>
        </div>
      </section>

      {/* 4. External Links & Video Embeds */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Video className="w-5 h-5 text-blue-600" />
          4. External Links & Video Embeds
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Our tutorials may incorporate verified video embeds from official educational providers (such as YouTube-nocookie players) and links to external software download portals. PULSE TechTips does not operate, control, or warrant external platforms. Following any external hyperlink is undertaken at the user&apos;s sole discretion.
        </p>
      </section>

      {/* 5. Corrections Policy */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">5. Technical Accuracy & Corrections Policy</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Operating system software builds and application APIs frequently evolve. When an OS update alters a setting location or command argument, our editorial desk promptly updates the affected guide.
        </p>
        <p className="text-xs text-gray-500">
          To submit a technical correction or suggest an updated command syntax, email our editorial desk at <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 underline">hieucv2004@gmail.com</a>.
        </p>
      </section>

      {/* 6. Legal & Editorial Contact */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          6. Legal & Editorial Contact
        </h2>
        <p className="text-sm text-gray-600">
          For inquiries concerning this disclaimer, rights management, or editorial policies:
        </p>
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1 text-gray-700">
          <p className="font-bold text-gray-900">PULSE TechTips</p>
          <p>Official Website: <a href="https://www.pulseetm.click" className="text-blue-600 hover:underline">https://www.pulseetm.click</a></p>
          <p>Editorial Inquiries: <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 hover:underline">hieucv2004@gmail.com</a></p>
          <p>
            Direct Assistance:{' '}
            <Link href="/contact" className="text-blue-600 hover:underline font-medium">
              Submit an online inquiry
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
