import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | PULSE Entertainment',
  description:
    'Terms of Service, intellectual property policies, DMCA notice, and conditions of use for PULSE Entertainment.',
  alternates: {
    canonical: 'https://www.pulseetm.click/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-neutral-300 space-y-8 leading-relaxed text-[15px]">
      <div>
        <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mt-2">
          Terms of Service
        </h1>
        <p className="text-xs text-neutral-400 mt-2">
          Effective Date: January 1, 2026 • Last Revised: September 20, 2026
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
        <p>
          By accessing or using PULSE Entertainment (&quot;the Service&quot;), whether as a registered user or an unregistered guest, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-xl font-bold text-white">2. Intellectual Property Rights</h2>
        <p>
          All original editorial text, analysis, visual design, software, and arrangement on PULSE Entertainment are the exclusive property of PULSE Entertainment (founded and published by Hieu Truong) and are protected by copyright, trademark, and intellectual property laws.
        </p>
        <p>
          Movie stills, promotional television materials, and album covers featured on this site are utilized in accordance with the <strong>Fair Use Doctrine</strong> (17 U.S. Code § 107) for purposes of criticism, commentary, news reporting, scholarship, and research.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-xl font-bold text-white">3. Digital Millennium Copyright Act (DMCA) Notice</h2>
        <p>
          We respect the intellectual property rights of others. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement under the Digital Millennium Copyright Act (DMCA), please notify our designated Copyright Agent with:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-xs">
          <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
          <li>Identification of the copyrighted work claimed to have been infringed.</li>
          <li>Identification of the material that is claimed to be infringing and its exact URL.</li>
          <li>Your contact information including address, telephone number, and email.</li>
          <li>A statement made under penalty of perjury that the information provided is accurate.</li>
        </ul>
        <p className="text-xs">
          DMCA notices must be sent to: <a href="mailto:dmca@pulseetm.click" className="text-brand-400 underline">dmca@pulseetm.click</a>.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-xl font-bold text-white">4. User Comments & Conduct</h2>
        <p>
          Users who sign in with Google may participate in article comment sections. You agree not to post comments that are defamatory, abusive, harassing, obscene, hateful, or that violate third-party intellectual property or privacy rights. We reserve the absolute right to remove any comment without prior notice.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-xl font-bold text-white">5. Governing Law & Jurisdiction</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
        </p>
      </section>
    </div>
  );
}
