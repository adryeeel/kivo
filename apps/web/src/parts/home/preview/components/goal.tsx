import { SunIcon } from '@kivo/ui/icons/symbols';
import { CardFooter } from '@kivo/ui/primitive/card';
import { Progress } from '@kivo/ui/primitive/progress';

export function PreviewGoal() {
    return (
        <CardFooter className='flex-col items-stretch gap-3'>
            <p className='flex items-center gap-2 font-medium'>
                <SunIcon className='size-4' aria-hidden='true' /> A summer together
            </p>
            <Progress
                value={740}
                max={2400}
                aria-label='Summer goal'
                aria-valuetext='740 euros marked saved toward 2,400 euros'
            />
            <p className='text-muted-foreground text-sm'>
                <span className='text-foreground font-semibold'>€740</span> marked saved of €2,400
            </p>
        </CardFooter>
    );
}
