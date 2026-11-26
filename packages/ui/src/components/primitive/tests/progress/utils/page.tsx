import '../../../../../styles/global.css';

import { render } from 'vitest-browser-react';

import { Progress, ProgressLabel, ProgressValue } from '@kivo/ui/primitive/progress';

export function renderProgress() {
    return render(
        <Progress value={50} max={200}>
            <ProgressLabel>Upload progress</ProgressLabel>

            <ProgressValue />
        </Progress>,
    );
}
