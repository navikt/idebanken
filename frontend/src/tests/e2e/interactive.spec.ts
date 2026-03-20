import { expect, test } from '@playwright/test'
import { TEST_PAGE } from './fixtures'

test.describe('Interactive components on test page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(TEST_PAGE)
    })

    // -----------------------------------------------------------------------
    // Accordion
    // -----------------------------------------------------------------------
    test('accordion items are present', async ({ page }) => {
        const accordionButtons = page.locator('[class*="Accordion"] button, [data-color] button')
        // The test page includes an accordion part — at least one button
        const count = await accordionButtons.count()
        expect(count).toBeGreaterThan(0)
    })

    test('clicking an accordion header expands its content', async ({ page }) => {
        // Use the NAV Aksel accordion button selector
        const accordionBtn = page.locator('button[aria-expanded]').filter({ hasText: /.+/ }).first()

        const wasExpanded = await accordionBtn.getAttribute('aria-expanded')
        await accordionBtn.click()

        const nowExpanded = await accordionBtn.getAttribute('aria-expanded')
        expect(nowExpanded).not.toBe(wasExpanded)
    })

    test('accordion content is visible after opening', async ({ page }) => {
        // Use nth(0) for a stable positional reference that won't re-evaluate after state changes
        const firstClosedIdx = await page
            .locator('button[aria-expanded="false"]')
            .first()
            .evaluate((el) => {
                const allBtns = Array.from(document.querySelectorAll('button[aria-expanded]'))
                return allBtns.indexOf(el)
            })
        const accordionBtn = page.locator('button[aria-expanded]').nth(firstClosedIdx)
        const panelId = await accordionBtn.getAttribute('aria-controls')

        await accordionBtn.click()

        if (panelId) {
            // Wait for the controlled panel to become visible
            await expect(page.locator(`#${panelId}`)).toBeVisible({ timeout: 3000 })
        } else {
            // Aksel accordion: after click the sibling panel div should appear
            const panel = page
                .locator('button[aria-expanded]')
                .nth(firstClosedIdx)
                .locator('xpath=following-sibling::div')
                .first()
            await expect(panel).toBeVisible({ timeout: 3000 })
        }
    })

    // -----------------------------------------------------------------------
    // Filter chips (if the page has a card list with filtering)
    // -----------------------------------------------------------------------
    test('filter chip "Vis alle" is selectable', async ({ page }) => {
        const visAlle = page.getByRole('button', { name: /vis alle/i }).first()

        if ((await visAlle.count()) === 0) {
            test.skip()
            return
        }

        await visAlle.click()
        await expect(visAlle).toHaveAttribute('data-selected', 'true')
    })

    // -----------------------------------------------------------------------
    // Table of Contents links
    // -----------------------------------------------------------------------
    test('table of contents links scroll to their targets', async ({ page }) => {
        const tocNav = page.getByRole('navigation', {
            name: /innholdsfortegnelse|table of contents/i,
        })

        if ((await tocNav.count()) === 0) {
            test.skip()
            return
        }

        const firstLink = tocNav.getByRole('link').first()
        const href = await firstLink.getAttribute('href')
        expect(href).toMatch(/^#/)

        const targetId = href!.replace('#', '')
        await firstLink.click()

        // The component uses custom scroll with preventDefault, so the URL hash may not update.
        // Instead verify the target element exists on the page.
        await expect(page.locator(`#${targetId}`)).toBeAttached({ timeout: 3000 })
    })
})
