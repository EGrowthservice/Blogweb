'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 pb-6 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Contact Us
        </h1>
        <p className="mt-2 text-base text-gray-600">
          Have a question, feedback, or comedy archive suggestion? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              Editorial Inquiries
            </h3>
            <div className="space-y-3 text-xs text-gray-600">
              <div>
                <p className="font-semibold text-gray-900">General Questions:</p>
                <p className="text-blue-600">contact@centralnewlive.cfx.bz</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Archive Suggestions:</p>
                <p className="text-blue-600">tips@centralnewlive.cfx.bz</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Corrections & Feedback:</p>
                <p className="text-blue-600">corrections@centralnewlive.cfx.bz</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-500 leading-relaxed">
            Our editorial desk responds to legitimate reader inquiries and suggestions within 24 to 48 business hours.
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7">
          <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900">Message Received</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you for reaching out. We have received your inquiry and our editorial team will review it promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-1.5 text-xs text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-xs font-semibold rounded-md shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
