import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer & Fair Use Notice | PULSE Entertainment',
  description:
    'Editorial disclaimer, Fair Use notice under 17 U.S. Code § 107, and advertising disclosures for PULSE Entertainment.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-700 space-y-8 leading-relaxed text-[15px]">
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Disclaimer & Disclosures
        </h1>
        <p className="text-xs text-gray-400 mt-2">
          Last Updated: September 29, 2026
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">1. Commentary & Archival Purpose</h2>
        <p className="text-sm text-gray-600">
          The retrospective articles and commentary published on PULSE Entertainment are intended for historical, educational, and entertainment purposes. We strive to provide accurate dates, background lore, and context for classic television comedy.
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">2. Fair Use Copyright Notice (17 U.S. Code § 107)</h2>
        <p className="text-sm text-gray-600">
          This website references classic television clips, production photographs, and archival stills. Such material is utilized under the <strong>Fair Use Doctrine</strong> (17 U.S. Code § 107) for transformative cultural commentary, historical analysis, and scholarship.
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">3. Advertising Disclosures (Google AdSense)</h2>
        <p className="text-sm text-gray-600">
          PULSE Entertainment displays programmatic digital advertisements served by third-party ad networks including Google AdSense. We do not personally endorse the third-party products or services featured in automated advertising units.
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">4. External Embeds & Links</h2>
        <p className="text-sm text-gray-600">
          PULSE Entertainment contains links and embedded video players from third-party platforms (such as YouTube). We do not control or take responsibility for the uptime or policies of third-party platforms.
        </p>
      </section>
    </div>
  );
}
