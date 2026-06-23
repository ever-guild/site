import { expect, test } from '@playwright/test';

const services = [
  {
    title: 'Web3 & Blockchain',
    description:
      'Production-grade smart contracts and protocol integrations on TON, EVM, and NEAR. Audited patterns, built to hold real value.',
  },
  {
    title: 'AI & Automation',
    description:
      'LLM integrations, AI agents, and workflow automation wired into your product, not bolted on as an afterthought.',
  },
  {
    title: 'Full-Stack Development',
    description:
      'React, Next.js, and Node.js SaaS platforms, dashboards, and marketplaces. Shipped fast, built to scale.',
  },
  {
    title: 'Product Design & UI/UX',
    description:
      'Interfaces, prototypes, and design systems that stay clean and responsive across every screen.',
  },
  {
    title: 'Candidate Experience Verification',
    description:
      'Independent verification of claimed engineering experience for safer technical hiring decisions.',
  },
  {
    title: 'Crisis Engineering Management',
    description:
      'Rapid intervention for software projects facing delivery, quality, or team breakdowns. Restore the delivery path quickly.',
  },
];

const bannedTypographyCodePoints = [
  0x2014, 0x2015, 0x201c, 0x201d, 0x2018, 0x2019, 0x00ab, 0x00bb, 0x2026, 0x2022,
  0x25e6, 0x25aa, 0x25ab, 0x25cf, 0x25cb, 0x2705, 0x2714, 0x2726, 0x2728, 0x1f525,
  0x1f680, 0x1f4a1, 0x1f449, 0x1f539, 0x2192, 0x2190, 0x2194, 0x21d2, 0x00b7,
  0x00a0, 0x202f, 0x200b, 0x200c, 0x200d, 0xfeff,
];

test.describe('landing page content', () => {
  test('services preserve approved service lines and descriptions', async ({ page }) => {
    await page.goto('/');

    const serviceCards = page.locator('#services .services__card');
    await expect(serviceCards).toHaveCount(services.length);
    await expect(page.getByRole('heading', { name: 'What we build for you.' })).toBeVisible();
    await expect(page.getByText('Senior service lines we can own from architecture through production support.')).toBeVisible();

    for (const service of services) {
      const card = serviceCards.filter({ has: page.getByRole('heading', { name: service.title }) });

      await expect(card, `${service.title} card should exist`).toHaveCount(1);
      await expect(card.getByText(service.description)).toBeVisible();
    }
  });

  test('about section does not show GitHub proof links', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Open work from the team')).toHaveCount(0);
    await expect(page.locator('#about a[href*="github.com/ever-guild/acki.live"]')).toHaveCount(0);
    await expect(page.locator('#about a[href*="github.com/ever-guild/tvm-action"]')).toHaveCount(0);
    await expect(page.locator('#about a[href*="github.com/ever-guild/network-load"]')).toHaveCount(0);
  });

  test('services do not constrain work by fixed toolkit labels', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#services .services__toolkit')).toHaveCount(0);
    await expect(page.locator('#services .services__toolkit-group-label')).toHaveCount(0);
    await expect(page.locator('#services').getByText('Languages', { exact: true })).toHaveCount(0);
    await expect(page.locator('#services').getByText('Infrastructure', { exact: true })).toHaveCount(0);
  });

  test('contact section routes project starts to the order service', async ({ page }) => {
    await page.goto('/');

    const contact = page.locator('#contact');

    await expect(contact.getByRole('link', { name: 'Start a project' })).toHaveAttribute(
      'href',
      'https://order.ever-guild.net/',
    );
    await expect(contact.getByText('in@ever-guild.net')).toHaveCount(0);
  });

  test('visible and metadata copy avoid banned typography', async ({ page }) => {
    await page.goto('/');

    const copy = await page.evaluate(() => {
      const metaContent = Array.from(document.querySelectorAll('meta[content]'))
        .map((element) => element.getAttribute('content') ?? '')
        .join('\n');

      return `${document.body.innerText}\n${document.title}\n${metaContent}`;
    });

    for (const codePoint of bannedTypographyCodePoints) {
      const character = String.fromCodePoint(codePoint);

      expect(copy, `copy should not contain U+${codePoint.toString(16).toUpperCase()}`).not.toContain(character);
    }
  });

  test('legacy service worker URLs clear browser caches', async ({ request }) => {
    for (const path of ['/sw.js', '/service-worker.js']) {
      const response = await request.get(path);
      const body = await response.text();

      expect(response.ok(), `${path} should be served`).toBe(true);
      expect(body).toContain('caches.delete');
      expect(body).toContain('registration.unregister');
      expect(body).toContain('skipWaiting');
    }
  });
});
