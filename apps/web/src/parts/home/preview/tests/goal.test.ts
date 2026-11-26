import { it, expect } from 'vitest';

import { renderPreview } from './utils/page';

it('supplies the summer goal amounts and accessible description', async () => {
    const screen = await renderPreview();

    const progress = screen.getByRole('progressbar', {
        name: 'Summer goal: €740 of €2,400 marked saved',
    });

    await expect.element(progress).toHaveAttribute('aria-valuenow', '740');
    await expect.element(progress).toHaveAttribute('aria-valuemax', '2400');

    await expect
        .element(progress)
        .toHaveAttribute('aria-valuetext', '740 euros marked saved toward 2,400 euros');
});
