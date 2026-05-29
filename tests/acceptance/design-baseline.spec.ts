import { expect, type Page, test } from '@playwright/test';

async function lockViewportOn(page: Page, selector: string) {
  const section = page.locator(selector);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);

  const box = await section.boundingBox();
  const viewport = page.viewportSize();
  expect(box, `${selector} should be measurable after scrolling`).not.toBeNull();
  expect(viewport, 'viewport should be available').not.toBeNull();
  expect(box?.y, `${selector} should be inside the captured viewport`).toBeLessThan((viewport?.height ?? 0) * 0.7);
  expect((box?.y ?? 0) + (box?.height ?? 0), `${selector} should not be above the captured viewport`).toBeGreaterThan(0);
}

const states = [
  {
    name: 'hero',
    target: async (page: Page) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await expect(page.getByRole('heading', { name: /Software that lasts/i })).toBeVisible();
    },
  },
  {
    name: 'team',
    target: async (page: Page) => {
      await page.goto('/');
      await lockViewportOn(page, '#team');
      await expect(page.getByRole('heading', { name: /senior engineers you'll work with/i })).toBeVisible();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
    },
  },
  {
    name: 'contact',
    target: async (page: Page) => {
      await page.goto('/');
      await lockViewportOn(page, '#contact');
      await expect(page.getByRole('link', { name: /Email Ever Guild/i })).toBeVisible();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
    },
  },
];

test.describe('design baseline', () => {
  for (const state of states) {
    test(`${state.name} viewport matches approved baseline`, async ({ page }, testInfo) => {
      await state.target(page);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot(`${testInfo.project.name}-${state.name}.png`, {
        animations: 'disabled',
        caret: 'hide',
        fullPage: false,
        maxDiffPixelRatio: 0.015,
      });
    });
  }
});
