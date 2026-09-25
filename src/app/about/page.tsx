import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, User, CheckCircle2, FileCheck, Mail, Globe, Newspaper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About the Publisher & Editorial Standards | PULSE Entertainment',
  description:
    'Meet Hieu Truong (Trương Hiếu), Founder and Solo Publisher of PULSE Entertainment. Learn about our fact-checking methodology, editorial ethics, and commitment to cultural journalism.',
  alternates: {
    canonical: 'https://pulse-entertainment.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
          Independent Journalism
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mt-2">
          About PULSE Entertainment
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
          An independent digital publication founded, curated, and maintained by <strong>Hieu Truong (Trương Hiếu)</strong>, dedicated to delivering incisive film reviews, streaming television analysis, pop culture reporting, and gaming retrospectives.
        </p>
      </div>

      {/* Solo Publisher Profile (E-E-A-T Foundation) */}
      <section className="mb-16 p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-neutral-800">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden shrink-0 ring-4 ring-brand-500/40 shadow-2xl mx-auto md:mx-0">
            <Image
              src="https://lh3.googleusercontent.com/a/ACg8ocJSndp72J434Ex43jha0qklWhM3b8duc60X4ma-NSz3SQjDzg=s192-c"
              alt="Hieu Truong (Trương Hiếu) - Founder & Solo Publisher"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-600/90 text-white">
                Founder & Solo Publisher
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Verified Independent Journalist
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Hieu Truong (Trương Hiếu)
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Hello, I am Hieu Truong—an avid cultural analyst, film enthusiast, and software engineer who founded PULSE Entertainment to bridge the gap between fast-moving Hollywood news cycles and thoughtful, human-curated cultural criticism.
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              In an internet ecosystem overwhelmed by clickbait and automated regurgitation, I operate PULSE Entertainment as a focused, one-person publication. Every analysis, review, and report on this website is personally researched, fact-checked, and written by me, adhering strictly to journalistic ethics and verified primary sources.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-300">
              <a
                href="mailto:contact@pulse-entertainment.com"
                className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 underline"
              >
                <Mail className="w-3.5 h-3.5" />
                contact@pulse-entertainment.com
              </a>
              <span className="text-neutral-600">•</span>
              <span className="flex items-center gap-1.5 text-neutral-400">
                <Globe className="w-3.5 h-3.5" />
                Global / US Edition Coverage
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Mission */}
      <section className="mb-16 p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-3 text-brand-500">
          <Award className="w-6 h-6" />
          <h2 className="text-2xl font-bold font-display text-white">
            Editorial Philosophy & Standards
          </h2>
        </div>
        <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
          PULSE Entertainment operates under three unwavering pillars designed to serve reader curiosity with integrity and rigor:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-neutral-800 text-sm">
          <div>
            <h4 className="font-bold text-white mb-1">Human Curation</h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              No generic robotic articles. Each story offers distinct analytical perspective, historical context, and critical reflection.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">100% Fact-Checked</h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Every casting update, box office figure, and studio statement is cross-referenced with primary trade records and studio releases.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">Zero Commercial Bias</h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Editorial ratings and critiques are entirely independent. Studios, advertisers, and public relations firms have zero sway over reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Fact-Checking & Primary Sources Policy */}
      <section id="editorial-standards" className="mb-16 space-y-6">
        <div className="flex items-center gap-3 text-brand-500">
          <FileCheck className="w-6 h-6" />
          <h2 className="text-2xl font-bold font-display text-white">
            Fact-Checking Methodology & Source Attribution
          </h2>
        </div>
        <div className="text-sm text-neutral-300 space-y-4 leading-relaxed">
          <p>
            Accuracy is paramount. When reporting on cinema, streaming developments, celebrity culture, music, and gaming:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-300 text-xs sm:text-sm">
            <li>
              <strong>Primary Source Attribution:</strong> All reports attribute data to authoritative industry publications—including <em>Variety, The Hollywood Reporter, Deadline, Billboard, IGN, Box Office Mojo,</em> and official studio communications.
            </li>
            <li>
              <strong>Verified Numbers:</strong> Box office metrics, streaming viewership milestones, and album sales are audited against official RIAA, Comscore, and Nielsen reports.
            </li>
            <li>
              <strong>Corrections Policy:</strong> If any factual ambiguity or error is identified, a prompt correction note is appended with the revision timestamp. Readers can submit inquiries directly via our{' '}
              <Link href="/contact" className="text-brand-400 underline hover:text-white">
                Contact Page
              </Link>.
            </li>
          </ul>
        </div>
      </section>

      {/* Direct Contact Notice */}
      <section className="p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 text-center">
        <h3 className="text-lg font-bold text-white mb-2">Connect with the Publisher</h3>
        <p className="text-xs text-neutral-400 max-w-lg mx-auto leading-relaxed">
          Have an editorial tip, feedback, correction, or press inquiry? Send a note directly through our{' '}
          <Link href="/contact" className="text-brand-400 underline hover:text-white">
            Contact Form
          </Link>{' '}
          or reach out at <a href="mailto:contact@pulse-entertainment.com" className="text-brand-400 underline">contact@pulse-entertainment.com</a>.
        </p>
      </section>
    </div>
  );
}
