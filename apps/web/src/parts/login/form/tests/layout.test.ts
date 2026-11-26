import { it, expect } from 'vitest';

import { setViewport } from '@/tests/helpers/browser';

import { renderForm } from './utils/page';

it('keeps phone fields readable and actions large enough to tap', async () => {
    await setViewport(390, 844);

    const screen = await renderForm();

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
