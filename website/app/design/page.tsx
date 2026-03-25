import designConfig from '../../docs/design-config.json';

export const metadata = {
  title: 'Design Guide - Lost Monster',
  description: 'Living design guide for the Lost Monster Bold Personal Brand system.',
};

/* ── Helper Components ──────────────────────────────────── */

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 md:py-28 border-b border-neutral-800 scroll-mt-20">
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-teal-400 mb-3">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">
      {children}
    </h2>
  );
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg text-neutral-400 max-w-3xl mb-12 leading-relaxed">
      {children}
    </p>
  );
}

function Swatch({ name, hex, usage }: { name: string; hex: string; usage?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl border border-white/10 shrink-0" style={{ backgroundColor: hex }} />
      <div>
        <p className="text-white font-heading font-bold text-sm">{name}</p>
        <p className="text-neutral-500 text-xs font-mono">{hex}</p>
        {usage && <p className="text-neutral-400 text-xs">{usage}</p>}
      </div>
    </div>
  );
}

function DoCard({ items }: { items: string[] }) {
  return (
    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
      <p className="text-emerald-400 font-heading font-bold text-lg mb-4">Do</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-neutral-300 text-sm flex gap-2">
            <span className="text-emerald-400 shrink-0">+</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DontCard({ items }: { items: string[] }) {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
      <p className="text-red-400 font-heading font-bold text-lg mb-4">Don&apos;t</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-neutral-300 text-sm flex gap-2">
            <span className="text-red-400 shrink-0">-</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({ cells, header = false }: { cells: (string | React.ReactNode)[]; header?: boolean }) {
  const Tag = header ? 'th' : 'td';
  return (
    <tr className={header ? 'border-b border-neutral-700' : 'border-b border-neutral-800/50'}>
      {cells.map((cell, i) => (
        <Tag key={i} className={`py-3 px-4 text-left text-sm ${header ? 'text-neutral-400 font-semibold' : 'text-neutral-300'} ${i === 0 ? 'font-mono text-teal-400' : ''}`}>
          {cell}
        </Tag>
      ))}
    </tr>
  );
}

/* ── Page ────────────────────────────────────────────────── */

export default function DesignGuidePage() {
  const c = designConfig;
  const TEAL = '#06B6D4';

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative min-h-[60vh] flex items-end pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: TEAL }}>
            Design Guide v{c.brand.version}
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tighter mb-6">
            {c.brand.name}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mb-4">{c.brand.tagline}</p>
          <p className="text-neutral-600 text-sm">Updated {c.brand.date}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Contents ────────────────────────────────────── */}
        <Section id="contents">
          <SectionLabel>Navigation</SectionLabel>
          <SectionTitle>Contents</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {['Philosophy', 'Colours', 'Gradients', 'Typography', 'Layout', 'Components', 'Glassmorphism', 'Icons', 'Motion', 'Photography', 'Voice', 'Anti-Patterns', 'Metrics'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/[^a-z]/g, '')}`}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <p className="text-white font-heading font-bold text-sm">{item}</p>
              </a>
            ))}
          </div>
        </Section>

        {/* ── 01 Philosophy ───────────────────────────────── */}
        <Section id="philosophy">
          <SectionLabel>01 — Philosophy</SectionLabel>
          <SectionTitle>{c.philosophy.headline}</SectionTitle>
          <SectionDesc>{c.philosophy.description}</SectionDesc>
          <p className="text-neutral-300 italic text-lg mb-12 border-l-2 pl-6" style={{ borderColor: TEAL }}>
            &ldquo;{c.philosophy.credo}&rdquo;
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.philosophy.traits.map((t) => (
              <div key={t.name} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-heading font-bold text-lg mb-2">{t.name}</h3>
                <p className="text-neutral-400 text-sm">{t.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 02 Colours ──────────────────────────────────── */}
        <Section id="colours">
          <SectionLabel>02 — Colours</SectionLabel>
          <SectionTitle>Dynamic 5-Colour System</SectionTitle>
          <SectionDesc>{c.colours.description}</SectionDesc>

          <h3 className="text-white font-heading font-bold text-xl mb-6">Brand Accent Colours</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-12">
            {c.colours.brand.map((col) => (
              <div key={col.name} className="text-center">
                <div className="w-full h-24 rounded-xl border border-white/10 mb-3" style={{ backgroundColor: col.hex }} />
                <p className="text-white font-heading font-bold">{col.name}</p>
                <p className="text-neutral-500 text-sm font-mono">{col.hex}</p>
                <p className="text-neutral-400 text-xs mt-1">{col.usage}</p>
              </div>
            ))}
          </div>

          <h3 className="text-white font-heading font-bold text-xl mb-6">Semantic Colours</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {c.colours.semantic.map((col) => (
              <Swatch key={col.name} name={col.name} hex={col.hex} usage={col.usage} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DoCard items={c.colours.doRules} />
            <DontCard items={c.colours.dontRules} />
          </div>
        </Section>

        {/* ── 03 Gradients & Backgrounds ──────────────────── */}
        <Section id="gradients">
          <SectionLabel>03 — Gradients & Backgrounds</SectionLabel>
          <SectionTitle>Dark Gradient System</SectionTitle>
          <SectionDesc>{c.backgrounds.description}</SectionDesc>

          <h3 className="text-white font-heading font-bold text-xl mb-6">Live Gradient Previews</h3>
          <div className="space-y-4 mb-12">
            {c.backgrounds.gradients.map((g) => (
              <div key={g.name} className="relative h-32 rounded-xl overflow-hidden border border-white/10">
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(to bottom right, ${g.from}, ${g.via}, ${g.to})`
                }} />
                <div className="absolute inset-0 flex items-center justify-between px-8">
                  <div>
                    <p className="text-white font-heading font-bold text-lg">{g.name}</p>
                    <p className="text-white/50 text-xs font-mono">{g.from} → {g.via} → {g.to}</p>
                  </div>
                  <div className="flex gap-2">
                    {[g.from, g.via, g.to].map((hex, i) => (
                      <div key={i} className="w-8 h-8 rounded-lg border border-white/20" style={{ backgroundColor: hex }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-white font-heading font-bold text-xl mb-6">Grid Pattern Texture</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="relative h-48 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3C/svg%3E")`
              }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-heading font-bold">Grid Pattern — Active</p>
                  <p className="text-neutral-400 text-xs font-mono mt-1">60x60 SVG, stroke 0.02 opacity, container 0.30</p>
                </div>
              </div>
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-heading font-bold">No Grid — Comparison</p>
                  <p className="text-neutral-400 text-xs mt-1">Same gradient without grid pattern overlay</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h4 className="text-white font-heading font-bold mb-3">Background Rules</h4>
            <ul className="space-y-2">
              {c.backgrounds.rules.map((rule, i) => (
                <li key={i} className="text-neutral-300 text-sm flex gap-2">
                  <span className="text-teal-400 shrink-0">+</span> {rule}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── 04 Typography ───────────────────────────────── */}
        <Section id="typography">
          <SectionLabel>04 — Typography</SectionLabel>
          <SectionTitle>Bold Scale</SectionTitle>
          <SectionDesc>{c.typography.description}</SectionDesc>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {Object.values(c.typography.fonts).map((font) => (
              <div key={font.family} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-teal-400 text-xs font-mono mb-2">{font.variable}</p>
                <p className={`text-white text-4xl mb-2 ${font.variable === '--font-heading' ? 'font-heading font-bold' : 'font-body'}`}>
                  Aa Bb Cc 123
                </p>
                <p className="text-white font-heading font-bold text-lg">{font.family}</p>
                <p className="text-neutral-400 text-sm">Weight: {font.weight} · {font.usage}</p>
              </div>
            ))}
          </div>

          <h3 className="text-white font-heading font-bold text-xl mb-6">Live Type Scale</h3>
          <div className="space-y-6 mb-12">
            <div className="pb-6 border-b border-neutral-800">
              <span className="text-teal-400 text-xs font-mono">Hero · 60→96→128px</span>
              <p className="text-white font-heading font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter mt-2">Runs Businesses</p>
            </div>
            <div className="pb-6 border-b border-neutral-800">
              <span className="text-teal-400 text-xs font-mono">Section · 36→60px</span>
              <p className="text-white font-heading font-bold text-3xl md:text-5xl tracking-tight mt-2">Systems That Work</p>
            </div>
            <div className="pb-6 border-b border-neutral-800">
              <span className="text-teal-400 text-xs font-mono">Subsection · 24→30px</span>
              <p className="text-white font-heading font-bold text-2xl md:text-3xl mt-2">Booking Systems</p>
            </div>
            <div className="pb-6 border-b border-neutral-800">
              <span className="text-teal-400 text-xs font-mono">Body Large · 20→24px</span>
              <p className="text-neutral-300 font-body text-xl md:text-2xl mt-2">I build systems for my own businesses to cut costs. I understand your problems because I&apos;ve lived them.</p>
            </div>
            <div className="pb-6 border-b border-neutral-800">
              <span className="text-teal-400 text-xs font-mono">Body · 16px</span>
              <p className="text-neutral-300 font-body text-base mt-2">Custom booking systems that replace expensive subscriptions, eliminate double bookings, and drive direct revenue.</p>
            </div>
            <div className="pb-6 border-b border-neutral-800">
              <span className="text-teal-400 text-xs font-mono">Small · 14px</span>
              <p className="text-neutral-400 font-body text-sm mt-2">Starting from £5,000 · Typical timeline: 3-4 weeks · Next.js, TypeScript, Stripe</p>
            </div>
            <div className="pb-6 border-b border-neutral-800">
              <span className="text-teal-400 text-xs font-mono">Tiny · 12px</span>
              <p className="text-neutral-500 font-body text-xs mt-2">© 2026 Lost Monster. All rights reserved.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DoCard items={c.typography.doRules} />
            <DontCard items={c.typography.dontRules} />
          </div>
        </Section>

        {/* ── 05 Layout ───────────────────────────────────── */}
        <Section id="layout">
          <SectionLabel>05 — Layout</SectionLabel>
          <SectionTitle>Containers & Spacing</SectionTitle>
          <div className="space-y-3 mb-10">
            {c.layout.modes.map((m) => (
              <div key={m.name} className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-xl p-4">
                <code className="text-teal-400 font-mono text-sm shrink-0">.{m.class}</code>
                <p className="text-neutral-400 text-sm">{m.spec}</p>
              </div>
            ))}
          </div>
          <h3 className="text-white font-heading font-bold text-xl mb-4">Breakpoints</h3>
          <div className="flex flex-wrap gap-3">
            {c.layout.breakpoints.map((bp) => (
              <div key={bp.name} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center">
                <p className="text-teal-400 font-mono text-sm font-bold">{bp.name}</p>
                <p className="text-neutral-500 text-xs">{bp.px}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 06 Components ───────────────────────────────── */}
        <Section id="components">
          <SectionLabel>06 — Components</SectionLabel>
          <SectionTitle>Buttons, Cards & Shadows</SectionTitle>

          {/* Buttons — Dark bg */}
          <h3 className="text-white font-heading font-bold text-xl mb-6">Buttons — On Dark Background</h3>
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-xl p-8 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-8 py-4 rounded-xl text-white font-heading font-bold transition-all hover:brightness-110" style={{ backgroundColor: TEAL }}>Start Your Project</button>
              <button className="px-8 py-4 rounded-xl font-heading font-bold transition-all border-2 hover:bg-white/5" style={{ borderColor: TEAL, color: TEAL }}>See My Work</button>
              <button className="px-8 py-4 rounded-xl font-heading font-bold transition-all hover:underline" style={{ color: TEAL }}>Learn More</button>
            </div>
          </div>

          {/* Buttons — Light bg */}
          <h3 className="text-white font-heading font-bold text-xl mb-6">Buttons — On Light Background</h3>
          <div className="bg-white border border-neutral-200 rounded-xl p-8 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-8 py-4 rounded-xl text-white font-heading font-bold" style={{ backgroundColor: TEAL }}>Start Your Project</button>
              <button className="px-8 py-4 rounded-xl font-heading font-bold border-2 text-neutral-900 border-neutral-300 hover:border-neutral-900 transition-all">See My Work</button>
              <button className="px-8 py-4 rounded-xl font-heading font-bold text-neutral-600 hover:text-neutral-900 transition-all">Learn More</button>
            </div>
          </div>

          {/* Button Sizes */}
          <h3 className="text-white font-heading font-bold text-xl mb-6">Button Sizes — Side by Side</h3>
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-8 mb-12">
            <div className="flex flex-wrap items-end gap-4">
              {c.components.buttons.sizes.map((size) => (
                <div key={size.name} className="text-center">
                  <button className={`rounded-xl text-white font-heading font-bold transition-all ${size.name === 'sm' ? 'px-4 py-2 text-sm' : size.name === 'md' ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'}`} style={{ backgroundColor: TEAL }}>
                    {size.name === 'sm' ? 'Small' : size.name === 'md' ? 'Medium' : 'Large'}
                  </button>
                  <p className="text-neutral-500 text-xs mt-2 font-mono">{size.height}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cards — Live Examples */}
          <h3 className="text-white font-heading font-bold text-xl mb-6">Cards — Live Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Glass card on dark */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: TEAL + '20', color: TEAL }}>
                  <span className="text-sm font-bold">50+</span>
                </div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider">Glass (dark)</p>
              </div>
              <h4 className="text-white font-heading font-bold text-lg mb-2">Projects Built</h4>
              <p className="text-neutral-400 text-sm">Metric cards, feature cards on dark backgrounds. Glassmorphism with backdrop blur.</p>
            </div>
            {/* Elevated card on light */}
            <div className="bg-white shadow-md rounded-xl border border-neutral-200 p-6">
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Elevated (light)</p>
              <h4 className="text-neutral-900 font-heading font-bold text-lg mb-2">Booking Systems</h4>
              <p className="text-neutral-600 text-sm mb-4">Custom booking systems that replace expensive subscriptions and drive direct revenue.</p>
              <span className="text-sm font-bold" style={{ color: TEAL }}>Read more →</span>
            </div>
            {/* Premium glass */}
            <div className="bg-neutral-950/90 backdrop-blur-2xl border border-white/5 rounded-xl p-6">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-3">Premium Glass</p>
              <h4 className="text-white font-heading font-bold text-lg mb-2">Featured Work</h4>
              <p className="text-neutral-400 text-sm">Premium sections, overlays, hero elements. Maximum depth with minimal surface.</p>
            </div>
          </div>

          {/* Shadows */}
          <h3 className="text-white font-heading font-bold text-xl mb-6">Shadows — Depth Comparison</h3>
          <div className="bg-neutral-100 rounded-xl p-8 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {c.components.shadows.map((s) => (
                <div key={s.name} className="bg-white rounded-xl p-5 text-center" style={{ boxShadow: s.value }}>
                  <p className="text-neutral-900 font-heading font-bold text-sm">{s.name}</p>
                  <p className="text-neutral-500 text-xs mt-1">{s.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 07 Glassmorphism ────────────────────────────── */}
        <Section id="glassmorphism">
          <SectionLabel>07 — Glassmorphism</SectionLabel>
          <SectionTitle>Frosted Glass Effects</SectionTitle>
          <SectionDesc>Translucent cards with backdrop blur on dark surfaces. The signature Lost Monster component pattern.</SectionDesc>

          <div className="relative rounded-xl overflow-hidden mb-12" style={{ minHeight: '400px' }}>
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3C/svg%3E")`
            }} />
            {/* Glow blobs */}
            <div className="absolute top-10 left-20 w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: TEAL }} />
            <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#A855F7' }} />

            {/* Glass cards */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
              {c.components.glassmorphism.map((g) => (
                <div key={g.name} className={`${g.class} p-6`}>
                  <p className="text-xs uppercase tracking-wider mb-3" style={{ color: TEAL }}>{g.name}</p>
                  <h4 className="text-white font-heading font-bold text-lg mb-2">{g.name.replace('glass-', '').replace('-', ' ')}</h4>
                  <p className="text-neutral-400 text-sm">{g.usage}</p>
                  <code className="text-neutral-500 text-xs font-mono block mt-3">.{g.name}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Metric cards — the real glassmorphism showcase */}
          <h3 className="text-white font-heading font-bold text-xl mb-6">Metric Cards — In Context</h3>
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3C/svg%3E")`
            }} />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 p-8">
              {c.metrics.map((m) => (
                <div key={m.label} className="bg-white/5 backdrop-blur-md border rounded-xl p-6 text-center" style={{ borderColor: TEAL + '20' }}>
                  <p className="text-4xl font-heading font-bold mb-1" style={{ color: TEAL }}>{m.value}</p>
                  <p className="text-white font-bold text-sm">{m.label}</p>
                  <p className="text-neutral-500 text-xs">{m.subtext}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 08 Icons ────────────────────────────────────── */}
        <Section id="icons">
          <SectionLabel>08 — Icons</SectionLabel>
          <SectionTitle>Lucide React</SectionTitle>
          <SectionDesc>Consistent icon system. Always inherit colour from parent text. Never hardcode icon colours. No emoji — ever.</SectionDesc>

          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead><Row cells={['Size', 'Pixels', 'Class', 'Usage']} header /></thead>
              <tbody>
                {c.icons.sizes.map((icon) => (
                  <Row key={icon.name} cells={[icon.size, icon.size, icon.class, icon.name]} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h4 className="text-white font-heading font-bold mb-3">Icon Rules</h4>
            <ul className="space-y-2">
              {c.icons.rules.map((rule, i) => (
                <li key={i} className="text-neutral-300 text-sm flex gap-2">
                  <span className="text-teal-400 shrink-0">+</span> {rule}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── 09 Motion ───────────────────────────────────── */}
        <Section id="motion">
          <SectionLabel>09 — Motion</SectionLabel>
          <SectionTitle>Easings & Animation</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <h3 className="text-white font-heading font-bold text-xl mb-4">Easings</h3>
              <div className="space-y-3">
                {c.motion.easings.map((e) => (
                  <div key={e.name} className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-white font-heading font-bold text-sm">{e.name}</p>
                    <p className="text-neutral-500 text-xs font-mono">{e.value}</p>
                    <p className="text-neutral-400 text-xs">{e.usage}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-heading font-bold text-xl mb-4">Durations</h3>
              <div className="space-y-3">
                {c.motion.durations.map((d) => (
                  <div key={d.name} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-4">
                    <code className="text-teal-400 font-mono text-sm shrink-0 w-16">{d.ms}</code>
                    <div>
                      <p className="text-white font-bold text-sm">{d.name}</p>
                      <p className="text-neutral-400 text-xs">{d.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="text-white font-heading font-bold text-xl mb-4">Hover Effects — Interactive</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {c.motion.hoverEffects.map((fx) => (
              <div key={fx.name} className={`bg-white/5 border border-white/10 rounded-xl p-6 text-center cursor-pointer ${fx.class}`}>
                <p className="text-white font-heading font-bold text-sm mb-1">{fx.name}</p>
                <p className="text-neutral-500 text-xs">Hover me</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 10 Photography ──────────────────────────────── */}
        <Section id="photography">
          <SectionLabel>10 — Photography</SectionLabel>
          <SectionTitle>Imagery Rules</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <DoCard items={c.photography.doRules} />
            <DontCard items={c.photography.dontRules} />
          </div>
          <h3 className="text-white font-heading font-bold text-xl mb-4">Visual Priority</h3>
          <div className="space-y-2">
            {c.photography.priority.map((p, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-teal-400 font-mono text-sm font-bold w-6">{i + 1}</span>
                <p className="text-neutral-300">{p}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 11 Voice ────────────────────────────────────── */}
        <Section id="voice">
          <SectionLabel>11 — Voice</SectionLabel>
          <SectionTitle>The Grace Test</SectionTitle>
          <SectionDesc>
            {c.voice.persona.name}, {c.voice.persona.age}. {c.voice.persona.role}. {c.voice.persona.trait}
          </SectionDesc>
          <p className="text-white italic text-xl mb-10 border-l-2 pl-6" style={{ borderColor: TEAL }}>
            &ldquo;{c.voice.rule}&rdquo;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
              <p className="text-emerald-400 font-heading font-bold text-lg mb-4">Passes Grace</p>
              {c.voice.doExamples.map((ex, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-emerald-500/10 last:border-0">
                  <span className="text-white font-bold">&ldquo;{ex.label}&rdquo;</span>
                  <span className="text-neutral-400 text-sm">{ex.context}</span>
                </div>
              ))}
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <p className="text-red-400 font-heading font-bold text-lg mb-4">Fails Grace</p>
              {c.voice.dontExamples.map((ex, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-red-500/10 last:border-0">
                  <span className="text-white font-bold line-through opacity-60">&ldquo;{ex.label}&rdquo;</span>
                  <span className="text-neutral-400 text-sm">{ex.context}</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-white font-heading font-bold text-xl mb-4">Voice Traits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.voice.traits.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="font-heading font-bold mb-1" style={{ color: TEAL }}>{t.name}</p>
                <p className="text-neutral-400 text-sm">{t.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 12 Anti-Patterns ────────────────────────────── */}
        <Section id="antipatterns">
          <SectionLabel>12 — Anti-Patterns</SectionLabel>
          <SectionTitle>Never Do This</SectionTitle>
          <div className="space-y-3">
            {c.antiPatterns.map((ap) => (
              <div key={ap.name} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex gap-4">
                <span className="text-red-400 text-lg shrink-0">x</span>
                <div>
                  <p className="text-white font-heading font-bold">{ap.name}</p>
                  <p className="text-neutral-400 text-sm">{ap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 13 Metrics ──────────────────────────────────── */}
        <Section id="metrics">
          <SectionLabel>13 — Metrics</SectionLabel>
          <SectionTitle>Always Display These</SectionTitle>
          <SectionDesc>Every key page must include these proof points. They build trust through specificity, not promises.</SectionDesc>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><Row cells={['Value', 'Label', 'Subtext', 'Why']} header /></thead>
              <tbody>
                <Row cells={['50+', 'Projects Built', 'Delivered on time', 'Proven experience — not new']} />
                <Row cells={['70%', 'Cost Savings', 'vs agencies', 'Concrete value proposition']} />
                <Row cells={['4.9/5', 'Client Rating', 'Real reviews', 'Real reviews (not suspicious 5.0)']} />
                <Row cells={['2-4 wks', 'Typical Build', 'Not months', 'Realistic (not vague "fast")']} />
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Files ───────────────────────────────────────── */}
        <Section id="files">
          <SectionLabel>14 — Source Files</SectionLabel>
          <SectionTitle>Where Things Live</SectionTitle>
          <div className="space-y-2">
            {c.files.map((f) => (
              <div key={f.path} className="flex items-start gap-4 py-2 border-b border-neutral-800">
                <code className="text-teal-400 font-mono text-sm shrink-0">{f.path}</code>
                <p className="text-neutral-400 text-sm">{f.purpose}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Footer ──────────────────────────────────────── */}
        <div className="py-16 text-center">
          <p className="text-neutral-600 text-sm">
            Generated from <code className="text-neutral-500">docs/design-config.json</code> · Update the config, the page updates automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
