import { CheckIcon, ShoppingBasketIcon } from '@kivo/ui/icons/symbols';

export function PreviewExpense() {
    return (
        <div className='grid w-full grid-cols-[auto_1fr_auto] items-start gap-3'>
            <ShoppingBasketIcon
                className='text-muted-foreground size-5 shrink-0'
                aria-hidden='true'
            />
            <div className='min-w-0'>
                <p className='font-medium'>The weekly shop</p>
                <p className='text-muted-foreground mt-1 text-sm'>Ana paid · 3 people</p>
            </div>
            <div className='ml-auto text-right'>
                <p className='font-medium tabular-nums'>€90</p>
                <p className='text-muted-foreground mt-1 inline-flex items-center gap-1 text-sm'>
                    <CheckIcon className='size-3' aria-hidden='true' /> Equal split
                </p>
            </div>
        </div>
    );
}
