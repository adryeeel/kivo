import Link from 'next/link';
import type { ReactNode } from 'react';

import { Brand } from '@/components/brand';
import { ThemeSwitch } from '@/components/theme-switch';
import { PreviewBanner } from '@/components/preview-banner';

interface Props {
    children: ReactNode;
}

export function SiteShell({ children }: Props) {
    return (
        <div className='grid min-h-svh w-full grid-rows-[auto_auto_1fr_auto]'>
            <PreviewBanner />
            <header className='flex min-w-0 flex-wrap items-center justify-between gap-4 border-b px-6 py-4 lg:px-12 xl:px-16'>
                <Link
                    href='/'
                    aria-label='Kivo home'
                    className='inline-flex min-h-11 items-center rounded-md'
                >
                    <Brand />
                </Link>
                <ThemeSwitch />
            </header>
            {children}
            <footer className='text-muted-foreground border-t px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))] text-center text-sm'>
                © Kivo
            </footer>
        </div>
    );
}
