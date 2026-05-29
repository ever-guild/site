import { expect, type Page, test } from '@playwright/test';

const states = [
  {
    name: 'hero',
    target: async (page: Page) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(page.getByRole('heading', { name: /Software that lasts/i })).toBeVisible();
    },
  },
  {
    name: 'team',
    target: async (page: Page) => {
      await page.goto('/#team');
      await expect(page.getByRole('heading', { name: /senior engineers you'll work with/i })).toBeVisible();
    },
  },
  {
    name: 'contact',
    target: async (page: Page) => {
      await page.goto('/#contact');
      await expect(page.getByRole('link', { name: /Email Ever Guild/i })).toBeVisible();
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
