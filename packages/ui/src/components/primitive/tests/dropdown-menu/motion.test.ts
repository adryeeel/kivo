import { it, expect } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import { reduceMotion } from '@kivo/vitest/helpers';

import { renderMenu } from './utils/page';

it('uses opacity alone with reduced motion', async () => {
    await reduceMotion();

    const screen = await renderMenu();

    await screen.getByRole('button', { name: 'Open choices' }).click();

    const popup = page.getByRole('menu');

    await expect.element(popup).toBeVisible();
    await expect.poll(() => getComputedStyle(popup.element()).transitionProperty).toBe('opacity');

    await userEvent.keyboard('{Escape}');

    await expect.element(popup).not.toBeInTheDocument();
});
