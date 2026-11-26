import { it, expect } from 'vitest';

import { renderHome } from './utils/page';

it('explains the product and links to login', async () => {
    const screen = await renderHome();

    await expect
        .element(screen.getByRole('heading', { level: 1 }))
        .toHaveTextContent('Family money, clearer together.');

    await expect
        .element(screen.getByRole('link', { name: 'Get started' }))
        .toHaveAttribute('href', '/login');
});

it('composes one preview notice and the household dashboard', async () => {
    const screen = await renderHome();

    const notice = screen.getByRole('complementary', { name: 'Preview notice' });

    await expect.element(notice).toBeVisible();

    expect(notice.elements()).toHaveLength(1);

    await expect.element(screen.getByRole('region', { name: 'Household dashboard' })).toBeVisible();

    expect(screen.getByRole('radio').elements()).toHaveLength(0);

    expect(screen.getByRole('contentinfo').elements()).toHaveLength(0);
});
