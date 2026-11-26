import { SunIcon } from '@kivo/ui/icons/symbols';
import { Progress, ProgressLabel, ProgressValue } from '@kivo/ui/primitive/progress';

export function PreviewGoal() {
    return (
        <div className='flex flex-col gap-6'>
            <h3 className='flex items-center gap-3 text-sm font-medium'>
                <SunIcon className='size-5 shrink-0' aria-hidden='true' /> A summer together
            </h3>
            <Progress
                value={740}
                max={2400}
                aria-valuetext='740 euros marked saved toward 2,400 euros'
            >
                <ProgressLabel>
                    <span className='sr-only'>Summer goal: </span>€740 of €2,400 marked saved
                </ProgressLabel>
                <ProgressValue />
            </Progress>
        </div>
    );
}
