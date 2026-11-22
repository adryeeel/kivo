import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { ThemeProvider } from '@project-template/ui/providers/theme';
import { MotionProvider } from '@project-template/ui/providers/motion';
import '@project-template/ui/styles.css';

import { SITE } from '@/const/site';

export const metadata: Metadata = {
    title: SITE.title,
    description: SITE.description,
    metadataBase: new URL(SITE.url),
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang={SITE.language} suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <MotionProvider>{children}</MotionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
