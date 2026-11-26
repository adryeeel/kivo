import { it, expect, onTestFinished } from 'vitest';

import { renderProgress } from './utils/page';
import { luminance } from './helpers/luminance';

const themes = ['light', 'dark'];

it('sizes the indicator relative to the supplied maximum', async () => {
    const screen = await renderProgress();
    const progress = screen.getByRole('progressbar', { name: 'Upload progress' });

    await expect.element(progress).toBeVisible();

    // Track and indicator have no separate semantics; this suite owns their presentation.
    const track = progress.element().querySelector('[data-slot="progress-track"]')!;
    const indicator = progress.element().querySelector('[data-slot="progress-indicator"]')!;

    expect(
        indicator.getBoundingClientRect().width / track.getBoundingClientRect().width,
    ).toBeCloseTo(0.25, 2);
});

it.for(themes)('keeps the indicator distinguishable in %s mode', async (theme) => {
    const previous = document.documentElement.classList.contains('dark');

    onTestFinished(() => {
        document.documentElement.classList.toggle('dark', previous);
    });

    document.documentElement.classList.toggle('dark', theme === 'dark');

    const screen = await renderProgress();
    const progress = screen.getByRole('progressbar', { name: 'Upload progress' });

    await expect.element(progress).toBeVisible();

    const track = progress.element().querySelector('[data-slot="progress-track"]')!;
    const indicator = progress.element().querySelector('[data-slot="progress-indicator"]')!;
    const fill = luminance(getComputedStyle(indicator).backgroundColor);
    const remainder = luminance(getComputedStyle(track).backgroundColor);

    expect(
        (Math.max(fill, remainder) + 0.05) / (Math.min(fill, remainder) + 0.05),
    ).toBeGreaterThanOrEqual(3);
});
