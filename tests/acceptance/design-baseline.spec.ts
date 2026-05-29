import { expect, type Page, test } from '@playwright/test';

function alphaFromRgb(color: string) {
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (!match) return 1;

  const parts = match[1].split(',').map((part) => part.trim());
  return parts.length === 4 ? Number(parts[3]) : 1;
}

async function findRuleText(page: Page, selector: string) {
  return page.evaluate((targetSelector) => {
    const matches: string[] = [];

    for (const sheet of Array.from(document.styleSheets)) {
      for (const rule of Array.from(sheet.cssRules)) {
        if (rule instanceof CSSStyleRule && rule.selectorText.includes(targetSelector)) {
          matches.push(rule.cssText);
        }
      }
    }

    return matches.join('\n');
  }, selector);
}

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

async function waitForScrolledNavbarEffect(page: Page) {
  await expect(page.locator('.navbar')).toHaveClass(/navbar--scrolled/);
  await expect
    .poll(() =>
      page.locator('.navbar').evaluate((element) => Number(getComputedStyle(element, '::before').opacity)),
    )
    .toBeGreaterThan(0.95);
}

async function waitForVisualReady(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.locator('canvas').first().waitFor({ state: 'attached', timeout: 3_000 }).catch(() => undefined);
  await page.waitForTimeout(500);
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
  test('navbar matches approved baseline', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.locator('.navbar')).toBeVisible();
    await waitForVisualReady(page);

    await expect(page.locator('.navbar')).toHaveScreenshot(`${testInfo.project.name}-navbar.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixels: 20,
    });
  });

  test('scrolled navbar effects match approved baseline', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 360));
    await waitForScrolledNavbarEffect(page);
    await waitForVisualReady(page);

    await expect(page.locator('.navbar')).toHaveScreenshot(`${testInfo.project.name}-navbar-scrolled.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixels: 30,
    });
  });

  test('glass surfaces match approved baselines', async ({ page }, testInfo) => {
    await page.goto('/');
    await lockViewportOn(page, '#team');
    await waitForVisualReady(page);

    await expect(page.locator('.team__card').first()).toHaveScreenshot(`${testInfo.project.name}-team-glass.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixels: 80,
    });

    await page.locator('.team__card').first().hover();
    await page.waitForTimeout(300);

    await expect(page.locator('.team__card').first()).toHaveScreenshot(`${testInfo.project.name}-team-glass-hover.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixels: 80,
    });
  });

  test('glass and transparency effects are active', async ({ page }) => {
    await page.goto('/');
    await lockViewportOn(page, '#team');

    const glassStyles = await page.locator('.team__card').first().evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        backgroundColor: style.backgroundColor,
      };
    });
    const teamCardRule = await findRuleText(page, '.team__card');

    expect(alphaFromRgb(glassStyles.backgroundColor), 'team card should keep a translucent glass background').toBeLessThan(1);
    expect(teamCardRule, 'team card should keep a backdrop blur CSS rule').toContain('backdrop-filter');
    expect(teamCardRule, 'team card should keep a backdrop blur CSS rule').toContain('blur');

    await page.evaluate(() => window.scrollTo(0, 360));
    await waitForScrolledNavbarEffect(page);

    const navbarEffect = await page.locator('.navbar').evaluate((element) => {
      const style = getComputedStyle(element, '::before');
      return {
        opacity: style.opacity,
      };
    });
    const navbarRule = await findRuleText(page, '.navbar::before');

    expect(Number(navbarEffect.opacity), 'scrolled navbar blur layer should be visible').toBeGreaterThan(0.9);
    expect(navbarRule, 'scrolled navbar should keep backdrop blur CSS rule').toContain('backdrop-filter');
    expect(navbarRule, 'scrolled navbar should keep backdrop blur CSS rule').toContain('blur');
  });

  for (const state of states) {
    test(`${state.name} viewport matches approved baseline`, async ({ page }, testInfo) => {
      await state.target(page);
      await waitForVisualReady(page);

      await expect(page).toHaveScreenshot(`${testInfo.project.name}-${state.name}.png`, {
        animations: 'disabled',
        caret: 'hide',
        fullPage: false,
        maxDiffPixelRatio: 0.0005,
      });
    });
  }
});
