import { CheckIcon, ShoppingBasketIcon } from '@kivo/ui/icons/symbols';

export function PreviewExpense() {
    return (
        <div className='flex items-center gap-3'>
            <ShoppingBasketIcon
                className='text-muted-foreground size-5 shrink-0'
                aria-hidden='true'
            />
            <div>
                <p className='font-medium'>The weekly shop</p>
                <p className='text-muted-foreground mt-1 text-xs'>Ana paid · Split between 3</p>
            </div>
            <div className='ml-auto text-right'>
                <p className='font-medium tabular-nums'>€90.00</p>
                <p className='text-muted-foreground mt-1 inline-flex items-center gap-1 text-xs'>
                    <CheckIcon className='size-3' aria-hidden='true' /> Split equally
                </p>
            </div>
        </div>
    );
}
