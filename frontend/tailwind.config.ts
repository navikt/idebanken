import type { Config } from 'tailwindcss'

export default {
    // Make Tailwind dark: variants work with html[data-theme="dark"] (Aksel) and .dark
    darkMode: 'class',
    content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                mundial: 'var(--font-mundial)',
            },
            fontWeight: {
                'ib-thin': 'var(--ib-font-weight-thin)',
                'ib-light': 'var(--ib-font-weight-light)',
                'ib-regular': 'var(--ib-font-weight-regular)',
                'ib-bold': 'var(--ib-font-weight-bold)',
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

                // Orange ramp (100..1000)
                'orange-100': 'var(--ib-orange-100)',
                'orange-200': 'var(--ib-orange-200)',
                'orange-300': 'var(--ib-orange-300)',
                'orange-400': 'var(--ib-orange-400)',
                'orange-500': 'var(--ib-orange-500)',
                'orange-600': 'var(--ib-orange-600)',
                'orange-700': 'var(--ib-orange-700)',
                'orange-800': 'var(--ib-orange-800)',
                'orange-900': 'var(--ib-orange-900)',
                'orange-1000': 'var(--ib-orange-1000)',

                // Orange alpha overlays
                'orange-100A': 'var(--ib-orange-100A)',
                'orange-200A': 'var(--ib-orange-200A)',
                'orange-300A': 'var(--ib-orange-300A)',
                'orange-400A': 'var(--ib-orange-400A)',

                // Pastel yellow ramp (100..1000)
                'pastel-yellow-100': 'var(--ib-pastel-yellow-100)',
                'pastel-yellow-200': 'var(--ib-pastel-yellow-200)',
                'pastel-yellow-300': 'var(--ib-pastel-yellow-300)',
                'pastel-yellow-400': 'var(--ib-pastel-yellow-400)',
                'pastel-yellow-500': 'var(--ib-pastel-yellow-500)',
                'pastel-yellow-600': 'var(--ib-pastel-yellow-600)',
                'pastel-yellow-700': 'var(--ib-pastel-yellow-700)',
                'pastel-yellow-800': 'var(--ib-pastel-yellow-800)',
                'pastel-yellow-900': 'var(--ib-pastel-yellow-900)',
                'pastel-yellow-1000': 'var(--ib-pastel-yellow-1000)',

                // Pastel yellow alpha overlays
                'pastel-yellow-100A': 'var(--ib-pastel-yellow-100A)',
                'pastel-yellow-200A': 'var(--ib-pastel-yellow-200A)',
                'pastel-yellow-300A': 'var(--ib-pastel-yellow-300A)',
                'pastel-yellow-400A': 'var(--ib-pastel-yellow-400A)',
            },
            boxShadow: {
                'ib-shadow': 'var(--ib-shadow)',
            },
            borderRadius: {
                ib: '24px',
            },
        },
    },
} satisfies Config
