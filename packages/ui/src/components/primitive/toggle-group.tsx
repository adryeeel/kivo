'use client';

import { cn } from 'cn';
import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';

import { toggleVariants } from '@kivo/ui/primitive/toggle';

const ToggleGroupContext = React.createContext<
    VariantProps<typeof toggleVariants> & {
        spacing?: number;
        orientation?: 'horizontal' | 'vertical';
    }
>({
    spacing: 2,
    size: 'default',
    variant: 'default',
    orientation: 'horizontal',
});

function ToggleGroup({
    size,
    variant,
    children,
    className,
    spacing = 2,
    orientation = 'horizontal',
    ...props
}: ToggleGroupPrimitive.Props &
    VariantProps<typeof toggleVariants> & {
        spacing?: number;
        orientation?: 'horizontal' | 'vertical';
    }) {
    return (
        <ToggleGroupPrimitive
            data-slot='toggle-group'
            data-variant={variant}
            data-size={size}
            data-spacing={spacing}
            data-orientation={orientation}
            style={{ '--gap': spacing } as React.CSSProperties}
            className={cn(
                'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch data-[spacing=0]:data-[variant=outline]:rounded-3xl',
                className,
            )}
            {...props}
        >
            <ToggleGroupContext.Provider value={{ size, variant, spacing, orientation }}>
                {children}
            </ToggleGroupContext.Provider>
        </ToggleGroupPrimitive>
    );
}

function ToggleGroupItem({
    children,
    className,
    size = 'default',
    variant = 'default',
    ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
    const context = React.useContext(ToggleGroupContext);

    return (
        <TogglePrimitive
            data-slot='toggle-group-item'
            data-variant={context.variant || variant}
            data-size={context.size || size}
            data-spacing={context.spacing}
            className={cn(
                'data-[state=on]:bg-muted shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-3 group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-2.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-2.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-3xl group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-3xl group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-3xl group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-3xl group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
                toggleVariants({
                    size: context.size || size,
                    variant: context.variant || variant,
                }),
                className,
            )}
            {...props}
        >
            {children}
        </TogglePrimitive>
    );
}

export { ToggleGroup, ToggleGroupItem };
