import { afterEach, beforeEach } from 'vitest';
import { page, commands } from 'vitest/browser';
import 'vitest-browser-react';

import '@kivo/ui/styles.css';

beforeEach(async () => {
    localStorage.clear();
    sessionStorage.clear();

    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('style');

    // Next injects font variables; use sans-serif fallbacks outside its runtime.
    document.documentElement.style.setProperty('--font-public-sans', 'Arial, sans-serif');
    document.documentElement.style.setProperty('--font-manrope', 'Arial, sans-serif');

    await commands.setReducedMotion('no-preference');
    await page.viewport(1440, 900);
});

afterEach(async () => {
    document.documentElement.style.removeProperty('font-size');
    await commands.setReducedMotion('no-preference');
});
