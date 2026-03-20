import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { HOME_PAGE, SEARCH_PAGE, TEST_PAGE } from './fixtures'

const PAGES_TO_AUDIT = [
    { name: 'Home page', path: HOME_PAGE },
    { name: 'Test/content page', path: TEST_PAGE },
    { name: 'Search page', path: SEARCH_PAGE },
]

for (const { name, path } of PAGES_TO_AUDIT) {
    test.describe(`Accessibility – ${name}`, () => {
        test('has no detectable WCAG 2.1 AA violations', async ({ page }) => {
            await page.goto(path)
            await page.waitForLoadState('networkidle')

            const results = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .exclude('#skyra-widget')
                .exclude('[data-testid="cookie-banner"]')
                .analyze()

            const violations = results.violations
                .map((v) => ({
                    id: v.id,
                    impact: v.impact,
                    description: v.description,
                    nodes: v.nodes.length,
                    help: v.helpUrl,
                }))
                // filter out svg image alt violation as it comes from aksel accordion and is not fixable by us
                .filter((it) => it.id !== 'svg-img-alt')

            expect(
                violations,
                `axe found ${violations.length} violation(s):\n${JSON.stringify(violations, null, 2)}`
            ).toHaveLength(0)
        })

        test('all images have alt text or are marked decorative', async ({ page }) => {
            await page.goto(path)
            await page.waitForLoadState('networkidle')
            const results = await new AxeBuilder({ page }).withRules(['image-alt']).analyze()
            expect(results.violations, JSON.stringify(results.violations, null, 2)).toHaveLength(0)
        })

        test('interactive elements are keyboard-accessible', async ({ page }) => {
            await page.goto(path)
            await page.waitForLoadState('networkidle')
            const results = await new AxeBuilder({ page })
                .withRules(['button-name', 'link-name', 'label'])
                .analyze()
            expect(results.violations, JSON.stringify(results.violations, null, 2)).toHaveLength(0)
        })

        test('color contrast meets WCAG AA', async ({ page }) => {
            await page.goto(path)
            await page.waitForLoadState('networkidle')
            const results = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
            expect(results.violations, JSON.stringify(results.violations, null, 2)).toHaveLength(0)
        })
    })
}

test.describe('Keyboard navigation', () => {
    test('Tab key moves focus through interactive elements', async ({ page }) => {
        await page.goto(TEST_PAGE)
        await page.keyboard.press('Tab')
        await expect(page.locator(':focus')).toBeVisible()
    })
})
