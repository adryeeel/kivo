import { render } from 'vitest-browser-react';

import { ThemeProvider } from '@kivo/ui/providers/theme';

import { FamilyPreview } from '@/parts/home/preview';

export function renderPreview() {
    // Match the home hero's phone gutters so enlarged-text cases keep the real card width.
    return render(
        <div className='px-6'>
            <FamilyPreview />
        </div>,
        { wrapper: ThemeProvider },
    );
}
