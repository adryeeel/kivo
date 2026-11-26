import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Manrope, Public_Sans } from 'next/font/google';

import { ThemeProvider } from '@kivo/ui/providers/theme';
import { MotionProvider } from '@kivo/ui/providers/motion';
import '@kivo/ui/styles.css';

import { SITE } from '@/const/site';

const publicSans = Public_Sans({
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-public-sans',
});
const manrope = Manrope({
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-manrope',
});

export const metadata: Metadata = {
    title: SITE.title,
    description: SITE.description,
    metadataBase: new URL(SITE.url),
};

export const viewport: Viewport = {
    initialScale: 1,
    viewportFit: 'cover',
    width: 'device-width',
    colorScheme: 'light dark',
    interactiveWidget: 'resizes-content',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang={SITE.language}
            suppressHydrationWarning
            className={`${publicSans.variable} ${manrope.variable}`}
        >
            <body>
                <ThemeProvider>
                    <MotionProvider>{children}</MotionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
