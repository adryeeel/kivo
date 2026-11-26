import { it, expect } from 'vitest';

import { enlargeText, setViewport } from '@/tests/helpers/browser';

import { renderHome } from './utils/page';

const viewports = [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
];

const phones = [{ width: 320 }, { width: 390 }];

it.for(viewports)('fits the hero and preview at $width×$height', async ({ width, height }) => {
    await setViewport(width, height);
    const screen = await renderHome();

    await expect.element(screen.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect
        .element(screen.getByRole('complementary', { name: 'Your family space' }))
        .toBeVisible();
    expect(document.documentElement.scrollWidth).toBe(width);
});

it('fits the desktop hero in one viewport', async () => {
    await setViewport(1440, 900);
    await renderHome();

    expect(document.documentElement.scrollHeight).toBe(900);
});

it('keeps the login link reachable on a short screen', async () => {
    await setViewport(320, 240);
    const screen = await renderHome();
    const link = screen.getByRole('link', { name: 'Get started' });

    link.element().focus();
    await expect.element(link).toHaveFocus();
    const bounds = link.element().getBoundingClientRect();

    expect(bounds.top).toBeGreaterThanOrEqual(0);
    expect(bounds.bottom).toBeLessThanOrEqual(240);
});

it.for(phones)(
    'keeps the login link reachable at 200% text on a $width px phone',
    async ({ width }) => {
        await setViewport(width, 844);
        enlargeText();
        const screen = await renderHome();
        const link = screen.getByRole('link', { name: 'Get started' });

        link.element().focus();
        await expect.element(link).toHaveFocus();
        const bounds = link.element().getBoundingClientRect();

        expect(document.documentElement.scrollWidth).toBe(width);
        expect(bounds.left).toBeGreaterThanOrEqual(0);
        expect(bounds.right).toBeLessThanOrEqual(width);
        expect(bounds.top).toBeGreaterThanOrEqual(0);
        expect(bounds.bottom).toBeLessThanOrEqual(844);
    },
);
