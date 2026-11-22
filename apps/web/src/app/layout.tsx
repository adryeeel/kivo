import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';

import { ThemeProvider } from '@kivo/ui/providers/theme';
import { MotionProvider } from '@kivo/ui/providers/motion';
import '@kivo/ui/styles.css';

import { SITE } from '@/const/site';

const publicSans = localFont({
    display: 'swap',
    src: './fonts/public-sans.ttf',
    variable: '--font-public-sans',
});
const manrope = localFont({
    display: 'swap',
    src: './fonts/manrope.ttf',
    variable: '--font-manrope',
});

export const metadata: Metadata = {
    title: SITE.title,
    description: SITE.description,
    metadataBase: new URL(SITE.url),
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
