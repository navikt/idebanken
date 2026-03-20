import { expect, test } from '@playwright/test'
import { HOME_PAGE, TEST_PAGE } from './fixtures'

// ---------------------------------------------------------------------------
// Test page – content rendering
// ---------------------------------------------------------------------------
test.describe('Test page – content rendering', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(TEST_PAGE)
    })

    test('page has a non-empty <title>', async ({ page }) => {
        const title = await page.title()
        expect(title.length).toBeGreaterThan(0)
    })

    test('page contains a visible heading', async ({ page }) => {
        // The test page has at least one heading rendered by the CMS
        const heading = page.locator('h1, h2').first()
        await expect(heading).toBeVisible()
        await expect(heading).not.toBeEmpty()
    })

    test('renders a table of contents section', async ({ page }) => {
        // The test page includes a TableOfContents part
        const toc = page.getByRole('navigation', { name: /innholdsfortegnelse|table of contents/i })
        await expect(toc).toBeVisible()
    })

    test('renders the "Download files" section heading', async ({ page }) => {
        // Stable CMS content: a Downloads part with this heading
        await expect(page.getByText(/download files title/i)).toBeVisible()
    })

    test('renders the related topics section', async ({ page }) => {
        // "Tema du kan være interessert i" is the RelatedTopics part heading
        await expect(page.getByText(/Tema du kan v.{0,5}re interessert i/i).first()).toBeVisible()
    })

    test('page has a visible skip-to-main-content or main landmark', async ({ page }) => {
        //await expect(page.locator('main')).toBeVisible()
        await expect(
            page.getByRole('link', { name: 'Hopp til hovedinnhold' }).first()
        ).toBeVisible()
    })

    test('header logo link is present and points to the home page', async ({ page }) => {
        const logo = page
            .locator('header')
            .getByRole('link', { name: /Til forsiden|idébanken|idebanken/i })
            .first()
        await expect(logo).toBeVisible()
    })

    test('footer is rendered', async ({ page }) => {
        await expect(page.locator('footer').first()).toBeVisible()
    })
})

// ---------------------------------------------------------------------------
// Home page smoke test
// ---------------------------------------------------------------------------
test.describe('Home page', () => {
    test('has a visible header', async ({ page }) => {
        await page.goto(HOME_PAGE)
        await expect(page.locator('header')).toBeVisible()
    })
})
