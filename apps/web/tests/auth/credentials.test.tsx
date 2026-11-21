import { renderToString } from 'react-dom/server';
import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { LoginForm } from '@/features/auth/login-form';

test('unhydrated preview omits credentials from native form submission', async () => {
    const container = document.body.appendChild(document.createElement('div'));
    container.innerHTML = renderToString(<LoginForm />);
    try {
        const screen = page.elementLocator(container);
        await screen.getByLabelText('Email address').fill('ana@example.com');
        await screen.getByLabelText('Password').fill('preview-only');
        expect([...new FormData(container.querySelector('form')!)]).toEqual([]);
    } finally {
        container.remove();
    }
});

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
