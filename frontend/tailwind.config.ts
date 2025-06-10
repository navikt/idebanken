import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mundial: "var(--font-mundial)",
      },
      colors: {
        black: 'var(--ib-black)',
        'red-100': 'var(--ib-red-100)',
        'red-200': 'var(--ib-red-200)',
        'red-300': 'var(--ib-red-300)',
        'red-400': 'var(--ib-red-400)',
        'red-base': 'var(--ib-red-base)',
        'red-600': 'var(--ib-red-600)',
        'red-700': 'var(--ib-red-700)',
        'red-800': 'var(--ib-red-800)',
        'red-900': 'var(--ib-red-900)',
        
        'pink-100': 'var(--ib-pink-100)',
        'pink-200': 'var(--ib-pink-200)',
        'pink-300': 'var(--ib-pink-300)',
        'pink-400': 'var(--ib-pink-400)',
        'pink-base': 'var(--ib-pink-base)',
        'pink-600': 'var(--ib-pink-600)',
        'pink-700': 'var(--ib-pink-700)',
        'pink-800': 'var(--ib-pink-800)',
        'pink-900': 'var(--ib-pink-900)',
      },
    },
  }
} satisfies Config;