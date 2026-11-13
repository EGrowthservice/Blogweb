import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, AlertTriangle, Scale, Mail, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | PULSE Entertainment',
  description:
    'Comprehensive Terms of Service, editorial conditions of use, intellectual property rights, community rules, and DMCA notice procedures for PULSE Entertainment.',
};

export default function TermsOfServicePage() {
  const lastUpdated = 'November 13, 2026';
  const effectiveDate = 'January 1, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-700 space-y-10 leading-relaxed text-[15px]">
      {/* Page Header */}
      <div className="pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Effective Date: {effectiveDate} • Last Revised: {lastUpdated}
        </p>
      </div>

      {/* Introduction Card */}
      <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
        <p className="text-sm text-gray-700 leading-relaxed">
          Welcome to <strong>PULSE Entertainment</strong> (&quot;PULSE,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;the Service&quot;), accessible via <strong>https://www.pulseetm.click</strong>. These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;Visitor,&quot; or &quot;Reader&quot;) and PULSE Entertainment regarding your access to and use of our digital publication, entertainment journalism, sports tactical analyses, and archival retrospectives.
        </p>
        <p className="text-xs text-gray-500">
          By accessing, reading, or interacting with any portion of our site, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must immediately cease accessing the Service.
        </p>
      </div>

      {/* 1. Acceptance & Eligibility */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          1. Acceptance of Terms & Reader Eligibility
        </h2>
        <p className="text-sm text-gray-600">
          By accessing PULSE Entertainment, you represent and warrant that you are at least 13 years of age (or 16 years of age in the European Economic Area / UK), or that you possess legal parental or guardian consent to use the website under applicable jurisdiction laws.
        </p>
        <p className="text-sm text-gray-600">
          Our publication is designed for personal, non-commercial educational, informational, and leisure enjoyment. Any unauthorized automated scraping, extraction, or commercial re-syndication without explicit prior written authorization is strictly prohibited.
        </p>
      </section>

      {/* 2. Editorial Scope & Transformative Commentary */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          2. Intellectual Property & Fair Use Doctrine
        </h2>
        <p className="text-sm text-gray-600">
          All original written prose, editorial commentary, tactical diagrams, retrospective outlines, headlines, brand trademarks, and site design on PULSE Entertainment are protected by applicable national and international copyright and intellectual property laws.
        </p>
        <div className="p-4 rounded-md bg-blue-50/60 border border-blue-200 text-xs text-blue-900 space-y-2">
          <p className="font-semibold">Fair Use Notice (17 U.S. Code § 107):</p>
          <p className="leading-relaxed">
            Historical television clips, classic sketch stills, production photographs, and athletic match imagery referenced throughout our retrospectives are incorporated in accordance with the <strong>Fair Use Doctrine</strong> (17 U.S.C. § 107) for transformative, non-profit educational purposes of criticism, cultural commentary, historical preservation, and journalistic review. All third-party registered trademarks, program names, and broadcast footage remain the property of their respective copyright holders.
          </p>
        </div>
      </section>

      {/* 3. DMCA Copyright Agent & Takedown Procedure */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-blue-600" />
          3. DMCA Notice & Copyright Agent Takedown Procedure
        </h2>
        <p className="text-sm text-gray-600">
          PULSE Entertainment respects the intellectual property rights of creators and adheres to the Digital Millennium Copyright Act (17 U.S.C. § 512). If you believe your copyrighted work has been utilized on our site in a manner that constitutes infringement, please submit a formal written notice to our designated Copyright Agent:
        </p>
        <div className="p-5 rounded-md bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-2">
          <p className="font-bold text-gray-900 text-sm">Designated Copyright Agent:</p>
          <p><strong>Entity:</strong> PULSE Entertainment Editorial Compliance Desk</p>
          <p><strong>Designated Email:</strong> <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 underline font-medium">hieucv2004@gmail.com</a></p>
          <p><strong>Response Turnaround:</strong> 24 to 48 business hours upon receipt of formal notification.</p>
        </div>
        <p className="text-xs text-gray-600 font-medium pt-1">
          To ensure prompt evaluation under 17 U.S.C. § 512(c)(3), your notice must include:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs text-gray-600">
          <li>A physical or electronic signature of the copyright owner or authorized representative;</li>
          <li>Identification of the copyrighted work claimed to have been infringed;</li>
          <li>The exact URL link(s) on our site where the alleged infringing material is located;</li>
          <li>Your direct contact information (name, physical address, telephone number, and email);</li>
          <li>A statement affirming your good-faith belief that the disputed use is not authorized by the copyright owner, agent, or the law;</li>
          <li>A sworn statement, made under penalty of perjury, that the information in the notification is accurate and that you are authorized to act on behalf of the owner.</li>
        </ol>
      </section>

      {/* 4. Community Guidelines & Comments */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">4. Community Comments & User Contributions</h2>
        <p className="text-sm text-gray-600">
          PULSE Entertainment enables reader discussions and commentary on articles. By submitting a comment or reaction, you grant PULSE Entertainment a perpetual, royalty-free, non-exclusive license to display, archive, and moderate such content.
        </p>
        <p className="text-sm text-gray-600">
          When participating in discussions, you agree not to post:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
          <li>Defamatory, obscene, abusive, discriminatory, or harassing statements;</li>
          <li>Commercial solicitations, affiliate links, automated spam, or chain messages;</li>
          <li>Private personally identifiable information of third parties without consent;</li>
          <li>Malicious scripts, viruses, or code designed to interfere with website operation.</li>
        </ul>
        <p className="text-xs text-gray-500">
          We maintain absolute discretion to review, edit, or remove any comment that violates these guidelines without prior notice.
        </p>
      </section>

      {/* 5. Programmatic Advertising & Third-Party Embeds */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">5. Third-Party Advertising & Embedded Media</h2>
        <p className="text-sm text-gray-600">
          Our publication displays automated digital advertising provided by certified third-party ad networks, including <strong>Google AdSense</strong>. Third-party advertisers are solely responsible for the content and claims of their ads. The display of an advertisement on PULSE Entertainment does not constitute an endorsement, guarantee, or sponsorship by our editorial team.
        </p>
        <p className="text-sm text-gray-600">
          Articles may contain embedded players and links to third-party services (such as YouTube or Wikimedia). PULSE Entertainment does not control the data practices, uptime, or availability of third-party platforms.
        </p>
      </section>

      {/* 6. Disclaimers of Warranties & Limitation of Liability */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">6. Disclaimers of Warranties & Limitation of Liability</h2>
        <p className="text-sm text-gray-600 uppercase text-xs font-semibold tracking-wide text-gray-800">
          Provided &quot;As Is&quot; and &quot;As Available&quot;:
        </p>
        <p className="text-xs text-gray-600 leading-relaxed">
          The Service and all materials published herein are provided strictly on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of any kind, whether express, statutory, or implied. PULSE Entertainment explicitly disclaims all implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
        </p>
        <p className="text-xs text-gray-600 leading-relaxed">
          In no event shall PULSE Entertainment, its editors, authors, or technical affiliates be liable for any indirect, consequential, incidental, special, or punitive damages arising from your access to, use of, or inability to access the website, including but not limited to loss of data, errors in published historical retrospectives, or external server downtime.
        </p>
      </section>

      {/* 7. Modifications & Termination */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">7. Modifications & Termination</h2>
        <p className="text-sm text-gray-600">
          We reserve the right to revise, update, or replace these Terms at any time. When modifications are made, the revised date at the top of this page will be updated accordingly. Continued use of the website following any changes signifies your acceptance of the updated terms.
        </p>
      </section>

      {/* 8. Contact Information */}
      <section className="space-y-3 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          8. Inquiries & Contact Information
        </h2>
        <p className="text-sm text-gray-600">
          If you have questions, feedback, or require legal clarification regarding these Terms of Service, please reach out to our team:
        </p>
        <div className="p-4 rounded-md bg-gray-50 border border-gray-200 text-xs space-y-1 text-gray-700">
          <p className="font-bold text-gray-900">PULSE Entertainment</p>
          <p>Website: <a href="https://www.pulseetm.click" className="text-blue-600 hover:underline">https://www.pulseetm.click</a></p>
          <p>Direct Inquiries: <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 hover:underline">hieucv2004@gmail.com</a></p>
          <p>
            Online Help Desk:{' '}
            <Link href="/contact" className="text-blue-600 hover:underline font-medium">
              Visit our Contact Page
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
