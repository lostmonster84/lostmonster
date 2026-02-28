'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FlaskConical, Shield } from 'lucide-react';
import { useColor } from '@/contexts/ColorContext';
import { labProducts, getStatusConfig } from '@/lib/labs';
import type { LabProduct } from '@/lib/labs';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Shield,
  FlaskConical,
};

function ProductCard({ product, index }: { product: LabProduct; index: number }) {
  const { color } = useColor();
  const statusConfig = getStatusConfig(product.status);
  const Icon = iconMap[product.icon] || FlaskConical;
  const isComingSoon = product.status === 'coming-soon';

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative bg-white/5 backdrop-blur-md border rounded-xl p-6 transition-all duration-300 ${
        isComingSoon
          ? 'opacity-50 cursor-default'
          : 'hover:bg-white/10 hover:border-white/20 cursor-pointer'
      }`}
      style={{ borderColor: isComingSoon ? 'rgba(255,255,255,0.05)' : `${color.accent}20` }}
    >
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-8 h-8" style={{ color: isComingSoon ? '#737373' : color.accent }} />
        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${statusConfig.className}`}>
          {statusConfig.label}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
      <p className="text-sm text-neutral-400 mb-4 leading-relaxed">{product.description}</p>
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {product.tags.map((tag) => (
          <span key={tag} className="text-xs text-neutral-500 bg-white/5 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      {!isComingSoon && (
        <div
          className="flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
          style={{ color: color.accent }}
        >
          Try it <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );

  if (isComingSoon) return card;

  return (
    <Link href={`/labs/${product.slug}`} className="block">
      {card}
    </Link>
  );
}

export default function LabsPage() {
  const { color } = useColor();

  return (
    <div className="relative min-h-screen transition-colors duration-700" style={{ background: color.bgGradient }}>
      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none -z-10" />

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tighter mb-6">
            <span className="text-white">Things I'm </span>
            <span className="transition-colors duration-300" style={{ color: color.accent }}>Building</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
            Small tools, experiments, and beta products. Some useful, some just for fun.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {labProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
