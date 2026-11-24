'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@kivo/ui/primitive/button';
import { FieldGroup } from '@kivo/ui/primitive/field';
import { Alert, AlertTitle, AlertDescription } from '@kivo/ui/primitive/alert';

import { LoginHelp } from '@/parts/login/form/components/help-dialog';
import { loginSchema } from '@/parts/login/form/helpers/login-schema';
import { EmailField } from '@/parts/login/form/components/email-field';
import { PasswordField } from '@/parts/login/form/components/password-field';

export function LoginForm() {
    const [notice, setNotice] = useState(false);
    const form = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    return (
        <div className='w-full max-w-90'>
            <h1 className='font-heading text-2xl leading-8 font-semibold tracking-tight'>
                Welcome home.
            </h1>
            <p className='text-muted-foreground mt-2 text-sm leading-6'>
                Sign in to your family space.
            </p>
            <p className='text-muted-foreground mt-2 text-xs leading-5'>
                Preview only · Sign-in isn’t available yet.
            </p>
            <form
                noValidate
                aria-label='Sign in'
                className='mt-8'
                onChange={() => setNotice(false)}
                onSubmit={form.handleSubmit(
                    () => {
                        // shortcut: no auth API exists; connect Better Auth before accepting sign-ins.
                        setNotice(true);
                    },
                    () => setNotice(false),
                )}
            >
                <FieldGroup className='gap-6'>
                    <EmailField control={form.control} clearErrors={form.clearErrors} />
                    <PasswordField control={form.control} clearErrors={form.clearErrors} />
                    <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
                        Sign in
                    </Button>
                    {notice && (
                        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- The shared Alert uses a polite status role for preview feedback.
                        <Alert role='status'>
                            <AlertTitle>This is a first look at Kivo.</AlertTitle>
                            <AlertDescription>
                                Sign-in isn’t available yet, and your details haven’t been sent.
                            </AlertDescription>
                        </Alert>
                    )}
                </FieldGroup>
            </form>
            <div className='text-muted-foreground mt-4 flex flex-wrap items-center justify-center gap-2 text-sm'>
                New to Kivo? <LoginHelp kind='signup' />
            </div>
        </div>
    );
}
