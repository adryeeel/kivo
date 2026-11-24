import { UsersIcon } from '@kivo/ui/icons/symbols';
import { Separator } from '@kivo/ui/primitive/separator';
import {
    Card,
    CardTitle,
    CardHeader,
    CardAction,
    CardContent,
    CardDescription,
} from '@kivo/ui/primitive/card';

import { PreviewGoal } from '@/parts/login/preview/goal';
import { PreviewSummary } from '@/parts/login/preview/summary';
import { PreviewExpense } from '@/parts/login/preview/expense';

export function FamilyPreview() {
    return (
        <aside
            aria-label='A preview of your family space'
            className='bg-muted/40 hidden flex-col justify-center border-r py-12 lg:flex lg:px-12 xl:px-16'
        >
            <div className='w-full max-w-110'>
                <h2 className='font-heading text-2xl leading-8 font-semibold tracking-tight'>
                    Everyday expenses.
                    <br />
                    Bigger plans.
                </h2>
                <p className='text-muted-foreground mt-3 max-w-80 text-sm leading-6'>
                    A shared view of what you spend, what you owe, and what you’re working toward.
                </p>
                <Card size='sm' className='mt-6 gap-4'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <UsersIcon className='size-4' aria-hidden='true' /> Our family
                        </CardTitle>
                        <CardDescription>November · illustrative example</CardDescription>
                        <CardAction className='text-muted-foreground text-xs'>EUR</CardAction>
                    </CardHeader>
                    <Separator />
                    <CardContent className='flex flex-col gap-4'>
                        <PreviewSummary />
                        <Separator />
                        <PreviewExpense />
                        <Separator />
                    </CardContent>
                    <PreviewGoal />
                </Card>
                <p className='text-muted-foreground mt-3 text-xs leading-5'>
                    Illustrative preview · Your personal finances stay private.
                </p>
            </div>
        </aside>
    );
}
