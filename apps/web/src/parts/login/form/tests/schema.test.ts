import { it, expect, describe } from 'vitest';

import { loginSchema } from '@/parts/login/form/helpers/login-schema';

const invalidInputs = [
    { email: '', password: 'secret', message: 'Enter your email address.' },
    { email: '   ', password: 'secret', message: 'Enter your email address.' },
    { email: 'invalid', password: 'secret', message: 'Enter a valid email address.' },
    { password: '', email: 'ana@example.com', message: 'Enter your password.' },
];

describe('login schema', () => {
    it('trims email and preserves the password exactly', () => {
        expect(loginSchema.parse({ password: ' a ', email: '  ana@example.com  ' })).toEqual({
            password: ' a ',
            email: 'ana@example.com',
        });

        expect(loginSchema.safeParse({ password: ' ', email: 'ana@example.com' }).success).toBe(
            true,
        );
    });

    it.for(invalidInputs)(
        'rejects invalid login input: $message',
        ({ email, message, password }) => {
            const result = loginSchema.safeParse({ email, password });

            expect(result.success).toBe(false);
            expect(result.error?.issues[0]?.message).toBe(message);
        },
    );
});
