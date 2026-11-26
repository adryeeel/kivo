import Link from 'next/link';

import { ArrowRightIcon } from '@kivo/ui/icons/symbols';
import { buttonVariants } from '@kivo/ui/primitive/button';

import { SiteShell } from '@/components/site-shell';

import { FamilyPreview } from '@/parts/home/preview';

import styles from './page.module.css';

export function HomePage() {
    return (
        <SiteShell>
            <main className='flex min-w-0 items-center px-6 py-12 lg:px-12 lg:py-10 xl:px-16'>
                <div className='mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16'>
                    <div className={`${styles.enter} flex min-w-0 flex-col items-start gap-6`}>
                        <h1 className='font-heading max-w-full text-4xl leading-tight font-semibold tracking-tight wrap-anywhere sm:text-5xl xl:text-6xl'>
                            Family money, clearer together.
                        </h1>
                        <p className='text-muted-foreground max-w-md text-base leading-7'>
                            Track shared expenses, split costs, and reach your goals together. Keep
                            your personal finances private.
                        </p>
                        <Link
                            href='/login'
                            className={buttonVariants({
                                className: 'max-w-full whitespace-normal',
                            })}
                        >
                            Get started <ArrowRightIcon aria-hidden='true' data-icon='inline-end' />
                        </Link>
                    </div>
                    <FamilyPreview />
                </div>
            </main>
        </SiteShell>
    );
}
