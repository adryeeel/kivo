import { it, expect } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { ThemeProvider } from '@kivo/ui/providers/theme';

import { LoginPage } from '@/parts/login/page';

it.for([
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
])('keeps the login usable at $width×$height', async ({ width, height }) => {
    await page.viewport(width, height);
    const screen = await render(<LoginPage />, { wrapper: ThemeProvider });
    await expect
        .element(screen.getByRole('heading', { level: 1, name: 'Welcome home.' }))
        .toBeVisible();
    expect(document.documentElement.scrollWidth).toBe(width);

    await expect.element(screen.getByRole('complementary')).not.toBeInTheDocument();
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
    const recovery = screen
        .getByRole('button', { exact: true, name: 'Forgot password?' })
        .element()
        .getBoundingClientRect();
    const password = screen
        .getByLabelText('Password', { exact: true })
        .element()
        .getBoundingClientRect();
    expect(recovery.height).toBeGreaterThanOrEqual(44);
    expect(recovery.bottom).toBeLessThanOrEqual(password.top);
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
