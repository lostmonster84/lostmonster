import type { Config } from "tailwindcss";

/**
 * Lost Monster Website - Tailwind Configuration
 *
 * Design System: Bold Personal Brand
 * - Dynamic color theming (5 user-selectable options)
 * - Dark backgrounds with gradients
 * - Large-scale typography (up to 128px)
 * - Glassmorphism and technical details
 *
 * See: /website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md for full documentation
 */

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /**
         * Primary Brand Color - Blue (one of 5 dynamic options)
         * Used as fallback/default in static contexts
         * Dynamic colors controlled via JavaScript state in components
         */
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // DEFAULT - Main brand color
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        // Secondary Brand Color - Professional Gray
        secondary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563", // DEFAULT
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        /**
         * PALETTE EXPLORATIONS
         * These are NOT part of the active design system
         * The actual color system uses 5 dynamic options (blue/teal/orange/purple/green)
         * controlled via JavaScript state, not Tailwind classes
         *
         * These palettes are kept for exploration/testing only
         */

        // Emerald Authority (exploration palette)
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },

        // Midnight Aurora (Dark Premium)
        indigo: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a6",
          900: "#312e81",
        },

        // Mocha Sophistication
        mocha: {
          50: "#fef3f2",
          100: "#fde8e6",
          200: "#fcd4d0",
          300: "#fab5ad",
          400: "#f68d80",
          500: "#ec6a56",
          600: "#d84d39",
          700: "#B8907C",
          800: "#8B6F5B",
          900: "#3c2a21",
        },

        // Digital Lavender
        lavender: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#A78BFA",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
        },

        // Accent Colors
        accent: {
          purple: "#7c3aed",
          blue: "#2563eb",
          gold: "#f59e0b",
          teal: "#14b8a6",
          orange: "#f97316",
        },
        // Success/Positive metrics (Data-Driven palette)
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Warning/Attention
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // Error/Negative
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        // Neutrals (Slate)
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        /**
         * Typography System
         * heading: Outfit - Geometric, bold at large sizes
         * body: Inter - Readable, professional
         */
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        /**
         * Bold Personal Brand Typography Scale
         * NOTE: Uses large scale - up to text-9xl (128px) for hero headlines
         * This is intentional for Bold Personal Brand aesthetic
         */
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.2" }],
      },
      spacing: {
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.6s ease-out forwards",
        "ken-burns": "kenBurns 20s ease-out infinite alternate",
        "pulse-slow": "pulseSlow 8s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.25" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(30px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        natural: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        mechanical: "cubic-bezier(0.4, 0, 0.2, 1)",
        entrance: "cubic-bezier(0, 0, 0.2, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },
      transitionDuration: {
        fast: "200ms",
        base: "300ms",
        slow: "600ms",
        slower: "1000ms",
      },
    },
  },
  plugins: [],
};

export default config;

