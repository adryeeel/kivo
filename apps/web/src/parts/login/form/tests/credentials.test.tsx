import { page } from 'vitest/browser';
import { it, vi, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { renderToString } from 'react-dom/server';

import { LoginForm } from '@/parts/login/form';

it('omits credentials from native form data before hydration', async () => {
    const container = document.body.appendChild(document.createElement('div'));
    container.innerHTML = renderToString(<LoginForm />);

    try {
        const screen = page.elementLocator(container);
        const form = screen.getByRole('form', { exact: true, name: 'Sign in' });

        await screen.getByLabelText('Email address').fill('ana@example.com');
        await screen.getByLabelText('Password', { exact: true }).fill('preview-only');
        expect([...new FormData(form.element() as HTMLFormElement)]).toEqual([]);
    } finally {
        container.remove();
    }
});

it('keeps preview credentials out of requests, storage, and native form data', async () => {
    const fetch = vi.spyOn(window, 'fetch');
    const screen = await render(<LoginForm />);
    const form = screen.getByRole('form', { exact: true, name: 'Sign in' });

    await screen.getByLabelText('Email address').fill('ana@example.com');
    await screen.getByLabelText('Password', { exact: true }).fill('preview-only');
    await screen.getByRole('button', { exact: true, name: 'Sign in' }).click();
    await expect
        .element(screen.getByRole('status'))
        .toMatchTextContent('Sign-in is unavailable right now.');

    expect([...new FormData(form.element() as HTMLFormElement)]).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);

    await expect
        .element(screen.getByLabelText('Password', { exact: true }))
        .toHaveValue('preview-only');
    await screen.getByLabelText('Password', { exact: true }).fill('updated-preview');
    await expect.element(screen.getByRole('status')).not.toBeInTheDocument();
    await screen.getByRole('button', { exact: true, name: 'Sign in' }).click();
    await expect.element(screen.getByRole('status')).toBeVisible();
    await screen.getByLabelText('Email address').fill('bruno@example.com');
    await expect.element(screen.getByRole('status')).not.toBeInTheDocument();
});
