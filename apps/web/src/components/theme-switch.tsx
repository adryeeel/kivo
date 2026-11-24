'use client';

import { useSyncExternalStore } from 'react';

import { Button } from '@kivo/ui/primitive/button';
import { useTheme } from '@kivo/ui/providers/theme';
import { SunIcon, MoonIcon, MonitorIcon, ChevronDownIcon } from '@kivo/ui/icons/symbols';
import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup,
} from '@kivo/ui/primitive/dropdown-menu';

const options = [
    { Icon: SunIcon, value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark', Icon: MoonIcon },
    { value: 'system', label: 'System', Icon: MonitorIcon },
] as const;

function subscribe() {
    return () => {};
}

export function ThemeSwitch() {
    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );
    const { theme, setTheme } = useTheme();
    const current = options.find(({ value }) => mounted && value === theme) ?? options[2];
    const Icon = current.Icon;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={<Button variant='outline' />}
                className='max-w-full gap-2'
                aria-label={`Appearance: ${current.label}`}
                disabled={!mounted}
            >
                <Icon aria-hidden='true' data-icon='inline-start' />
                <span className='truncate'>{current.label}</span>
                <ChevronDownIcon aria-hidden='true' data-icon='inline-end' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' sideOffset={8}>
                <DropdownMenuGroup>
                    <DropdownMenuRadioGroup
                        aria-label='Appearance'
                        value={current.value}
                        onValueChange={setTheme}
                    >
                        {options.map(({ Icon, value, label }) => (
                            <DropdownMenuRadioItem key={value} value={value} closeOnClick>
                                <Icon aria-hidden='true' />
                                {label}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
