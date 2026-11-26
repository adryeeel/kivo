import type { RenderResult } from 'vitest-browser-react';

export async function fillCredentials(screen: RenderResult) {
    await screen.getByLabelText('Email address').fill('ana@example.com');

    await screen.getByLabelText('Password', { exact: true }).fill('preview-only');
}
