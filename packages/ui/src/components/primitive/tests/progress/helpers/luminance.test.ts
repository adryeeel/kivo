import { it, expect } from 'vitest';

import { luminance } from './luminance';

const colors = [
    { expected: 0, color: '#000000' },
    { expected: 1, color: '#ffffff' },
    { expected: 0.21586, color: 'rgb(128, 128, 128)' },
];

it.for(colors)('resolves $color to relative luminance', ({ color, expected }) => {
    expect(luminance(color)).toBeCloseTo(expected, 5);
});
