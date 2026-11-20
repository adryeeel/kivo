import { beforeEach } from 'vitest';
import { commands, page } from 'vitest/browser';
import 'vitest-browser-react';
import '@fontsource-variable/manrope';

import '@/styles.css';

beforeEach(async () => {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('style');
    localStorage.clear();
    sessionStorage.clear();
    await commands.setColorScheme('light');
    await page.viewport(1440, 900);
});
