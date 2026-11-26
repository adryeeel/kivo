import { it, expect } from 'vitest';

import { reduceMotion } from '@kivo/vitest/helpers';

import { renderHome } from './utils/page';

it('removes hero translation when reduced motion is requested', async () => {
    const screen = await renderHome();
    // The copy wrapper owns the CSS-module entrance transition.
    const copy = screen.getByRole('heading', { level: 1 }).element().parentElement!;

    await expect.poll(() => getComputedStyle(copy).transitionProperty).toBe('opacity, transform');

    await reduceMotion();

    await expect.poll(() => getComputedStyle(copy).transitionProperty).toBe('opacity');
    expect(getComputedStyle(copy).transform).toBe('none');
});

it('keeps the main background free of decorative gradients', async () => {
    const screen = await renderHome();

    expect(getComputedStyle(screen.getByRole('main').element()).backgroundImage).toBe('none');
});
