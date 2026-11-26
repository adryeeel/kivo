import { it, expect } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import { reduceMotion } from '@kivo/vitest/helpers';

import { renderForm } from './utils/page';

it('keeps help keyboard-operable with reduced motion', async () => {
    await reduceMotion();

    const screen = await renderForm();

    const trigger = screen.getByRole('button', { exact: true, name: 'Forgot password?' });

    await trigger.click();

    await expect.element(page.getByRole('dialog')).toBeVisible();

    await userEvent.keyboard('{Escape}');

    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();

    await expect.element(trigger).toHaveFocus();
});
