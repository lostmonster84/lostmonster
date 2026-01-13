'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const colors = {
  blue: {
    name: 'Sky Blue',
    bg: 'from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A]',
    bgGradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #1E3A8A 100%)',
    bgDark: '#1E3A8A', // Dark color for inverted page
    accent: '#3B82F6',
    hoverAccent: '#60A5FA',
  },
  teal: {
    name: 'Vibrant Teal',
    bg: 'from-slate-900 via-slate-800 to-slate-900',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    bgDark: '#0f172a', // Dark color for inverted page
    accent: '#06B6D4',
    hoverAccent: '#08D4F0',
  },
  orange: {
    name: 'Bold Yellow',
    bg: 'from-neutral-900 via-stone-900 to-neutral-900',
    bgGradient: 'linear-gradient(135deg, #171717 0%, #1c1917 50%, #171717 100%)',
    bgDark: '#171717', // Dark color for inverted page
    accent: '#F59E0B',
    hoverAccent: '#FBBF24',
  },
  purple: {
    name: 'Rich Purple',
    bg: 'from-black via-purple-950 to-black',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #3b0764 50%, #000000 100%)',
    bgDark: '#1a0a2e', // Dark purple for inverted page
    accent: '#A855F7',
    hoverAccent: '#C084FC',
  },
  green: {
    name: 'Fresh Green',
    bg: 'from-neutral-950 via-emerald-950 to-neutral-950',
    bgGradient: 'linear-gradient(135deg, #0a0a0a 0%, #022c22 50%, #0a0a0a 100%)',
    bgDark: '#0a0a0a', // Dark color for inverted page
    accent: '#10B981',
    hoverAccent: '#34D399',
  },
} as const;

export type ColorKey = keyof typeof colors;
export type ColorTheme = typeof colors[ColorKey];

interface ColorContextType {
  selectedColor: ColorKey;
  setSelectedColor: (color: ColorKey) => void;
  color: ColorTheme;
  colors: typeof colors;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [selectedColor, setSelectedColorState] = useState<ColorKey>('teal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('lostmonster-color') as ColorKey;
    if (saved && colors[saved]) {
      setSelectedColorState(saved);
    }
  }, []);

  const setSelectedColor = (color: ColorKey) => {
    setSelectedColorState(color);
    localStorage.setItem('lostmonster-color', color);
  };

  const color = colors[selectedColor];

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor, color, colors }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within ColorProvider');
  }
  return context;
}
