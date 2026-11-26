import { UsersIcon } from '@kivo/ui/icons/symbols';
import { Separator } from '@kivo/ui/primitive/separator';
import { Avatar, AvatarImage, AvatarGroup, AvatarFallback } from '@kivo/ui/primitive/avatar';

import { PreviewGoal } from './components/goal';
import { PreviewSummary } from './components/summary';
import { PreviewExpense } from './components/expense';

export function FamilyPreview() {
    return (
        <aside
            aria-label='Your family space'
            className='w-full max-w-xl min-w-0 justify-self-center lg:justify-self-end'
        >
            <section
                aria-label='Household dashboard'
                className='bg-card @container flex flex-col gap-6 rounded-3xl p-6 wrap-anywhere shadow-xl shadow-black/5 sm:p-10'
            >
                <div className='flex flex-wrap items-center justify-between gap-6'>
                    <div className='flex flex-wrap items-center gap-4'>
                        <span className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl'>
                            <UsersIcon aria-hidden='true' className='size-6' />
                        </span>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-heading text-lg font-semibold'>Our family</h2>
                            <p className='text-muted-foreground text-sm'>Shared space</p>
                        </div>
                    </div>
                    <AvatarGroup>
                        <Avatar size='lg'>
                            <AvatarImage src='/avatars/ana.webp' alt='Ana' width={80} height={80} />
                            <AvatarFallback>Ana</AvatarFallback>
                        </Avatar>
                        <Avatar size='lg'>
                            <AvatarImage
                                src='/avatars/alex.webp'
                                alt='You'
                                width={80}
                                height={80}
                            />
                            <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                        <Avatar size='lg'>
                            <AvatarImage src='/avatars/leo.webp' alt='Leo' width={80} height={80} />
                            <AvatarFallback>Leo</AvatarFallback>
                        </Avatar>
                    </AvatarGroup>
                </div>
                <Separator />
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                        <h3 className='text-sm font-medium'>Monthly overview</h3>
                        <p className='text-muted-foreground text-sm'>June 2026</p>
                    </div>
                    <PreviewSummary />
                </div>
                <Separator />
                <div className='flex flex-col gap-6'>
                    <h3 className='text-sm font-medium'>Recent expenses</h3>
                    <PreviewExpense />
                </div>
                <Separator />
                <PreviewGoal />
            </section>
        </aside>
    );
}
