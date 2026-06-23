import { expect, type Page, test } from '@playwright/test';

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
      page.locator('.navbar').evaluate((element) => getComputedStyle(element).backgroundColor),
    )
    .not.toBe('rgba(0, 0, 0, 0)');
}

async function waitForVisualReady(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  // Freeze animated mesh so Linux/Windows captures stay aligned.
  await page.addStyleTag({
    content: '.App::before { animation: none !important; transform: none !important; }',
  });
  await page.waitForTimeout(300);
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
      await expect(page.locator('#contact').getByRole('link', { name: /Start a project/i })).toBeVisible();
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
      maxDiffPixelRatio: 0.02,
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
      maxDiffPixelRatio: 0.02,
    });
  });

  test('team cards match approved baselines', async ({ page }, testInfo) => {
    await page.goto('/');
    await lockViewportOn(page, '#team');
    await waitForVisualReady(page);

    await expect(page.locator('.team__card').first()).toHaveScreenshot(`${testInfo.project.name}-team-card.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.03,
    });

    await page.locator('.team__card').first().hover();
    await page.waitForTimeout(300);

    await expect(page.locator('.team__card').first()).toHaveScreenshot(`${testInfo.project.name}-team-card-hover.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.03,
    });
  });

  test('solid surfaces are used instead of glass', async ({ page }) => {
    await page.goto('/');
    await lockViewportOn(page, '#team');

    const cardStyles = await page.locator('.team__card').first().evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        backgroundColor: style.backgroundColor,
        backdropFilter: style.backdropFilter,
      };
    });
    const teamCardRule = await findRuleText(page, '.team__card');

    expect(cardStyles.backgroundColor, 'team card should use an opaque surface').toMatch(/rgb/);
    expect(cardStyles.backdropFilter, 'team card should not use backdrop blur').toBe('none');
    expect(teamCardRule, 'team card should not ship glass blur rules').not.toContain('backdrop-filter');

    await page.evaluate(() => window.scrollTo(0, 360));
    await waitForScrolledNavbarEffect(page);

    const navbarRule = await findRuleText(page, '.navbar::before');
    expect(navbarRule, 'navbar should not rely on a blur pseudo-layer').toBe('');
  });

  test('team photos keep square framing', async ({ page }) => {
    await page.goto('/');
    await lockViewportOn(page, '#team');
    await waitForVisualReady(page);

    const frames = await page.locator('.team__photo').evaluateAll((elements) =>
      elements.map((element) => {
        const frame = element.getBoundingClientRect();
        const image = element.querySelector('img')?.getBoundingClientRect();

        return {
          frameWidth: frame.width,
          frameHeight: frame.height,
          imageWidth: image?.width ?? 0,
          imageHeight: image?.height ?? 0,
        };
      }),
    );

    expect(frames).toHaveLength(3);

    for (const frame of frames) {
      expect(Math.abs(frame.frameWidth - frame.frameHeight), 'team photo frame should stay square').toBeLessThan(2);
      expect(Math.abs(frame.imageWidth - frame.frameWidth), 'team image should fill frame width').toBeLessThan(2);
      expect(Math.abs(frame.imageHeight - frame.frameHeight), 'team image should fill frame height').toBeLessThan(2);
    }
  });

  for (const state of states) {
    test(`${state.name} viewport matches approved baseline`, async ({ page }, testInfo) => {
      await state.target(page);
      await waitForVisualReady(page);

      await expect(page).toHaveScreenshot(`${testInfo.project.name}-${state.name}.png`, {
        animations: 'disabled',
        caret: 'hide',
        fullPage: false,
        maxDiffPixelRatio: 0.025,
      });
    });
  }
});
