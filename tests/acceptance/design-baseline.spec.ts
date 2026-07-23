import { expect, type Page, test } from '@playwright/test';

async function lockViewportOn(page: Page, selector: string) {
  const section = page.locator(selector);
  await section.evaluate((el) => el.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(200);

  const box = await section.boundingBox();
  const viewport = page.viewportSize();
  expect(box, `${selector} should be measurable after scrolling`).not.toBeNull();
  expect(viewport, 'viewport should be available').not.toBeNull();
}

async function waitForScrolledNavbarEffect(page: Page) {
  await expect(page.locator('.navbar')).toHaveClass(/navbar--scrolled/);
}

async function waitForVisualReady(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
}

const states = [
  {
    name: 'hero',
    target: async (page: Page) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await expect(page.getByRole('heading', { name: /Build what lasts/i })).toBeVisible();
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
      const projectLink = page.getByRole('link', { name: /Start a project with Ever Guild/i });
      await expect(projectLink).toBeVisible();
      await expect(projectLink).toHaveAttribute('href', 'https://order.ever-guild.net/');
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
    },
  },
  {
    name: 'technology',
    target: async (page: Page) => {
      await page.goto('/');
      await lockViewportOn(page, '.services__technology');
      await expect(page.locator('.services__technology')).toBeVisible();
      await expect(page.getByText('Technology', { exact: true })).toBeVisible();
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
      maxDiffPixelRatio: 0.03,
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
      maxDiffPixelRatio: 0.03,
    });
  });

  test('engineering cards match approved baselines', async ({ page }, testInfo) => {
    await page.goto('/');
    await lockViewportOn(page, '#team');
    await waitForVisualReady(page);
    await page.addStyleTag({ content: '.navbar { visibility: hidden !important; }' });

    await expect(page.locator('.team__card').first()).toHaveScreenshot(`${testInfo.project.name}-team-card.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.035,
    });

    await page.locator('.team__card').first().hover();
    await page.waitForTimeout(200);

    await expect(page.locator('.team__card').first()).toHaveScreenshot(`${testInfo.project.name}-team-card-hover.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.035,
    });
  });

  test('clean light neutral system invariants are active', async ({ page }) => {
    await page.goto('/');
    await lockViewportOn(page, '#team');

    const cardStyles = await page.locator('.team__card').first().evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        backgroundColor: style.backgroundColor,
        borderWidth: style.borderTopWidth,
      };
    });

    expect(cardStyles.borderWidth, 'team card should keep a 1px border').toBe('1px');

    await page.evaluate(() => window.scrollTo(0, 360));
    await waitForScrolledNavbarEffect(page);

    const isScrolled = await page.locator('.navbar').evaluate((element) => element.classList.contains('navbar--scrolled'));
    expect(isScrolled, 'scrolled navbar should have navbar--scrolled class').toBe(true);
  });

  for (const state of states) {
    test(`${state.name} viewport matches approved baseline`, async ({ page }, testInfo) => {
      await state.target(page);
      await waitForVisualReady(page);

      await expect(page).toHaveScreenshot(`${testInfo.project.name}-${state.name}.png`, {
        animations: 'disabled',
        caret: 'hide',
        fullPage: false,
        maxDiffPixelRatio: 0.045,
      });
    });
  }
});
