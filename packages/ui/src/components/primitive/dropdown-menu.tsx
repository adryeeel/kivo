'use client';

import { CheckIcon } from 'lucide-react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import { cn } from '@kivo/ui/lib/utils';

function DropdownMenu(props: MenuPrimitive.Root.Props) {
    return <MenuPrimitive.Root {...props} />;
}

function DropdownMenuTrigger(props: MenuPrimitive.Trigger.Props) {
    return <MenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />;
}

function DropdownMenuContent({
    className,
    sideOffset = 4,
    align = 'start',
    alignOffset = 0,
    side = 'bottom',
    ...props
}: MenuPrimitive.Popup.Props &
    Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
    return (
        <MenuPrimitive.Portal>
            <MenuPrimitive.Positioner
                className='isolate z-50 outline-none'
                align={align}
                alignOffset={alignOffset}
                side={side}
                sideOffset={sideOffset}
            >
                <MenuPrimitive.Popup
                    data-slot='dropdown-menu-content'
                    className={cn(
                        'bg-popover text-popover-foreground relative max-h-(--available-height) w-48 max-w-[calc(100vw-1rem)] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border p-1.5 shadow-lg transition-[opacity,transform] duration-200 ease-(--ease-out) outline-none data-ending-style:[transform:scale(0.95)] data-ending-style:opacity-0 data-starting-style:[transform:scale(0.95)] data-starting-style:opacity-0 motion-reduce:transition-opacity motion-reduce:data-ending-style:transform-none motion-reduce:data-starting-style:transform-none',
                        className,
                    )}
                    {...props}
                />
            </MenuPrimitive.Positioner>
        </MenuPrimitive.Portal>
    );
}

function DropdownMenuGroup(props: MenuPrimitive.Group.Props) {
    return <MenuPrimitive.Group {...props} />;
}

function DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
    return <MenuPrimitive.RadioGroup {...props} />;
}

function DropdownMenuRadioItem({ children, className, ...props }: MenuPrimitive.RadioItem.Props) {
    return (
        <MenuPrimitive.RadioItem
            data-slot='dropdown-menu-radio-item'
            className={cn(
                'data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex min-h-11 cursor-default items-center gap-2.5 rounded-lg py-2 pr-8 pl-3 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                className,
            )}
            {...props}
        >
            {children}
            <MenuPrimitive.RadioItemIndicator className='pointer-events-none absolute right-2 flex items-center justify-center'>
                <CheckIcon aria-hidden='true' />
            </MenuPrimitive.RadioItemIndicator>
        </MenuPrimitive.RadioItem>
    );
}

export {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup,
};
