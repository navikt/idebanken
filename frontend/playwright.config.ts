import { defineConfig, devices } from '@playwright/test'

const BASE_URL = process.env.TEST_BASE_URL ?? 'https://idebanken.ekstern.dev.nav.no'

export default defineConfig({
    testDir: './src/tests/e2e',
    outputDir: './src/tests/e2e/test-results',
    snapshotDir: './src/tests/e2e/snapshots',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html', { outputFolder: 'src/tests/e2e/playwright-report' }], ['list']],
    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        locale: 'nb-NO',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
})
