'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare, CheckCircle, Shield } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mt-2">
          Contact the Newsroom
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-300">
          Have a news tip, screening invitation, press release, or advertising inquiry? Reach our editorial desk directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-brand-500" />
              Direct Editorial Inquiries
            </h3>
            <div className="space-y-3 text-xs text-neutral-300">
              <div>
                <p className="font-semibold text-white">General Inquiries:</p>
                <a href="mailto:contact@pulse-entertainment.com" className="text-brand-400 hover:underline">
                  contact@pulse-entertainment.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-white">News Tips & Leaks:</p>
                <a href="mailto:tips@pulse-entertainment.com" className="text-brand-400 hover:underline">
                  tips@pulse-entertainment.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-white">Press & Studio Screeners:</p>
                <a href="mailto:press@pulse-entertainment.com" className="text-brand-400 hover:underline">
                  press@pulse-entertainment.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-white">Advertising & Sponsorships:</p>
                <a href="mailto:ads@pulse-entertainment.com" className="text-brand-400 hover:underline">
                  ads@pulse-entertainment.com
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-500" />
              Publisher & Editorial Operations
            </h3>
            <div className="space-y-3 text-xs text-neutral-300">
              <div>
                <p className="font-semibold text-white">Publisher / Editor-in-Chief:</p>
                <p className="text-neutral-400">Hieu Truong (Trương Hiếu)</p>
              </div>
              <div>
                <p className="font-semibold text-white">Operating Model:</p>
                <p className="text-neutral-400">Independent Digital Publication</p>
                <p className="text-neutral-400">Remote Editorial Desk & Media Research</p>
              </div>
              <div>
                <p className="font-semibold text-white">Correction & Fact-Check Response:</p>
                <p className="text-neutral-400">Guaranteed review within 24–48 business hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Dispatched</h3>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A member of our editorial staff will review your message and respond within 24–48 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold font-display text-white mb-2">
                  Send a Message to Our Editors
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Department / Topic *
                  </label>
                  <select
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option>Editorial Tip / Breaking News</option>
                    <option>Film & Television Review Request</option>
                    <option>Fact-Checking / Correction</option>
                    <option>Press Screener / Screening Invitation</option>
                    <option>Advertising / Sponsorship</option>
                    <option>General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief headline or topic..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide full context, embargo dates, or details..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl shadow-lg transition"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
