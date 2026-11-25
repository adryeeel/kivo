import Link from 'next/link';

import { ArrowRightIcon } from '@kivo/ui/icons/symbols';
import { buttonVariants } from '@kivo/ui/primitive/button';

import { SiteShell } from '@/components/site-shell';

import { FamilyPreview } from '@/parts/home/preview';

export function HomePage() {
    return (
        <SiteShell>
            <main className='flex min-w-0 items-center px-6 py-10 lg:px-12 lg:py-14 xl:px-16'>
                <div className='mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16'>
                    <div className='hero-enter flex min-w-0 flex-col items-start gap-6'>
                        <p className='text-muted-foreground text-sm'>Kivo is taking shape.</p>
                        <h1 className='font-heading max-w-full text-4xl leading-tight font-semibold tracking-tight wrap-anywhere sm:text-5xl xl:text-6xl'>
                            Family money, clearer together.
                        </h1>
                        <p className='text-muted-foreground max-w-md text-base leading-7'>
                            Shared expenses. Goals you reach together. We’re building one clear
                            place for family money, with personal finances kept private.
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
                            <p className='text-muted-foreground text-sm'>
                                A first look. Sign-in is not available yet.
                            </p>
                        </div>
                    </div>
                    <FamilyPreview />
                </div>
            </main>
        </SiteShell>
    );
}
