import type { Config } from 'tailwindcss'

export default {
    // Make Tailwind dark: variants work with html[data-theme="dark"] (Aksel) and .dark
    darkMode: ['class', '[data-theme="dark"]'],
    content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                mundial: 'var(--font-mundial)',
            },
            colors: {
                // Base
                'brand-black': 'var(--ib-brand-black)',
                'brand-white': 'var(--ib-brand-white)',

                // Pink ramp (100..1000)
                'pink-100': 'var(--ib-pink-100)',
                'pink-200': 'var(--ib-pink-200)',
                'pink-300': 'var(--ib-pink-300)',
                'pink-400': 'var(--ib-pink-400)',
                'pink-500': 'var(--ib-pink-500)',
                'pink-600': 'var(--ib-pink-600)',
                'pink-700': 'var(--ib-pink-700)',
                'pink-800': 'var(--ib-pink-800)',
                'pink-900': 'var(--ib-pink-900)',
                'pink-1000': 'var(--ib-pink-1000)',

                // Pink alpha overlays
                'pink-100A': 'var(--ib-pink-100A)',
                'pink-200A': 'var(--ib-pink-200A)',
                'pink-300A': 'var(--ib-pink-300A)',
                'pink-400A': 'var(--ib-pink-400A)',

                // Dark blue ramp (100..1000)
                'dark-blue-100': 'var(--ib-dark-blue-100)',
                'dark-blue-200': 'var(--ib-dark-blue-200)',
                'dark-blue-300': 'var(--ib-dark-blue-300)',
                'dark-blue-400': 'var(--ib-dark-blue-400)',
                'dark-blue-500': 'var(--ib-dark-blue-500)',
                'dark-blue-600': 'var(--ib-dark-blue-600)',
                'dark-blue-700': 'var(--ib-dark-blue-700)',
                'dark-blue-800': 'var(--ib-dark-blue-800)',
                'dark-blue-900': 'var(--ib-dark-blue-900)',
                'dark-blue-1000': 'var(--ib-dark-blue-1000)',

                // Dark blue alpha overlays
                'dark-blue-100A': 'var(--ib-dark-blue-100A)',
                'dark-blue-200A': 'var(--ib-dark-blue-200A)',
                'dark-blue-300A': 'var(--ib-dark-blue-300A)',
                'dark-blue-400A': 'var(--ib-dark-blue-400A)',
            },
            boxShadow: {
                'ib-shadow': '1px -4px 30px 0 rgba(88, 84, 106, 0.30)',
            },
        },
    },
} satisfies Config
