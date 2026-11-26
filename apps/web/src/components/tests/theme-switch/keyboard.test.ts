import { expect } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import { reduceMotion } from '@kivo/vitest/helpers';

import { it } from './utils/context';

it('opens by keyboard and restores focus with reduced motion', async ({ appearance: screen }) => {
    await reduceMotion();
    const trigger = screen.getByRole('button', { name: 'Appearance: Light' });

    await expect.element(trigger).toBeEnabled();
    trigger.element().focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect.element(page.getByRole('menu')).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
});
