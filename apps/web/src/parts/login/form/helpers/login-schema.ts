import { z } from 'zod';

export const loginSchema = z.object({
    password: z.string().min(1, 'Enter your password.'),
    email: z
        .string()
        .trim()
        .min(1, 'Enter your email address.')
        .pipe(z.email('Enter a valid email address.')),
});

export type LoginValues = z.infer<typeof loginSchema>;
