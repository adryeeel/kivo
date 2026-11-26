import { UsersIcon } from '@kivo/ui/icons/symbols';
import {
    Card,
    CardTitle,
    CardHeader,
    CardFooter,
    CardContent,
    CardDescription,
} from '@kivo/ui/primitive/card';

import { PreviewGoal } from '@/parts/home/preview/components/goal';
import { PreviewSummary } from '@/parts/home/preview/components/summary';
import { PreviewExpense } from '@/parts/home/preview/components/expense';

export function FamilyPreview() {
    return (
        <aside
            aria-label='Your family space'
            className='flex w-full max-w-lg min-w-0 flex-col gap-4 justify-self-center lg:justify-self-end'
        >
            <Card className='gap-6 shadow-md'>
                <CardHeader className='border-b'>
                    <CardTitle className='flex items-center gap-2 text-base'>
                        <UsersIcon className='size-4' aria-hidden='true' /> Our family
                    </CardTitle>
                    <CardDescription>Monthly overview</CardDescription>
                </CardHeader>
                <CardContent className='@container'>
                    <PreviewSummary />
                </CardContent>
                <CardFooter className='border-t'>
                    <PreviewExpense />
                </CardFooter>
            </Card>
            <PreviewGoal />
        </aside>
    );
}
