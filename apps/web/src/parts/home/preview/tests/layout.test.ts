import { it, expect } from 'vitest';

import { setTheme, enlargeText, setViewport } from '@/tests/helpers/browser';

import { renderPreview } from './utils/page';

const viewports = [
    { width: 320, theme: 'light' },
    { width: 390, theme: 'light' },
    { width: 1440, theme: 'light' },
    { width: 320, theme: 'dark' },
    { width: 390, theme: 'dark' },
    { width: 1440, theme: 'dark' },
];

const phones = [{ width: 320 }, { width: 390 }];

it.for(viewports)(
    'fits the preview within a $width px viewport in $theme mode',
    async ({ width, theme }) => {
        await setViewport(width, 900);

        const screen = await renderPreview();

        setTheme(theme);

        await expect
            .element(screen.getByRole('region', { name: 'Household dashboard' }))
            .toBeVisible();

        await expect.element(screen.getByText('Monthly overview')).toBeVisible();

        expect(document.documentElement.scrollWidth).toBe(width);
    },
);

it.for(phones)(
    'keeps portraits inside the card at 200% text on a $width px phone',
    async ({ width }) => {
        await setViewport(width, 844);

        enlargeText();

        const screen = await renderPreview();

        const preview = screen.getByRole('region', { name: 'Household dashboard' }).element();

        const card = preview.getBoundingClientRect();

        const padding = getComputedStyle(preview);

        for (const name of ['Ana', 'You', 'Leo']) {
            const portrait = screen.getByRole('img', { name, exact: true });

            await expect.element(portrait).toBeVisible();

            const bounds = portrait.element().getBoundingClientRect();

            expect(bounds.left).toBeGreaterThanOrEqual(card.left + parseFloat(padding.paddingLeft));

            expect(bounds.right).toBeLessThanOrEqual(card.right - parseFloat(padding.paddingRight));
        }
    },
);

it.for(phones)(
    'keeps summary amounts within their columns at 200% text on a $width px phone',
    async ({ width }) => {
        await setViewport(width, 844);

        enlargeText();

        const screen = await renderPreview();

        for (const text of ['€1,280', '€60']) {
            const amount = screen.getByText(text, { exact: true }).element();

            // Each description-list value must fit its own grid column.
            const column = amount.parentElement!.getBoundingClientRect();

            const bounds = amount.getBoundingClientRect();

            expect(bounds.left).toBeGreaterThanOrEqual(column.left);

            expect(bounds.right).toBeLessThanOrEqual(column.right);
        }

        expect(document.documentElement.scrollWidth).toBe(width);
    },
);
