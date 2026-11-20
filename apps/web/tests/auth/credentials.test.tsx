import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';

import { LoginForm } from '@/features/auth/login-form';

test('preview submission keeps credentials out of requests and storage', async () => {
    const fetch = vi.spyOn(window, 'fetch');
    const screen = await render(<LoginForm />);
    await screen.getByLabelText('Email address').fill('ana@example.com');
    await screen.getByLabelText('Password').fill('preview-only');
    await screen.getByRole('button', { name: 'Sign in' }).click();
    await expect
        .element(screen.getByRole('status'))
        .toMatchTextContent('Sign-in isn’t available yet');
    expect(fetch).not.toHaveBeenCalled();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
});
