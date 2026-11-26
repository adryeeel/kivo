import { cn } from '@kivo/ui/lib/utils';
import { Button } from '@kivo/ui/primitive/button';
import {
    Dialog,
    DialogTitle,
    DialogClose,
    DialogHeader,
    DialogFooter,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from '@kivo/ui/primitive/dialog';

interface Props {
    kind: 'reset' | 'signup';
    className?: string;
}

export function LoginHelp({ kind, className }: Props) {
    return (
        <Dialog>
            <DialogTrigger
                render={<Button variant='link' />}
                className={cn('max-w-full px-0 whitespace-normal', className)}
            >
                {kind === 'reset' ? 'Forgot password?' : 'Create an account'}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {kind === 'reset' ? 'Password recovery' : 'Join your family on Kivo'}
                    </DialogTitle>
                    <DialogDescription>
                        {kind === 'reset'
                            ? 'Password recovery is unavailable right now.'
                            : 'Account creation is unavailable right now.'}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button />} className='w-full'>
                        Got it
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
