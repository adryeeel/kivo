import { render } from 'vitest-browser-react';

import { ThemeProvider } from '@kivo/ui/providers/theme';

import { FamilyPreview } from '@/parts/home/preview';

export function renderPreview() {
    return render(<FamilyPreview />, { wrapper: ThemeProvider });
}
