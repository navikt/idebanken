import type { Config } from 'tailwindcss'

export default {
    content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                mundial: 'var(--font-mundial)',
            },
            colors: {
                black: 'var(--ib-black)',
                'brand-black': 'var(--ib-brand-black)',
                'brand-white': 'var(--ib-brand-white)',

                'red-100': 'var(--ib-red-100)',
                'red-200': 'var(--ib-red-200)',
                'red-300': 'var(--ib-red-300)',
                'red-400': 'var(--ib-red-400)',
                'red-500': 'var(--ib-red-500)',
                'red-600': 'var(--ib-red-600)',
                'red-700': 'var(--ib-red-700)',
                'red-800': 'var(--ib-red-800)',
                'red-900': 'var(--ib-red-900)',

                'pink-100': 'var(--ib-pink-100)',
                'pink-200': 'var(--ib-pink-200)',
                'pink-300': 'var(--ib-pink-300)',
                'pink-400': 'var(--ib-pink-400)',
                'pink-500': 'var(--ib-pink-500)',
                'pink-600': 'var(--ib-pink-600)',
                'pink-700': 'var(--ib-pink-700)',
                'pink-800': 'var(--ib-pink-800)',
                'pink-900': 'var(--ib-pink-900)',

                'dark-blue-500': 'var(--ib-dark-blue-500)',
            },
            boxShadow: {
                'accordion-item': '0px 26px 44px -12px rgba(32, 31, 31, 0.16)',
            },
        },
    },
} satisfies Config
