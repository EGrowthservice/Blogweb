'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  Copy,
  Check,
  RotateCcw,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

const SAMPLE_JSON = `{
  "site": "PULSE TechTips",
  "domain": "https://www.pulseetm.click",
  "features": [
    "Tech Tutorials",
    "Productivity Guides",
    "Digital Utilities"
  ],
  "stats": {
    "activeUsers": 15420,
    "uptime": "99.98%"
  },
  "isApproved": true
}`;

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState(SAMPLE_JSON);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleBeautify = (spaces = 2) => {
    try {
      if (!inputJson.trim()) return;
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, spaces));
      setError(null);
      setSuccessMsg(`Successfully formatted with ${spaces}-space indentation.`);
      setTimeout(() => setSuccessMsg(null), 2500);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax encountered');
    }
  };

  const handleMinify = () => {
    try {
      if (!inputJson.trim()) return;
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
      setError(null);
      setSuccessMsg('Successfully minified JSON into a single line.');
      setTimeout(() => setSuccessMsg(null), 2500);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax encountered');
    }
  };

  const handleValidate = () => {
    try {
      if (!inputJson.trim()) {
        setError('Please enter a JSON string to validate.');
        return;
      }
      JSON.parse(inputJson);
      setError(null);
      setSuccessMsg('Syntax valid! Valid RFC 8259 JSON structure.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax encountered');
    }
  };

  const handleCopy = () => {
    if (!inputJson) return;
    navigator.clipboard.writeText(inputJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleLoadSample = () => {
    setInputJson(SAMPLE_JSON);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Online Tools</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
          <Code2 className="w-3.5 h-3.5" />
          <span>Developer & Data Tools</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          JSON Formatter & Validator
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Beautify raw JSON payloads, minify whitespace for production APIs, and detect exact syntax error line offsets in compliance with RFC 8259 standards.
        </p>
      </div>

      {/* Main Formatter Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleBeautify(2)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
            >
              Beautify (2 Spaces)
            </button>
            <button
              onClick={() => handleBeautify(4)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
            >
              Beautify (4 Spaces)
            </button>
            <button
              onClick={handleMinify}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
            >
              Minify
            </button>
            <button
              onClick={handleValidate}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition"
            >
              Validate Syntax
            </button>
            <button
              onClick={handleLoadSample}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition"
            >
              Load Sample
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setInputJson('')}
              className="p-1.5 text-xs text-gray-400 hover:text-red-500 rounded-md transition"
              title="Clear editor"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1 px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-900 hover:bg-blue-600 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy JSON
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Syntax Error: </span>
              <span className="font-mono">{error}</span>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Text Area */}
        <textarea
          value={inputJson}
          onChange={(e) => {
            setInputJson(e.target.value);
            if (error) setError(null);
          }}
          rows={16}
          placeholder="Paste or type JSON data here..."
          className="w-full p-4 font-mono text-xs sm:text-sm border border-gray-300 rounded-xl bg-gray-950 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-y"
          spellCheck={false}
        />
      </div>

      {/* Developer FAQ */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-3 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Benefits of Standardized JSON Data
        </h2>
        <p>
          JSON (JavaScript Object Notation) is the ubiquitous standard data format powering modern web APIs, microservices, and client-server communication.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>
            <strong>Streamlined Debugging:</strong> Indenting object properties with 2 or 4 spaces makes hierarchical arrays and key-value relationships readily understandable.
          </li>
          <li>
            <strong>Network Bandwidth Optimization:</strong> Minification strips redundant spaces, tabs, and line breaks, reducing payload size for faster HTTP transfers.
          </li>
          <li>
            <strong>Client-Side Security:</strong> Validating JSON on your browser prevents unexpected syntax anomalies before persisting data to remote databases.
          </li>
        </ul>
      </div>
    </div>
  );
}
