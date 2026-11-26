import { expect } from 'vitest';
import { page } from 'vitest/browser';

import { it } from './utils/context';

const themes = [
    { name: 'Dark', value: 'dark' },
    { name: 'System', value: 'system' },
];

it('marks the current appearance in one labeled menu', async ({ appearance }) => {
    await appearance.getByRole('button', { name: 'Appearance: Light' }).click();

    await expect.element(page.getByRole('group', { name: 'Appearance' })).toBeVisible();

    await expect
        .element(page.getByRole('menuitemradio', { exact: true, name: 'Light' }))
        .toHaveAttribute('aria-checked', 'true');
});

it.for(themes)('selects and persists $name appearance', async ({ name, value }, { appearance }) => {
    await appearance.getByRole('button', { name: 'Appearance: Light' }).click();
    await page.getByRole('menuitemradio', { name, exact: true }).click();

    const trigger = appearance.getByRole('button', { name: `Appearance: ${name}` });

    await expect.element(trigger).toHaveFocus();
    expect(localStorage.getItem('theme')).toBe(value);

    const dark = value === 'dark' || matchMedia('(prefers-color-scheme: dark)').matches;

    expect(document.documentElement.classList.contains('dark')).toBe(dark);

    await trigger.click();

    await expect
        .element(page.getByRole('menuitemradio', { name, exact: true }))
        .toHaveAttribute('aria-checked', 'true');
});
