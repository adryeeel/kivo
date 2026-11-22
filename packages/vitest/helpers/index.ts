import { cdp } from 'vitest/browser';
import type { CDPSession } from '@vitest/browser-playwright';

export async function reduceMotion() {
    const session: CDPSession = cdp();

    await session.send('Emulation.setEmulatedMedia', {
        features: [{ value: 'reduce', name: 'prefers-reduced-motion' }],
    });

    return async () => {
        await session.send('Emulation.setEmulatedMedia', { features: [] });
    };
}
