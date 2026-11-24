'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@kivo/ui/primitive/button';
import { Alert, AlertTitle, AlertDescription } from '@kivo/ui/primitive/alert';
import { Field, FieldGroup, FieldLabel, FieldError } from '@kivo/ui/primitive/field';
import { EyeIcon, MailIcon, EyeOffIcon, LockKeyholeIcon } from '@kivo/ui/icons/symbols';
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    InputGroupButton,
} from '@kivo/ui/primitive/input-group';
import {
    Dialog,
    DialogTitle,
    DialogClose,
    DialogHeader,
    DialogFooter,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from '@kivo/ui/primitive/dialog';

import { loginSchema } from '@/features/auth/helpers/login-schema';

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [notice, setNotice] = useState(false);
    const [help, setHelp] = useState<'reset' | 'signup'>('reset');
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    return (
        <Dialog>
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
                {/* Unnamed DOM inputs keep preview credentials out of native submissions before hydration. */}
                <form
                    noValidate
                    aria-label='Sign in'
                    className='mt-8'
                    onSubmit={form.handleSubmit(
                        () => {
                            // shortcut: no auth API exists; connect Better Auth before accepting sign-ins.
                            setNotice(true);
                        },
                        () => setNotice(false),
                    )}
                >
                    <FieldGroup className='gap-6'>
                        <Controller
                            name='email'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className='gap-3'>
                                    <FieldLabel htmlFor='email' className='min-h-7'>
                                        Email address
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id='email'
                                            type='email'
                                            placeholder='you@example.com'
                                            autoComplete='username'
                                            autoCapitalize='none'
                                            spellCheck={false}
                                            required
                                            aria-invalid={fieldState.invalid}
                                            aria-describedby={
                                                fieldState.invalid ? 'email-error' : undefined
                                            }
                                            value={field.value}
                                            ref={field.ref}
                                            onBlur={field.onBlur}
                                            onChange={(event) => {
                                                field.onChange(event);
                                                setNotice(false);
                                            }}
                                        />
                                        <InputGroupAddon>
                                            <MailIcon aria-hidden='true' />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError id='email-error' errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='password'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className='gap-3'>
                                    <div className='flex min-h-7 flex-wrap items-center justify-between gap-x-2 gap-y-3'>
                                        <FieldLabel htmlFor='password' className='min-h-7'>
                                            Password
                                        </FieldLabel>
                                        <DialogTrigger
                                            render={<Button variant='link' />}
                                            className='-my-2 max-w-full px-0 whitespace-normal'
                                            onClick={() => setHelp('reset')}
                                        >
                                            Forgot password?
                                        </DialogTrigger>
                                    </div>
                                    <InputGroup>
                                        <InputGroupInput
                                            id='password'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Enter your password'
                                            autoComplete='current-password'
                                            required
                                            aria-invalid={fieldState.invalid}
                                            aria-describedby={
                                                fieldState.invalid ? 'password-error' : undefined
                                            }
                                            value={field.value}
                                            ref={field.ref}
                                            onBlur={field.onBlur}
                                            onChange={(event) => {
                                                field.onChange(event);
                                                setNotice(false);
                                            }}
                                        />
                                        <InputGroupAddon>
                                            <LockKeyholeIcon aria-hidden='true' />
                                        </InputGroupAddon>
                                        <InputGroupAddon align='inline-end'>
                                            <InputGroupButton
                                                size='icon-sm'
                                                aria-label={
                                                    showPassword ? 'Hide password' : 'Show password'
                                                }
                                                aria-pressed={showPassword}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOffIcon aria-hidden='true' />
                                                ) : (
                                                    <EyeIcon aria-hidden='true' />
                                                )}
                                            </InputGroupButton>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError
                                            id='password-error'
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={form.formState.isSubmitting}
                        >
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
                    New to Kivo?
                    <DialogTrigger
                        render={<Button variant='link' />}
                        className='max-w-full px-0 whitespace-normal'
                        onClick={() => setHelp('signup')}
                    >
                        Create an account
                    </DialogTrigger>
                </div>
            </div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {help === 'reset' ? 'Password recovery' : 'Join your family on Kivo'}
                    </DialogTitle>
                    <DialogDescription>
                        {help === 'reset'
                            ? 'Password recovery will be available when Kivo opens for sign-in. This first look doesn’t create or access real accounts.'
                            : 'Account creation is coming with Kivo’s first release. For now, take a look around and make yourself at home.'}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button />} className='w-full'>
                        Got it
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
