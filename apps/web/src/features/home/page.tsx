import Link from 'next/link';

import { ArrowRightIcon } from '@kivo/ui/icons/symbols';
import { buttonVariants } from '@kivo/ui/primitive/button';

import { SiteShell } from '@/components/site-shell';

export function HomePage() {
    return (
        <SiteShell>
            <main className='flex min-w-0 items-center justify-center px-6 py-8 sm:py-12'>
                <div className='hero-enter flex w-full max-w-xl flex-col items-start gap-6'>
                    <p className='text-muted-foreground text-sm'>Kivo is taking shape.</p>
                    <h1 className='font-heading max-w-full text-4xl leading-tight font-semibold tracking-tight wrap-anywhere sm:max-w-lg sm:text-5xl'>
                        Family money, clearer together.
                    </h1>
                    <p className='text-muted-foreground max-w-md text-base leading-7'>
                        We’re building Kivo to help families track shared expenses, split costs, and
                        work toward common goals—with private personal finances.
                    </p>
                    <div className='flex max-w-full flex-col items-start gap-3'>
                        <Link
                            href='/login'
                            className={buttonVariants({
                                className: 'max-w-full whitespace-normal',
                            })}
                        >
                            View login preview{' '}
                            <ArrowRightIcon aria-hidden='true' data-icon='inline-end' />
                        </Link>
                        <p className='text-muted-foreground text-xs'>
                            A first look. Sign-in is not available yet.
                        </p>
                    </div>
                </div>
            </main>
        </SiteShell>
    );
}
