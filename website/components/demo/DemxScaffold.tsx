'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'
import { useColor } from '@/contexts/ColorContext'

/* ── Types ─────────────────────────────────────────────────── */
export interface DemxScoreEntry {
  attention: number
  interest: number
  desire: number
  action: number
}

export interface DemxScores {
  [variationKey: string]: DemxScoreEntry
}

export interface DemxVariation {
  name: string
  description: string
  changes: string[]
  component: ReactNode
}

interface DemxScaffoldProps {
  title: string
  scores: DemxScores | null
  variations: Record<string, DemxVariation>
}

/* ── Score bar ─────────────────────────────────────────────── */
function ScoreBar({ label, value, max, accent }: { label: string; value: number; max: number; accent: string }) {
  const pct = (value / max) * 100
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-neutral-400 w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: accent }} />
      </div>
      <span className="text-sm font-bold text-white w-10 text-right">{value}/{max}</span>
    </div>
  )
}

/* ── Component ─────────────────────────────────────────────── */
export default function DemxScaffold({ title, scores, variations }: DemxScaffoldProps) {
  const keys = Object.keys(variations)
  const [active, setActive] = useState(keys[0])
  const { color } = useColor()

  const current = variations[active]
  const currentScore = scores?.[active] ?? null
  const total = currentScore
    ? currentScore.attention + currentScore.interest + currentScore.desire + currentScore.action
    : null

  // Find highest scorer
  let highestKey: string | null = null
  let highestTotal = -1
  if (scores) {
    for (const k of keys) {
      const s = scores[k]
      if (s) {
        const t = s.attention + s.interest + s.desire + s.action
        if (t > highestTotal) { highestTotal = t; highestKey = k }
      }
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* ── Fixed header ──────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/demo" className="text-sm text-neutral-400 hover:text-white transition-colors">
            &larr; Back to Demo
          </Link>
          <h1 className="text-sm font-bold tracking-wide" style={{ color: color.accent }}>{title}</h1>
          <div className="flex gap-1">
            {keys.map((k) => {
              const isActive = k === active
              const isHighest = k === highestKey
              return (
                <button
                  key={k}
                  onClick={() => setActive(k)}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                    isActive
                      ? 'text-black'
                      : 'text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10'
                  }`}
                  style={isActive ? { backgroundColor: color.accent } : undefined}
                >
                  {isHighest ? '\u2605 ' : ''}{k}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Live preview */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-black">
            {current.component}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Variation info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-1">{current.name}</h2>
              <p className="text-sm text-neutral-400 mb-4">{current.description}</p>
              <div className="space-y-1.5">
                {current.changes.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span style={{ color: color.accent }}>+</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AIDAX Scores */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">AIDAX Scores</h3>
              {currentScore ? (
                <div className="space-y-3">
                  <ScoreBar label="Attention" value={currentScore.attention} max={25} accent={color.accent} />
                  <ScoreBar label="Interest" value={currentScore.interest} max={25} accent={color.accent} />
                  <ScoreBar label="Desire" value={currentScore.desire} max={25} accent={color.accent} />
                  <ScoreBar label="Action" value={currentScore.action} max={25} accent={color.accent} />
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-bold text-neutral-400">Total</span>
                    <span className="text-2xl font-bold" style={{ color: color.accent }}>{total}/100</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-neutral-500 font-bold">UNSCORED</p>
                  <p className="text-xs text-neutral-600 mt-1">Render first, then AIDAX scores</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Quick comparison bar ────────────────────────── */}
        {scores && (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Quick Comparison</h3>
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${keys.length}, 1fr)` }}>
              {keys.map((k) => {
                const s = scores[k]
                const t = s ? s.attention + s.interest + s.desire + s.action : 0
                const isHighest = k === highestKey
                const isAct = k === active
                return (
                  <button
                    key={k}
                    onClick={() => setActive(k)}
                    className={`rounded-lg p-4 text-center transition-all border ${
                      isAct ? 'border-white/30 bg-white/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'
                    }`}
                  >
                    <div className="text-xs text-neutral-400 mb-1">
                      {isHighest ? '\u2605 ' : ''}V{k}
                    </div>
                    <div className="text-xl font-bold" style={{ color: isHighest ? color.accent : '#fff' }}>
                      {t}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
