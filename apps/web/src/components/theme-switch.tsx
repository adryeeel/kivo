'use client';

import { useSyncExternalStore } from 'react';

import { useTheme } from '@kivo/ui/providers/theme';
import { SunIcon, MoonIcon, MonitorIcon } from '@kivo/ui/icons/symbols';
import { ToggleGroup, ToggleGroupItem } from '@kivo/ui/primitive/toggle-group';

const options = [
    { Icon: SunIcon, value: 'light', label: 'Light theme' },
    { value: 'dark', Icon: MoonIcon, label: 'Dark theme' },
    { value: 'system', Icon: MonitorIcon, label: 'System theme' },
];

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

    return (
        <ToggleGroup
            aria-label='Appearance'
            className='max-w-full flex-wrap'
            spacing={0}
            value={mounted && theme ? [theme] : []}
            disabled={!mounted}
            onValueChange={(values) => {
                if (values[0]) setTheme(values[0]);
            }}
        >
            {options.map(({ Icon, value, label }) => (
                <ToggleGroupItem
                    key={value}
                    value={value}
                    aria-label={label}
                    title={label}
                    className='min-h-11 min-w-11'
                >
                    <Icon aria-hidden='true' />
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
