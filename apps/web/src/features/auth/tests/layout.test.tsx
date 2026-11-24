import { it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { ThemeProvider } from '@kivo/ui/providers/theme';

import { LoginPage } from '@/features/auth/page';

it.for([
    { width: 320, height: 568, previewVisible: false },
    { width: 390, height: 844, previewVisible: false },
    { width: 768, height: 1024, previewVisible: false },
    { width: 1440, height: 900, previewVisible: true },
])('keeps the login usable at $width×$height', async ({ width, height, previewVisible }) => {
    await page.viewport(width, height);
    const screen = await render(<LoginPage />, { wrapper: ThemeProvider });
    const preview = screen.getByRole('complementary', {
        includeHidden: true,
        name: 'A preview of your family space',
    });

    await expect
        .element(screen.getByRole('heading', { level: 1, name: 'Welcome home.' }))
        .toBeVisible();
    expect(document.documentElement.scrollWidth).toBe(width);

    await expect.poll(() => preview.element().checkVisibility()).toBe(previewVisible);
});

it('keeps phone fields readable and actions large enough to tap', async () => {
    await page.viewport(390, 844);
    const screen = await render(<LoginPage />, { wrapper: ThemeProvider });
    const email = screen.getByLabelText('Email address');
    const submit = screen.getByRole('button', { exact: true, name: 'Sign in' });
    const reveal = screen.getByRole('button', { name: 'Show password' });

    expect(getComputedStyle(email.element()).fontSize).toBe('16px');
    expect(submit.element().getBoundingClientRect().height).toBeGreaterThanOrEqual(44);
    expect(reveal.element().getBoundingClientRect().height).toBeGreaterThanOrEqual(44);
    expect(reveal.element().getBoundingClientRect().width).toBeGreaterThanOrEqual(44);
});

it.for([{ width: 320 }, { width: 390 }])(
    'keeps login controls reachable at 200% text on a $width px phone',
    async ({ width }) => {
        await page.viewport(width, 844);
        document.documentElement.style.fontSize = '200%';
        const screen = await render(<LoginPage />, { wrapper: ThemeProvider });

        expect(document.documentElement.scrollWidth).toBe(width);

        for (const control of [
            screen.getByLabelText('Email address'),
            screen.getByLabelText('Password', { exact: true }),
            screen.getByRole('button', { exact: true, name: 'Sign in' }),
            screen.getByRole('button', { exact: true, name: 'Forgot password?' }),
            screen.getByRole('button', { exact: true, name: 'Create an account' }),
        ]) {
            control.element().focus();
            await expect.element(control).toHaveFocus();
            const bounds = control.element().getBoundingClientRect();

            expect(bounds.left).toBeGreaterThanOrEqual(0);
            expect(bounds.right).toBeLessThanOrEqual(width);
            expect(bounds.top).toBeGreaterThanOrEqual(0);
            expect(bounds.bottom).toBeLessThanOrEqual(844);
        }
    },
);
