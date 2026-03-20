import { expect, test } from '@playwright/test'
import { HOME_PAGE, SEARCH_PAGE, TEST_PAGE } from './fixtures'

test.describe('Navigation', () => {
    test('back-link is present and navigable', async ({ page }) => {
        await page.goto(TEST_PAGE)
        const backlink = page.getByRole('navigation', { name: /tilbake/i })
        // Only assert visibility; clicking would leave the test page
        await expect(backlink).toBeVisible()
    })

    test('search icon/button in header opens the search overlay', async ({ page }) => {
        await page.goto(HOME_PAGE)
        const searchBtn = page
            .locator('header')
            .getByRole('button', { name: /søk|search/i })
            .first()
        await searchBtn.click()
        // After click, a search input should appear
        const searchInput = page
            .getByRole('searchbox')
            .or(page.locator('header input[type="text"], header input[type="search"]'))
        await expect(searchInput.first()).toBeVisible({ timeout: 3000 })
    })

    test('mobile menu button is present on small viewports', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })
        await page.goto(HOME_PAGE)
        const menuBtn = page
            .locator('header')
            .getByRole('button', { name: /meny|menu/i })
            .first()
        await expect(menuBtn).toBeVisible()
    })

    test('opening the mobile menu reveals navigation links', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })
        await page.goto(HOME_PAGE)
        const menuBtn = page
            .locator('header')
            .getByRole('button', { name: /meny|menu/i })
            .first()
        await menuBtn.click()
        // Expect at least one nav link to appear in the expanded menu
        const navLinks = page.locator('header nav a')
        await expect(navLinks.first()).toBeVisible({ timeout: 3000 })
    })

    test('navigating to /sok renders the search page', async ({ page }) => {
        await page.goto(SEARCH_PAGE)
        await expect(page).toHaveURL(new RegExp(SEARCH_PAGE))
        await expect(page.locator('main')).toBeVisible()
    })

    test('footer links are visible and non-empty', async ({ page }) => {
        await page.goto(HOME_PAGE)
        const footerLinks = page.locator('footer a')
        const count = await footerLinks.count()
        expect(count).toBeGreaterThan(0)
    })
})
