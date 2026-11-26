import { it, expect } from 'vitest';

import { setViewport, enlargeText } from '@/tests/helpers/browser';

import { renderLogin } from './utils/page';

const viewports = [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
];

const phones = [{ width: 320 }, { width: 390 }];

it.for(viewports)('keeps the login usable at $width×$height', async ({ width, height }) => {
    await setViewport(width, height);

    const screen = await renderLogin();

    await expect
        .element(screen.getByRole('heading', { level: 1, name: 'Welcome home.' }))
        .toBeVisible();

    expect(document.documentElement.scrollWidth).toBe(width);

    await expect
        .element(screen.getByRole('complementary', { name: 'Preview notice' }))
        .toBeVisible();

    await expect
        .element(screen.getByRole('complementary', { name: 'Your family space' }))
        .not.toBeInTheDocument();
});

it.for(phones)(
    'keeps login controls reachable at 200% text on a $width px phone',
    async ({ width }) => {
        await setViewport(width, 844);

        enlargeText();

        const screen = await renderLogin();

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
