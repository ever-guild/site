import { expect, test } from '@playwright/test';

test.describe('hero stability and controlled motion', () => {
  test('hero renders immediately without decorative motion', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: /Build what lasts/i })).toBeVisible();

    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
    await expect(page.locator('.hero__scope')).toBeVisible();
    await expect(page.locator('.hero__matrix-panel')).toHaveCount(0);
  });

  test('technology marquee moves only when motion is enabled', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const marqueeTrack = page.locator('.services__technology-track');
    await expect(marqueeTrack).toBeVisible();

    const animationName = await marqueeTrack.evaluate((element) => {
      return getComputedStyle(element).animationName;
    });

    expect(animationName).toBe('technology-scroll');
  });
});
