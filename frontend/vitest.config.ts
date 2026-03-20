import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        environmentOptions: {
            jsdom: {
                userAgent: 'bot',
            },
        },
        globals: true,
        setupFiles: ['./src/tests/setup.ts'],
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        exclude: ['src/tests/e2e/**', 'node_modules', '.next'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
            exclude: [
                'node_modules',
                '.next',
                'src/tests/e2e',
                'src/types/**',
                '**/*.d.ts',
                'src/app/fonts/**',
            ],
        },
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src'),
            '@phrases': path.resolve(__dirname, './src/phrases'),
        },
    },
    css: {
        // Treat CSS modules and plain CSS imports as no-ops in tests
        modules: {
            // @ts-expect-error - Vitest's online doc accepts this option, but the type definitions does not
            classNameStrategy: 'non-scoped',
        },
    },
})
