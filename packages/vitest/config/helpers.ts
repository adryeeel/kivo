import { onTestFinished } from 'vitest';
import { commands } from 'vitest/browser';

declare module 'vitest/browser' {
    interface BrowserCommands {
        setReducedMotion(value: 'reduce' | 'no-preference'): Promise<void>;
    }
}

export async function reduceMotion() {
    const previous = matchMedia('(prefers-reduced-motion: reduce)').matches;

    onTestFinished(() => commands.setReducedMotion(previous ? 'reduce' : 'no-preference'));

    await commands.setReducedMotion('reduce');
}
