import { it, expect } from 'vitest';
import type { ReactNode } from 'react';
import { render } from 'vitest-browser-react';
import { page, commands, userEvent } from 'vitest/browser';

import { ThemeProvider } from '@kivo/ui/providers/theme';

import { ThemeSwitch } from '@/components/theme-switch';

function LightTheme({ children }: { children: ReactNode }) {
    return <ThemeProvider defaultTheme='light'>{children}</ThemeProvider>;
}

it('selects and persists appearance through one labeled menu', async () => {
    const screen = await render(<ThemeSwitch />, { wrapper: LightTheme });
    const trigger = screen.getByRole('button', { name: 'Appearance: Light' });

    await trigger.click();
    await expect
        .element(page.getByRole('menuitemradio', { exact: true, name: 'Light' }))
        .toHaveAttribute('aria-checked', 'true');
    await page.getByRole('menuitemradio', { exact: true, name: 'Dark' }).click();
    await expect.element(screen.getByRole('button', { name: 'Appearance: Dark' })).toHaveFocus();
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await screen.getByRole('button', { name: 'Appearance: Dark' }).click();
    await expect
        .element(page.getByRole('menuitemradio', { exact: true, name: 'Dark' }))
        .toHaveAttribute('aria-checked', 'true');
    await page.getByRole('menuitemradio', { exact: true, name: 'System' }).click();
    await expect.element(screen.getByRole('button', { name: 'Appearance: System' })).toHaveFocus();
    expect(localStorage.getItem('theme')).toBe('system');
});

it('opens by keyboard and restores focus with reduced motion', async () => {
    await commands.setReducedMotion('reduce');
    const screen = await render(<ThemeSwitch />, { wrapper: LightTheme });
    const trigger = screen.getByRole('button', { name: 'Appearance: Light' });

    await expect.element(trigger).toBeEnabled();
    trigger.element().focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(page.getByRole('menu')).toBeVisible();
    expect(getComputedStyle(page.getByRole('menu').element()).transitionProperty).toBe('opacity');
    await userEvent.keyboard('{Escape}');
    await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
});

it('keeps appearance choices within a narrow viewport at 200% text', async () => {
    await page.viewport(320, 844);
    document.documentElement.style.fontSize = '200%';
    const screen = await render(<ThemeSwitch />, { wrapper: LightTheme });

    await screen.getByRole('button', { name: 'Appearance: Light' }).click();
    const choices = page.getByRole('menuitemradio').all();
    for (const choice of choices) {
        const bounds = choice.element().getBoundingClientRect();
        expect(bounds.left).toBeGreaterThanOrEqual(0);
        expect(bounds.right).toBeLessThanOrEqual(320);
        expect(bounds.height).toBeGreaterThanOrEqual(44);
    }
    expect(document.documentElement.scrollWidth).toBe(320);
    await userEvent.keyboard('{Escape}');
});
