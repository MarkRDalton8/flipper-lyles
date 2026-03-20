import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Map CSS custom properties to Tailwind utilities
        bg: 'var(--bg)',
        card: 'var(--card)',
        card2: 'var(--card2)',
        gold: 'var(--gold)',
        orange: 'var(--orange)',
        red: 'var(--red)',
        teal: 'var(--teal)',
        blue: 'var(--blue)',
        purple: 'var(--purple)',
        txt: 'var(--txt)',
        txt2: 'var(--txt2)',
        mute: 'var(--mute)',
        border: 'var(--border)',
        danger: 'var(--danger)',
        safe: 'var(--safe)',
        caution: 'var(--caution)',
      },
    },
  },
  plugins: [],
} satisfies Config;
