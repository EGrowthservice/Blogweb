import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, Users, CheckCircle2, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & Editorial Standards | PULSE Entertainment',
  description:
    'Learn about PULSE Entertainment, our editorial ethics, fact-checking methodology, and meet our team of veteran Hollywood journalists.',
  alternates: {
    canonical: 'https://pulse-entertainment.com/about',
  },
};

const TEAM_MEMBERS = [
  {
    name: 'Marcus Vance',
    role: 'Editor-in-Chief & Senior Film Critic',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Marcus has covered the Hollywood film industry for over 12 years. Former contributor to Variety and The Hollywood Reporter. Member of the Los Angeles Film Critics Association.',
  },
  {
    name: 'Elena Rostova',
    role: 'Executive Television Editor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    bio: 'Elena is a Los Angeles-based culture journalist covering prestige TV, streaming economics, and Emmy campaigns. She holds a Master’s degree from Columbia Journalism School.',
  },
  {
    name: 'Chloe Davenport',
    role: 'Senior Pop Culture & Style Columnist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    bio: 'Chloe reports on celebrity culture, red carpet fashion, and digital trends from New York City. She has reported on the ground from the Met Gala, NYFW, and Cannes.',
  },
  {
    name: 'Jordan Cruz',
    role: 'Gaming & Interactive Tech Lead',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Jordan has spent 9 years reviewing gaming hardware, AAA blockbusters, and esports tournaments across North America.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
          Who We Are
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mt-2">
          Independent Cultural Journalism for the Modern Era
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
          PULSE Entertainment is a premier digital publication providing incisive film reviews, television reporting, celebrity profiles, and gaming analysis to readers across the United States and globally.
        </p>
      </div>

      {/* Editorial Mission */}
      <section className="mb-16 p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-3 text-brand-500">
          <Award className="w-6 h-6" />
          <h2 className="text-2xl font-bold font-display text-white">
            Our Editorial Mission
          </h2>
        </div>
        <p className="text-neutral-300 leading-relaxed">
          Founded with a commitment to critical rigor and journalistic transparency, PULSE Entertainment bridges the gap between Hollywood insider knowledge and passionate cultural consumers. We believe entertainment journalism should be thoughtful, fair, and uncompromising in its pursuit of facts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-neutral-800 text-sm">
          <div>
            <h4 className="font-bold text-white mb-1">Original Reporting</h4>
            <p className="text-neutral-400 text-xs">
              Every analysis, interview, and review is researched, verified, and written by experienced industry journalists.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">Strict Independence</h4>
            <p className="text-neutral-400 text-xs">
              Our editorial opinions cannot be bought. Advertising partners and studios have zero influence over our ratings and reviews.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">E-E-A-T Adherence</h4>
            <p className="text-neutral-400 text-xs">
              We uphold Google’s highest standards for Experience, Expertise, Authoritativeness, and Trustworthiness.
            </p>
          </div>
        </div>
      </section>

      {/* Fact-Checking & Corrections Policy */}
      <section id="editorial-standards" className="mb-16 space-y-6">
        <div className="flex items-center gap-3 text-brand-500">
          <FileCheck className="w-6 h-6" />
          <h2 className="text-2xl font-bold font-display text-white">
            Fact-Checking & Corrections Policy
          </h2>
        </div>
        <div className="text-sm text-neutral-300 space-y-4 leading-relaxed">
          <p>
            At PULSE Entertainment, accuracy is our highest priority. Before any story is published:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-300">
            <li>
              <strong>Primary Source Verification:</strong> All reporting regarding casting, box office figures, and studio developments must be verified through studio representatives, primary documentation, or on-the-record sources.
            </li>
            <li>
              <strong>Independent Review:</strong> Film and television reviews reflect the genuine critical assessment of our designated critics following verified theatrical screenings or press screeners.
            </li>
            <li>
              <strong>Corrections Transparency:</strong> If a factual error occurs, we issue a clear correction notice at the top or bottom of the article detailing the date and nature of the correction. Readers can submit correction tips to{' '}
              <a href="mailto:corrections@pulse-entertainment.com" className="text-brand-400 underline">
                corrections@pulse-entertainment.com
              </a>.
            </li>
          </ul>
        </div>
      </section>

      {/* The Masthead / Team */}
      <section className="mb-16">
        <div className="flex items-center gap-3 text-brand-500 mb-8">
          <Users className="w-6 h-6" />
          <h2 className="text-2xl font-bold font-display text-white">
            The Editorial Masthead
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex gap-5 items-start"
            >
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 ring-2 ring-brand-500/40">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-white">{member.name}</h3>
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                </div>
                <p className="text-xs text-brand-400 font-semibold">{member.role}</p>
                <p className="text-xs text-neutral-400 pt-1 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Office Locations */}
      <section className="p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 text-center">
        <h3 className="text-lg font-bold text-white mb-2">PULSE Entertainment Newsroom</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Editorial Bureaus located in Los Angeles, California and New York City, New York. For press releases and inquiries, please visit our{' '}
          <Link href="/contact" className="text-brand-400 underline">
            Contact Page
          </Link>.
        </p>
      </section>
    </div>
  );
}
