import { it, expect } from 'vitest';

import { renderPreview } from './utils/page';

it('loads the three family portraits', async () => {
    const screen = await renderPreview();

    for (const name of ['Ana', 'You', 'Leo']) {
        const portrait = screen.getByRole('img', { name, exact: true });

        await expect.element(portrait).toBeVisible();

        await expect
            .poll(() => (portrait.element() as HTMLImageElement).naturalWidth)
            .toBeGreaterThan(0);
    }
});
