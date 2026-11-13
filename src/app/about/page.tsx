import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, FileCheck, Mail, Globe, Sparkles, BookOpen, Tv, Trophy, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & Editorial Standards | PULSE Entertainment',
  description:
    'Learn about PULSE Entertainment: Dedicated to thoughtful cultural journalism, sports tactical analysis, television awards coverage, and classic variety comedy archives.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>About Our Publication</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          About PULSE Entertainment
        </h1>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          PULSE Entertainment is an independent digital magazine and cultural archive dedicated to deep-dive journalism across three core disciplines: modern entertainment storytelling, comprehensive sports tactical analysis, and the preservation of classic American television comedy.
        </p>
      </div>

      {/* Editorial Pillars (3 Core Categories) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-blue-600">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Our Three Editorial Pillars
          </h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Unlike generic news aggregators, PULSE Entertainment focuses on long-form, well-researched retrospectives that provide lasting value to readers:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Entertainment */}
          <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Tv className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Pop Culture & Television
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Comprehensive retrospectives of television milestone events, prestigious awards ceremonies (Emmy Awards recaps, fashion breakdowns), and in-depth profiles of contemporary creators and standout series.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link href="/entertainment" className="text-xs font-semibold text-blue-600 hover:underline">
                Explore Entertainment Stories →
              </Link>
            </div>
          </div>

          {/* Pillar 2: Sports Analysis */}
          <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Sports Tactical Analysis
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Analytical deep-dives into European football history, Champions League tactical masterpieces, managerial philosophies (such as Zinedine Zidane&apos;s system), and unforgettable comebacks dissected step-by-step.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link href="/sport" className="text-xs font-semibold text-blue-600 hover:underline">
                Explore Sports Analyses →
              </Link>
            </div>
          </div>

          {/* Pillar 3: Classic Comedy */}
          <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Classic Comedy Preservation
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Documenting the golden age of variety television, legendary sketches from <em>The Carol Burnett Show</em>, iconic impromptu moments by Tim Conway and Harvey Korman, and classic slapstick masterclasses.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link href="/comedy" className="text-xs font-semibold text-blue-600 hover:underline">
                Explore Comedy Archives →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Standards & Fact-Checking Policy */}
      <section id="editorial-standards" className="p-6 sm:p-8 rounded-lg bg-gray-50 border border-gray-200 space-y-5">
        <div className="flex items-center gap-2 text-blue-600">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="text-xl font-bold text-gray-900">
            Editorial Integrity & Fact-Checking Methodology
          </h2>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          At PULSE Entertainment, every published article undergoes rigorous verification against verified historical and athletic databases:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600 pt-2">
          <div className="p-4 bg-white rounded border border-gray-200 space-y-1">
            <h4 className="font-bold text-gray-900">Primary Source Verification</h4>
            <p>Air dates, award voting statistics, and match tactical timelines are verified against official broadcast databases (Television Academy records, UEFA official match logs).</p>
          </div>
          <div className="p-4 bg-white rounded border border-gray-200 space-y-1">
            <h4 className="font-bold text-gray-900">Originality & Human Oversight</h4>
            <p>Our retrospectives are structured to provide unique analytical commentary, context, and structural breakdown, avoiding generic syndicated copies.</p>
          </div>
          <div className="p-4 bg-white rounded border border-gray-200 space-y-1">
            <h4 className="font-bold text-gray-900">Ethical Media Attribution</h4>
            <p>Images and video players adhere strictly to ethical licensing guidelines (Unsplash, Wikimedia Commons, Fair Use archival stills) with accurate alt descriptions.</p>
          </div>
          <div className="p-4 bg-white rounded border border-gray-200 space-y-1">
            <h4 className="font-bold text-gray-900">Rapid Corrections Policy</h4>
            <p>Factual discrepancies reported by readers are reviewed and updated within 24 to 48 hours to maintain high journalistic trust.</p>
          </div>
        </div>
      </section>

      {/* Reader-Centric Experience */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Reader-Centric Reading Experience
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          We believe reading thoughtful cultural commentary should be an enjoyable, uncluttered experience. That is why PULSE Entertainment is built on high-performance edge infrastructure with zero disruptive full-screen takeovers, clean typography, and fast page load speeds.
        </p>
      </section>

      {/* Contact Notice */}
      <section className="p-6 rounded-lg bg-gray-50 border border-gray-200 text-center space-y-2">
        <h3 className="text-base font-bold text-gray-900">Connect with the Editorial Desk</h3>
        <p className="text-xs text-gray-600 max-w-lg mx-auto leading-relaxed">
          Have an archival tip, television story suggestion, or editorial correction? Reach out directly to our team at{' '}
          <a href="mailto:hieucv2004@gmail.com" className="text-blue-600 underline font-medium hover:text-blue-800">
            hieucv2004@gmail.com
          </a>{' '}
          or submit a message via our{' '}
          <Link href="/contact" className="text-blue-600 underline hover:text-blue-800 font-medium">
            Contact Desk
          </Link>.
        </p>
      </section>
    </div>
  );
}
