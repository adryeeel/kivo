import { it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { ThemeProvider } from '@kivo/ui/providers/theme';

import { HomePage } from '@/features/home/page';

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
])('fits a $width×$height viewport without scrolling', async ({ width, height }) => {
    await page.viewport(width, height);
    const screen = await render(<HomePage />, { wrapper: ThemeProvider });

    await expect.element(screen.getByRole('link', { name: 'View login preview' })).toBeVisible();
    expect(document.documentElement.scrollWidth).toBe(width);
    expect(document.documentElement.scrollHeight).toBe(height);
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
