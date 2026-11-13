import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, Scale, ShieldAlert, Video, Award, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer & Editorial Disclosures | PULSE Entertainment',
  description:
    'Editorial disclaimer, Fair Use notice under 17 U.S. Code § 107, sports analysis commentary, and Google AdSense programmatic advertising disclosures for PULSE Entertainment.',
};

export default function DisclaimerPage() {
  const lastUpdated = 'November 13, 2026';

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
      <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
        <p className="text-sm text-gray-700 leading-relaxed">
          The information, cultural retrospectives, sports tactical analyses, and commentary provided on <strong>PULSE Entertainment</strong> (accessible at <strong>https://www.pulseetm.click</strong>) are published in good faith for general informational, educational, and leisure entertainment purposes only.
        </p>
      </div>

      {/* 1. Commentary & Archival Purpose */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          1. Commentary, Archival & Journalistic Purpose
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          PULSE Entertainment provides retrospective journalism and commentary covering three primary domains:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
          <li><strong>Pop Culture & Entertainment:</strong> Television awards (Emmys), industry developments, drama series reviews, and casting retrospectives.</li>
          <li><strong>Sports Retrospectives & Tactical Analysis:</strong> In-depth historical breakdowns of memorable football encounters, tactical diagrams, and managerial analysis.</li>
          <li><strong>Classic Television & Comedy Archives:</strong> Archival documentation and preservation of vintage variety shows, sketches from <em>The Carol Burnett Show</em>, and comedy legends such as Tim Conway and Harvey Korman.</li>
        </ul>
        <p className="text-xs text-gray-500">
          All opinions and analyses expressed in published articles are those of our contributing writers and do not represent professional financial, legal, or athletic coaching advice.
        </p>
      </section>

      {/* 2. Fair Use Copyright Notice */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          2. Fair Use Copyright Notice (17 U.S. Code § 107)
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          This website references archival stills, broadcast screenshots, and classic television excerpts. Such third-party copyrighted materials are referenced under the <strong>Fair Use Doctrine</strong> (17 U.S. Code § 107) for transformative purposes of:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded border border-gray-200">
            <span className="font-bold text-gray-900">Criticism & Cultural Commentary:</span>
            <p className="text-gray-600 mt-1">Analyzing comedy timing, television history, and narrative structure.</p>
          </div>
          <div className="p-3 bg-gray-50 rounded border border-gray-200">
            <span className="font-bold text-gray-900">Historical & Educational Preservation:</span>
            <p className="text-gray-600 mt-1">Documenting broadcast dates, backstage anecdotes, and sketch origins for future generations.</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          No copyright infringement is intended. If you are the legal copyright owner of any material featured on our site and wish for it to be removed or credited differently, please contact our designated Copyright Desk at <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 underline">hieucv2004@gmail.com</a>.
        </p>
      </section>

      {/* 3. Advertising & Google AdSense Disclosures */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-blue-600" />
          3. Advertising & Programmatic Monetization (Google AdSense)
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          PULSE Entertainment displays automated digital advertisements served by third-party ad networks, notably <strong>Google AdSense</strong>.
        </p>
        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-2">
          <p>
            <strong>Automated Placement:</strong> Advertisements presented across our pages are generated programmatically by Google ad algorithms based on context and reader demographics.
          </p>
          <p>
            <strong>Non-Endorsement:</strong> The display of any advertisement, product, or service does not signify an endorsement, warranty, or recommendation by PULSE Entertainment.
          </p>
          <p>
            <strong>Commercial Transactions:</strong> Any interactions or transactions between you and advertisers found on our platform are exclusively between you and the respective third party.
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
          Our articles may feature embedded video players (such as YouTube-nocookie players) and links to external websites. We do not operate, inspect, or guarantee the privacy policies, availability, or accuracy of third-party platforms. Following any external link is done at your own discretion and risk.
        </p>
      </section>

      {/* 5. Errors and Omissions / Corrections */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">5. Accuracy, Timeliness & Corrections Policy</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          While our editorial team endeavors to ensure the factual accuracy of historical dates, sports scores, and celebrity biographies at the time of publication, errors, typos, or outdated facts may occasionally occur. We make no guarantees regarding complete timeliness or exhaustive accuracy.
        </p>
        <p className="text-xs text-gray-500">
          We maintain an active corrections policy. If you spot a factual error in any of our articles, please report it to our team at <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 underline">hieucv2004@gmail.com</a>.
        </p>
      </section>

      {/* 6. Contact Section */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          6. Legal & Editorial Contact
        </h2>
        <p className="text-sm text-gray-600">
          For inquiries concerning this disclaimer, rights management, or editorial policies:
        </p>
        <div className="p-4 rounded-md bg-gray-50 border border-gray-200 text-xs space-y-1 text-gray-700">
          <p className="font-bold text-gray-900">PULSE Entertainment</p>
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
