'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Grid3x3, Zap, Waves, Circle } from 'lucide-react';

const colors = {
  blue: {
    name: 'Sky Blue',
    bg: 'from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A]',
    accent: '#60A5FA',
    hoverAccent: '#7CB6FB',
  },
  teal: {
    name: 'Vibrant Teal',
    bg: 'from-slate-900 via-slate-800 to-slate-900',
    accent: '#06B6D4',
    hoverAccent: '#08D4F0',
  },
  orange: {
    name: 'Bold Orange',
    bg: 'from-neutral-900 via-stone-900 to-neutral-900',
    accent: '#F59E0B',
    hoverAccent: '#FBBF24',
  },
  purple: {
    name: 'Rich Purple',
    bg: 'from-black via-purple-950 to-black',
    accent: '#A855F7',
    hoverAccent: '#C084FC',
  },
  green: {
    name: 'Fresh Green',
    bg: 'from-neutral-950 via-emerald-950 to-neutral-950',
    accent: '#10B981',
    hoverAccent: '#34D399',
  },
};

type ColorKey = keyof typeof colors;

// Animation 1: Gradient Orbs
function GradientOrbs({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['-10%', '20%', '-10%'],
          y: ['10%', '30%', '10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${accent}30 0%, transparent 70%)`,
          filter: 'blur(80px)',
          right: 0,
        }}
        animate={{
          x: ['10%', '-20%', '10%'],
          y: ['20%', '50%', '20%'],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accent}25 0%, transparent 70%)`,
          filter: 'blur(70px)',
          bottom: 0,
          left: '30%',
        }}
        animate={{
          x: ['0%', '30%', '0%'],
          y: ['-10%', '10%', '-10%'],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

// Animation 2: Flowing Particles
function FlowingParticles({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Draw particle
        ctx.fillStyle = `${accent}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        particle.y -= particle.speedY;
        particle.x += particle.speedX;

        // Reset if particle goes off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [accent]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

// Animation 3: Animated Grid Distortion
function AnimatedGrid({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${accent}20 1px, transparent 1px),
            linear-gradient(90deg, ${accent}20 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accent}40 0%, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

// Animation 4: Dynamic Light Rays
function LightRays({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-full w-[200px] opacity-20"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accent}80 50%, transparent 100%)`,
            filter: 'blur(40px)',
            transformOrigin: 'center',
          }}
          initial={{ x: '-200px', rotate: 20 }}
          animate={{
            x: ['0%', '200%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2.5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Animation 5: Morphing Blobs
function MorphingBlobs({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px]"
        style={{
          background: `radial-gradient(circle, ${accent}30 0%, transparent 70%)`,
          filter: 'blur(100px)',
          top: '-200px',
          left: '-200px',
        }}
        animate={{
          borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px]"
        style={{
          background: `radial-gradient(circle, ${accent}25 0%, transparent 70%)`,
          filter: 'blur(90px)',
          bottom: '-150px',
          right: '-150px',
        }}
        animate={{
          borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '40% 60% 70% 30% / 40% 70% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%'],
          scale: [1.1, 1, 1.1],
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

// Hero Section Component
function HeroSection({
  title,
  animation,
  icon: Icon,
  color,
}: {
  title: string;
  animation: React.ReactNode;
  icon: any;
  color: typeof colors[ColorKey];
}) {
  return (
    <section className="relative h-screen flex items-center justify-center snap-start">
      {/* Animation background */}
      {animation}

      {/* Content */}
      <div className="container mx-auto px-6 w-full relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Label */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Icon className="w-6 h-6" style={{ color: color.accent }} />
            <span className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
              {title}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tighter">
            <span className="text-white">Built by</span>
            <br />
            <span className="text-white">Someone Who</span>
            <br />
            <span className="transition-colors duration-300" style={{ color: color.accent }}>
              Runs Businesses
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Not just codes them. I build systems for my own businesses to cut costs.
          </p>

          {/* CTA */}
          <div className="flex justify-center">
            <button
              className="inline-flex items-center justify-center gap-2 px-12 py-6 text-xl font-bold rounded-lg transition-all shadow-2xl text-black group"
              style={{
                backgroundColor: color.accent,
                boxShadow: `0 20px 60px -15px ${color.accent}40`,
              }}
            >
              Start Your Project
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
          style={{ borderColor: `${color.accent}40` }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color.accent }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default function AnimationsDemoPage() {
  const [selectedColor, setSelectedColor] = useState<ColorKey>('orange');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('lostmonster-color') as ColorKey;
    if (saved && colors[saved]) {
      setSelectedColor(saved);
    }
  }, []);

  const handleColorChange = (colorKey: ColorKey) => {
    setSelectedColor(colorKey);
    localStorage.setItem('lostmonster-color', colorKey);
  };

  const color = colors[selectedColor];

  if (!mounted) {
    return null;
  }

  return (
    <div className={`relative bg-gradient-to-br ${color.bg} transition-colors duration-700`}>
      {/* Static grid pattern overlay */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 pointer-events-none z-0"></div>

      {/* Page Title */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black/80 backdrop-blur-md border border-neutral-700 rounded-lg px-6 py-3">
          <h2 className="text-sm font-bold text-white">Hero Animation Demo</h2>
          <p className="text-xs text-neutral-400">Scroll to explore • Pick your favorite</p>
        </div>
      </div>

      {/* Scroll container */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {/* 1. Gradient Orbs */}
        <HeroSection
          title="Gradient Orbs"
          animation={<GradientOrbs accent={color.accent} />}
          icon={Circle}
          color={color}
        />

        {/* 2. Flowing Particles */}
        <HeroSection
          title="Flowing Particles"
          animation={<FlowingParticles accent={color.accent} />}
          icon={Sparkles}
          color={color}
        />

        {/* 3. Animated Grid */}
        <HeroSection
          title="Animated Grid Distortion"
          animation={<AnimatedGrid accent={color.accent} />}
          icon={Grid3x3}
          color={color}
        />

        {/* 4. Light Rays */}
        <HeroSection
          title="Dynamic Light Rays"
          animation={<LightRays accent={color.accent} />}
          icon={Zap}
          color={color}
        />

        {/* 5. Morphing Blobs */}
        <HeroSection
          title="Morphing Blobs"
          animation={<MorphingBlobs accent={color.accent} />}
          icon={Waves}
          color={color}
        />
      </div>

      {/* Color switcher */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <div className="bg-black/80 backdrop-blur-md border border-neutral-700 rounded-lg p-3 md:p-4 shadow-2xl">
          <div className="text-xs font-semibold text-white mb-2 md:mb-3 text-center">
            Choose Your Color
          </div>
          <div className="flex gap-2 md:gap-3">
            {(Object.keys(colors) as ColorKey[]).map((colorKey) => (
              <button
                key={colorKey}
                onClick={() => handleColorChange(colorKey)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full transition-all ${
                  selectedColor === colorKey
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                    : 'opacity-50 hover:opacity-100 hover:scale-105'
                }`}
                style={{ backgroundColor: colors[colorKey].accent }}
                title={colors[colorKey].name}
                aria-label={`Switch to ${colors[colorKey].name}`}
              />
            ))}
          </div>
          <div className="text-xs text-neutral-400 mt-2 text-center hidden md:block">
            {color.name}
          </div>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-black/60 backdrop-blur-sm border border-neutral-700/50 rounded-full px-4 py-2">
          <p className="text-xs text-neutral-300">Use scroll wheel or arrow keys</p>
        </div>
      </div>
    </div>
  );
}
