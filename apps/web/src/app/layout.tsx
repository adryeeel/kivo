import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/theme-provider';

import '@fontsource-variable/manrope';

import '@/styles.css';

export const metadata: Metadata = {
  title: 'Welcome home · Kivo',
  description: 'Share expenses, settle up, and work toward your family’s goals with Kivo.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
  colorScheme: 'light dark',
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
