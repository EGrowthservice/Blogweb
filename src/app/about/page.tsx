import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, FileCheck, Mail, Globe, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Central Live & Editorial Standards',
  description:
    'About Central Live: Dedicated to preserving and celebrating classic television comedy, Tim Conway sketches, and vintage variety entertainment.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          About Central Live
        </h1>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          Dedicated to celebrating, documenting, and analyzing the golden age of American television comedy, legendary variety sketches, and the comedic brilliance of icons like <strong>Tim Conway</strong>.
        </p>
      </div>

      {/* Editorial Mission */}
      <section className="mb-10 p-6 sm:p-8 rounded-lg bg-gray-50 border border-gray-200 space-y-4">
        <div className="flex items-center gap-2 text-blue-600">
          <Award className="w-5 h-5" />
          <h2 className="text-xl font-bold text-gray-900">
            Editorial Philosophy & Mission
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          Central Live operates to serve classic entertainment fans with accurate context, deep sketch retrospectives, and timeless comedic moments:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-200 text-sm">
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Authentic Retrospectives</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              Every retrospective provides authentic historical context, broadcast dates, and backstage accounts.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Comedy Preservation</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              Preserving classic sketches from <em>The Carol Burnett Show</em>, <em>The Tonight Show</em>, and vintage television broadcasts.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Reader-Centric</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              Clean, distraction-free reading experience for comedy fans of all generations.
            </p>
          </div>
        </div>
      </section>

      {/* Fact-Checking & Sources Policy */}
      <section id="editorial-standards" className="mb-10 space-y-4">
        <div className="flex items-center gap-2 text-blue-600">
          <FileCheck className="w-5 h-5" />
          <h2 className="text-xl font-bold text-gray-900">
            Research & Source Attribution
          </h2>
        </div>
        <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
          <p>
            When recounting comedy history and broadcast lore:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 text-xs sm:text-sm">
            <li>
              <strong>Primary Television Archives:</strong> Air dates, episode references, and sketch transcripts are referenced against verified broadcast archives and official distributor records.
            </li>
            <li>
              <strong>Firsthand Memoirs & Interviews:</strong> Quotes from Tim Conway, Johnny Carson, Carol Burnett, and Harvey Korman are sourced from authenticated television interviews and published autobiographies.
            </li>
            <li>
              <strong>Corrections:</strong> If any detail is inaccurate, corrections are promptly reviewed and updated.
            </li>
          </ul>
        </div>
      </section>

      {/* Direct Contact Notice */}
      <section className="p-6 rounded-lg bg-gray-50 border border-gray-200 text-center">
        <h3 className="text-base font-bold text-gray-900 mb-1">Contact the Editorial Team</h3>
        <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
          Have an inquiry, classic TV tip, or correction? Visit our{' '}
          <Link href="/contact" className="text-blue-600 underline hover:text-blue-800">
            Contact Page
          </Link>.
        </p>
      </section>
    </div>
  );
}
