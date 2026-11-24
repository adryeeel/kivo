'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import { Field, FieldLabel, FieldError } from '@kivo/ui/primitive/field';
import { EyeIcon, EyeOffIcon, LockKeyholeIcon } from '@kivo/ui/icons/symbols';
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    InputGroupButton,
} from '@kivo/ui/primitive/input-group';

import { LoginHelp } from '@/parts/login/form/help-dialog';
import type { LoginValues } from '@/parts/login/form/helpers/login-schema';

interface Props {
    control: Control<LoginValues>;
}

export function PasswordField({ control }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Controller
            name='password'
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-3'>
                    <div className='flex min-h-7 flex-wrap items-center justify-between gap-x-2 gap-y-3'>
                        <FieldLabel htmlFor='password' className='min-h-7'>
                            Password
                        </FieldLabel>
                        <LoginHelp kind='reset' className='-my-2' />
                    </div>
                    <InputGroup>
                        {/* Omit the DOM name so unhydrated preview submissions cannot serialize credentials. */}
                        <InputGroupInput
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your password'
                            autoComplete='current-password'
                            required
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.invalid ? 'password-error' : undefined}
                            value={field.value}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                        />
                        <InputGroupAddon>
                            <LockKeyholeIcon aria-hidden='true' />
                        </InputGroupAddon>
                        <InputGroupAddon align='inline-end'>
                            <InputGroupButton
                                size='icon-sm'
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
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
                        <FieldError id='password-error' errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}
