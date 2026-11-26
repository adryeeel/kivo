import '../../../../../styles/global.css';

import { render } from 'vitest-browser-react';

import { Button } from '@kivo/ui/primitive/button';
import {
    Dialog,
    DialogTitle,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from '@kivo/ui/primitive/dialog';

export function renderDialog() {
    return render(
        <Dialog>
            <DialogTrigger render={<Button />}>Open details</DialogTrigger>
            <DialogContent>
                <DialogTitle>Details</DialogTitle>
                <DialogDescription>Information about this item.</DialogDescription>
            </DialogContent>
        </Dialog>,
    );
}
