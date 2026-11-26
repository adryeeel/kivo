import { expect } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import { enlargeText, setViewport } from '@/tests/helpers/browser';

import { it } from './utils/context';

it('keeps appearance choices within a narrow viewport at 200% text', async ({
    appearance: screen,
}) => {
    await setViewport(320, 844);
    enlargeText();

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
