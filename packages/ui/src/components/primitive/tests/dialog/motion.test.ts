import { it, expect } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import { reduceMotion } from '@kivo/vitest/helpers';

import { renderDialog } from './utils/page';

it('uses opacity alone with reduced motion', async () => {
    await reduceMotion();

    const screen = await renderDialog();

    await screen.getByRole('button', { name: 'Open details' }).click();

    const popup = page.getByRole('dialog');

    await expect.element(popup).toBeVisible();

    await expect
        .poll(() => {
            return getComputedStyle(popup.element()).transitionProperty;
        })
        .toBe('opacity');

    await userEvent.keyboard('{Escape}');

    await expect.element(popup).not.toBeInTheDocument();
});
