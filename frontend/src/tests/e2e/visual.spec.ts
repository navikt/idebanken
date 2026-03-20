import { expect, test } from '@playwright/test'
import { TEST_PAGE } from './fixtures'

/**
 * Visual regression snapshots.
 * First run: Playwright generates baseline images (tests pass automatically).
 * Subsequent runs: images are compared against the baseline.
 * After intentional design changes, regenerate with: npx playwright test --update-snapshots
 */

/** Hide volatile elements (cookie banner, Skyra widget) before snapshotting */
async function hideVolatileElements(page: import('@playwright/test').Page) {
    await page.evaluate(() => {
        document
            .querySelectorAll('[data-testid="cookie-banner"], #skyra-widget, [id^="skyra"]')
            .forEach((el) => ((el as HTMLElement).style.display = 'none'))
    })
}

test.describe('Visual regression', () => {
    test('test/content page matches snapshot', async ({ page }) => {
        await page.goto(TEST_PAGE)
        await page.waitForLoadState('networkidle')
        await hideVolatileElements(page)
        await expect(page).toHaveScreenshot('test-page.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.02,
        })
    })

    test('header matches snapshot', async ({ page }) => {
        await page.goto(TEST_PAGE)
        await page.waitForLoadState('networkidle')
        await hideVolatileElements(page)
        await expect(page.locator('header').first()).toHaveScreenshot('header.png', {
            maxDiffPixelRatio: 0.02,
        })
    })

    test('footer matches snapshot', async ({ page }) => {
        await page.goto(TEST_PAGE)
        await page.waitForLoadState('networkidle')
        await hideVolatileElements(page)
        await expect(page.locator('footer').first()).toHaveScreenshot('footer.png', {
            maxDiffPixelRatio: 0.02,
        })
    })
})
