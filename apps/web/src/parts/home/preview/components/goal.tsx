import { SunIcon } from '@kivo/ui/icons/symbols';
import { Card, CardTitle, CardHeader, CardContent } from '@kivo/ui/primitive/card';
import { Progress, ProgressLabel, ProgressValue } from '@kivo/ui/primitive/progress';

export function PreviewGoal() {
    return (
        <Card size='sm'>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <SunIcon className='size-4' aria-hidden='true' /> A summer together
                </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    );
}
