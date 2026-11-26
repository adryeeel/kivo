import { it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { ThemeProvider } from '@kivo/ui/providers/theme';

import { HomePage } from '@/parts/home/page';

it('explains the product and provides a semantic link to the login preview', async () => {
    const screen = await render(<HomePage />, { wrapper: ThemeProvider });

    await expect
        .element(screen.getByRole('heading', { level: 1 }))
        .toHaveTextContent('Family money, clearer together.');
    await expect
        .element(screen.getByRole('link', { name: 'View login preview' }))
        .toHaveAttribute('href', '/login');
    await expect.element(screen.getByText(/sign-in is not available yet/i)).toBeVisible();
});

it.for([
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
])(
    'shows the hero and sample preview without horizontal overflow at $width×$height',
    async ({ width, height }) => {
        await page.viewport(width, height);
        const screen = await render(<HomePage />, { wrapper: ThemeProvider });

        await expect
            .element(screen.getByRole('link', { name: 'View login preview' }))
            .toBeVisible();
        expect(document.documentElement.scrollWidth).toBe(width);
        await expect
            .element(screen.getByRole('complementary', { name: 'A preview of your family space' }))
            .toBeVisible();
        await expect.element(screen.getByText('Monthly overview · sample data')).toBeVisible();
    },
);

it('fits the desktop hero in one viewport', async () => {
    await page.viewport(1440, 900);
    await render(<HomePage />, { wrapper: ThemeProvider });
    expect(document.documentElement.scrollHeight).toBe(900);
});

it('keeps the login link reachable by keyboard on a short screen', async () => {
    await page.viewport(320, 240);
    const screen = await render(<HomePage />, { wrapper: ThemeProvider });
    const link = screen.getByRole('link', { name: 'View login preview' });

    link.element().focus();
    await expect.element(link).toHaveFocus();
    expect(link.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(0);
    expect(link.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(240);
});

it.for([{ width: 320 }, { width: 390 }])(
    'keeps the login link reachable at 200% text on a $width px phone',
    async ({ width }) => {
        await page.viewport(width, 844);
        document.documentElement.style.fontSize = '200%';
        const screen = await render(<HomePage />, { wrapper: ThemeProvider });
        const link = screen.getByRole('link', { name: 'View login preview' });

        expect(document.documentElement.scrollWidth).toBe(width);
        link.element().focus();
        await expect.element(link).toHaveFocus();
        const bounds = link.element().getBoundingClientRect();

        expect(bounds.left).toBeGreaterThanOrEqual(0);
        expect(bounds.right).toBeLessThanOrEqual(width);
        expect(bounds.top).toBeGreaterThanOrEqual(0);
        expect(bounds.bottom).toBeLessThanOrEqual(844);
    },
);

it.for(['light', 'dark'])('keeps the savings progress legible in %s mode', async (theme) => {
    const screen = await render(<HomePage />, { wrapper: ThemeProvider });
    document.documentElement.classList.toggle('dark', theme === 'dark');

    try {
        const progress = screen.getByRole('progressbar', {
            name: 'Summer goal: €740 of €2,400 marked saved',
        });
        await expect.element(progress).toHaveAttribute('aria-valuenow', '740');
        await expect.element(progress).toHaveAttribute('aria-valuemax', '2400');
        const track = progress
            .element()
            .querySelector('[data-slot="progress-track"]') as HTMLElement;
        const indicator = progress
            .element()
            .querySelector('[data-slot="progress-indicator"]') as HTMLElement;
        const fill = luminance(getComputedStyle(indicator).backgroundColor);
        const remainder = luminance(getComputedStyle(track).backgroundColor);
        expect(
            (Math.max(fill, remainder) + 0.05) / (Math.min(fill, remainder) + 0.05),
        ).toBeGreaterThanOrEqual(3);
        expect(
            indicator.getBoundingClientRect().width / track.getBoundingClientRect().width,
        ).toBeCloseTo(740 / 2400, 2);
    } finally {
        document.documentElement.classList.remove('dark');
    }
});

function luminance(color: string) {
    const context = document.createElement('canvas').getContext('2d');
    if (!context) throw new Error('Canvas is required to resolve theme colors.');
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    const channels = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
