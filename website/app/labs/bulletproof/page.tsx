'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { useColor } from '@/contexts/ColorContext';
import { getLabProduct, getStatusConfig } from '@/lib/labs';

export default function BulletProofPage() {
  const { color } = useColor();
  const product = getLabProduct('bulletproof');
  const statusConfig = product ? getStatusConfig(product.status) : null;

  return (
    <div className="relative min-h-screen transition-colors duration-700" style={{ background: color.bgGradient }}>
      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none -z-10" />

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Labs
          </Link>
        </motion.div>

        {/* Product header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Shield className="w-10 h-10" style={{ color: color.accent }} />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-white">BulletProof</h1>
              {statusConfig && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full border ${statusConfig.className}`}>
                  {statusConfig.label}
                </span>
              )}
            </div>
            <p className="text-neutral-400 mt-1">Harden your reports before reviewers run them through AI.</p>
          </div>
        </motion.div>

        {/* Content area */}
        <motion.div
          className="bg-white/5 backdrop-blur-md border rounded-xl p-8 md:p-12"
          style={{ borderColor: `${color.accent}20` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Your reviewers paste your report into AI and get back 15 &ldquo;concerns&rdquo; in 30 seconds.
              You spend hours defending every point. Most of it is noise they don&rsquo;t even understand themselves.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">The Fix</h2>
            <p className="text-neutral-300 leading-relaxed mb-8">
              BulletProof runs the same AI gauntlet your reviewers will &mdash; before they do.
              It simulates each reviewer based on their role and tells you exactly what they&rsquo;ll flag,
              so you can fix it or prepare a response. When their feedback arrives, paste it in and
              BulletProof separates the real issues from the AI noise.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-lg p-5 border border-white/5">
                <h3 className="text-white font-semibold mb-2">Pre-Review</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Paste your report, select who it&rsquo;s going to. Get back what each reviewer will likely flag, with suggested fixes.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-5 border border-white/5">
                <h3 className="text-white font-semibold mb-2">Post-Review</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Paste the feedback you received. BulletProof triages it: real concerns vs AI-generated noise, with draft responses.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-sm text-neutral-500 bg-white/5 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              Coming soon. Built for experienced professionals who know their stuff.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
