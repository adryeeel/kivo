import { it, vi, expect, onTestFinished } from 'vitest';

import { fillCredentials } from './helpers/credentials';
import { renderForm, renderStaticForm } from './utils/page';

it('omits credentials from native form data before hydration', async () => {
    const screen = renderStaticForm();
    const form = screen.getByRole('form', { exact: true, name: 'Sign in' });

    await screen.getByLabelText('Email address').fill('ana@example.com');
    await screen.getByLabelText('Password', { exact: true }).fill('preview-only');

    expect([...new FormData(form.element() as HTMLFormElement)]).toEqual([]);
});

it('keeps submitted preview credentials out of requests, storage and native form data', async () => {
    const fetch = vi.spyOn(window, 'fetch');

    onTestFinished(() => fetch.mockRestore());

    const screen = await renderForm();

    await fillCredentials(screen);
    await screen.getByRole('button', { exact: true, name: 'Sign in' }).click();

    await expect.element(screen.getByRole('status')).toBeVisible();

    const form = screen.getByRole('form', { exact: true, name: 'Sign in' });

    expect([...new FormData(form.element() as HTMLFormElement)]).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
});
