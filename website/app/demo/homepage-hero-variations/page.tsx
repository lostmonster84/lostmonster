'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useColor } from '@/contexts/ColorContext'
import DemxScaffold, { type DemxScores } from '@/components/demo/DemxScaffold'

import scoresData from './scores.json'
const scores: DemxScores = scoresData

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

const gridBg = "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"

/* Reusable proof bar */
function ProofBar() {
  const { color } = useColor()
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-6 sm:gap-10"
      initial="hidden" animate="visible" variants={stagger}
    >
      {[
        { val: '17', label: 'Built' },
        { val: '5', label: 'In Production' },
        { val: '80/100', label: 'Quality Floor' },
        { val: '4.9/5', label: 'Client Rating' },
      ].map((p) => (
        <motion.div key={p.label} className="text-center" variants={fadeUp} custom={0}>
          <p className="text-lg font-bold" style={{ color: color.accent }}>{p.val}</p>
          <p className="text-xs text-neutral-500">{p.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

/* Reusable CTA */
function HeroCTA({ label }: { label: string }) {
  const { color } = useColor()
  return (
    <button
      className="inline-flex items-center gap-2 px-10 py-5 text-lg font-bold rounded-lg text-black group"
      style={{ backgroundColor: color.accent, boxShadow: `0 20px 60px -15px ${color.accent}40` }}
    >
      {label}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════
   V1: TRACK RECORD
   Tighter headline. Proof bar built in. Strong CTA.
   ═══════════════════════════════════════════════════════════════ */
function V1TrackRecord() {
  const { color } = useColor()
  return (
    <section className="min-h-[700px] flex items-center justify-center relative overflow-hidden" style={{ background: color.bgGradient }}>
      <div className={`absolute inset-0 ${gridBg}`} />
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: color.accent }} initial="hidden" animate="visible" variants={fadeUp} custom={0.1}>
          Dev Studio
        </motion.p>
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-6"
          initial="hidden" animate="visible" variants={fadeUp} custom={0.2}
        >
          <span className="text-white">17 built.</span><br />
          <span style={{ color: color.accent }}>5 live.</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed" initial="hidden" animate="visible" variants={fadeUp} custom={0.3}>
          Platforms, marketplaces, and SaaS across 6 industries. Every project held to the same quality standard.
        </motion.p>
        <motion.div className="mb-14" initial="hidden" animate="visible" variants={fadeUp} custom={0.4}>
          <HeroCTA label="Start a project" />
        </motion.div>
        <ProofBar />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   V2: QUALITY FLOOR
   "Nothing ships below 80." + scope + proof + CTA.
   ═══════════════════════════════════════════════════════════════ */
function V2QualityFloor() {
  const { color } = useColor()
  return (
    <section className="min-h-[700px] flex items-center justify-center relative overflow-hidden" style={{ background: color.bgGradient }}>
      <div className={`absolute inset-0 ${gridBg}`} />
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: color.accent }} initial="hidden" animate="visible" variants={fadeUp} custom={0.1}>
          Dev Studio
        </motion.p>
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter mb-6"
          initial="hidden" animate="visible" variants={fadeUp} custom={0.2}
        >
          <span className="text-white">Nothing ships</span><br />
          <span className="text-white">below </span>
          <span style={{ color: color.accent }}>80.</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed" initial="hidden" animate="visible" variants={fadeUp} custom={0.3}>
          31 quality checks on every page. Platforms, marketplaces, and SaaS across 6 industries.
        </motion.p>
        <motion.div className="mb-14" initial="hidden" animate="visible" variants={fadeUp} custom={0.4}>
          <HeroCTA label="Start a project" />
        </motion.div>
        <ProofBar />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   V3: SKIN IN THE GAME
   "We run what we build." + what we build + proof + CTA.
   ═══════════════════════════════════════════════════════════════ */
function V3SkinInTheGame() {
  const { color } = useColor()
  return (
    <section className="min-h-[700px] flex items-center justify-center relative overflow-hidden" style={{ background: color.bgGradient }}>
      <div className={`absolute inset-0 ${gridBg}`} />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: color.accent }} initial="hidden" animate="visible" variants={fadeUp} custom={0.1}>
          Dev Studio
        </motion.p>
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-6"
          initial="hidden" animate="visible" variants={fadeUp} custom={0.2}
        >
          <span className="text-white">We run what</span><br />
          <span className="text-white">we </span>
          <span style={{ color: color.accent }}>build.</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed" initial="hidden" animate="visible" variants={fadeUp} custom={0.3}>
          5 of our products are live. We maintain them, pay for the hosting, fix the bugs at 2am. Client builds get the same care.
        </motion.p>
        <motion.div className="mb-14" initial="hidden" animate="visible" variants={fadeUp} custom={0.4}>
          <HeroCTA label="Start a project" />
        </motion.div>
        <ProofBar />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   V4: STRAIGHT TALK
   "We build software." + tight scope + proof + CTA.
   ═══════════════════════════════════════════════════════════════ */
function V4StraightTalk() {
  const { color } = useColor()
  return (
    <section className="min-h-[700px] flex items-center justify-center relative overflow-hidden" style={{ background: color.bgGradient }}>
      <div className={`absolute inset-0 ${gridBg}`} />
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: color.accent }} initial="hidden" animate="visible" variants={fadeUp} custom={0.1}>
          Dev Studio
        </motion.p>
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter mb-6"
          initial="hidden" animate="visible" variants={fadeUp} custom={0.2}
        >
          <span className="text-white">We build</span><br />
          <span style={{ color: color.accent }}>software.</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed" initial="hidden" animate="visible" variants={fadeUp} custom={0.3}>
          Platforms, marketplaces, SaaS, mobile. 17 shipped across 6 industries. 70% cheaper than agencies.
        </motion.p>
        <motion.div className="mb-14" initial="hidden" animate="visible" variants={fadeUp} custom={0.4}>
          <HeroCTA label="Start a project" />
        </motion.div>
        <ProofBar />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   V5: PROOF + QUESTION
   "17 built. 5 live. What's yours?" + scope + proof + CTA.
   ═══════════════════════════════════════════════════════════════ */
function V5ProofQuestion() {
  const { color } = useColor()
  return (
    <section className="min-h-[700px] flex items-center justify-center relative overflow-hidden" style={{ background: color.bgGradient }}>
      <div className={`absolute inset-0 ${gridBg}`} />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: color.accent }} initial="hidden" animate="visible" variants={fadeUp} custom={0.1}>
          Dev Studio
        </motion.p>
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter mb-6"
          initial="hidden" animate="visible" variants={fadeUp} custom={0.2}
        >
          <span className="text-white">17 built.</span><br />
          <span className="text-white">5 live.</span><br />
          <span style={{ color: color.accent }}>What&apos;s yours?</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed" initial="hidden" animate="visible" variants={fadeUp} custom={0.3}>
          Platforms, marketplaces, and SaaS across 6 industries. Every project held to an 80/100 quality floor.
        </motion.p>
        <motion.div className="mb-14" initial="hidden" animate="visible" variants={fadeUp} custom={0.4}>
          <HeroCTA label="Start a project" />
        </motion.div>
        <ProofBar />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
export default function HomepageHeroVariations() {
  return (
    <DemxScaffold
      title="Homepage Hero: Round 5"
      scores={scores}
      variations={{
        '1': {
          name: 'Track Record',
          description: '"17 built. 5 live." Two lines, proof bar, strong CTA.',
          changes: [
            'Shortened headline from 3 lines to 2',
            'Subtitle: scope + industries + quality',
            'Proof bar: 17, 5, 80/100, 4.9/5',
            'CTA: "Start a project" (action, not conversation)',
          ],
          component: <V1TrackRecord />,
        },
        '2': {
          name: 'Quality Floor',
          description: '"Nothing ships below 80." Process as the headline, proof as backup.',
          changes: [
            'Subtitle: 31 checks + scope + industries',
            'Proof bar adds track record the headline lacks',
            'CTA: "Start a project"',
          ],
          component: <V2QualityFloor />,
        },
        '3': {
          name: 'Skin In The Game',
          description: '"We run what we build." Dev voice. "Fix the bugs at 2am."',
          changes: [
            'Subtitle: honest, specific, human',
            'Proof bar backs up the personal claim with numbers',
            'CTA: "Start a project"',
          ],
          component: <V3SkinInTheGame />,
        },
        '4': {
          name: 'Straight Talk',
          description: '"We build software." Two words. Subtitle does the selling.',
          changes: [
            'Subtitle: scope + track record + cost advantage',
            '"70% cheaper than agencies" in subtitle (new for this round)',
            'Proof bar adds depth',
          ],
          component: <V4StraightTalk />,
        },
        '5': {
          name: 'Proof + Question',
          description: '"17 built. 5 live. What\'s yours?" Numbers then a question.',
          changes: [
            'Three lines but each is 2 words (fast scan)',
            'Subtitle: scope + quality floor',
            'Proof bar reinforces the numbers',
          ],
          component: <V5ProofQuestion />,
        },
      }}
    />
  )
}
