import { expect, test } from '@playwright/test';

function imageDelta(a: Buffer, b: Buffer) {
  if (a.length !== b.length) {
    return 1;
  }

  let changed = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (Math.abs(a[i] - b[i]) > 6) {
      changed += 1;
    }
  }

  return changed / a.length;
}

test.describe('animated design smoke', () => {
  test('hero motion changes between captured frames', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: /Software that lasts/i })).toBeVisible();

    await page.waitForTimeout(80);
    const first = await page.screenshot({
      clip: { x: 0, y: 0, width: 1440, height: 760 },
      animations: 'allow',
      caret: 'hide',
    });

    await page.waitForTimeout(520);
    const second = await page.screenshot({
      clip: { x: 0, y: 0, width: 1440, height: 760 },
      animations: 'allow',
      caret: 'hide',
    });

    expect(imageDelta(first, second), 'animated hero frame should change over time').toBeGreaterThan(0.001);
  });
});
