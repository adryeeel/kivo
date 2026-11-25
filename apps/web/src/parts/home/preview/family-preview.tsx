import { UsersIcon } from '@kivo/ui/icons/symbols';
import { Separator } from '@kivo/ui/primitive/separator';
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@kivo/ui/primitive/card';

import { PreviewGoal } from '@/parts/home/preview/components/goal';
import { PreviewSummary } from '@/parts/home/preview/components/summary';
import { PreviewExpense } from '@/parts/home/preview/components/expense';

export function FamilyPreview() {
    return (
        <aside
            aria-label='A preview of your family space'
            className='w-full max-w-lg min-w-0 justify-self-center lg:justify-self-end'
        >
            <Card className='gap-6 shadow-md'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-base'>
                        <UsersIcon className='size-4' aria-hidden='true' /> Our family
                    </CardTitle>
                    <CardDescription>Monthly overview · sample data</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className='flex flex-col gap-5'>
                    <PreviewSummary />
                    <Separator />
                    <PreviewExpense />
                    <Separator />
                </CardContent>
                <PreviewGoal />
            </Card>
            <p className='text-muted-foreground mt-4 text-center text-sm leading-6'>
                A first look at your shared space.
            </p>
        </aside>
    );
}
