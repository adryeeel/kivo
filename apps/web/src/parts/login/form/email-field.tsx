'use client';

import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import { MailIcon } from '@kivo/ui/icons/symbols';
import { Field, FieldLabel, FieldError } from '@kivo/ui/primitive/field';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@kivo/ui/primitive/input-group';

import type { LoginValues } from '@/parts/login/form/helpers/login-schema';

interface Props {
    control: Control<LoginValues>;
}

export function EmailField({ control }: Props) {
    return (
        <Controller
            name='email'
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-3'>
                    <FieldLabel htmlFor='email' className='min-h-7'>
                        Email address
                    </FieldLabel>
                    <InputGroup>
                        {/* Omit the DOM name so unhydrated preview submissions cannot serialize credentials. */}
                        <InputGroupInput
                            id='email'
                            type='email'
                            placeholder='you@example.com'
                            autoComplete='username'
                            autoCapitalize='none'
                            spellCheck={false}
                            required
                            aria-invalid={fieldState.invalid}
                            aria-describedby={fieldState.invalid ? 'email-error' : undefined}
                            value={field.value}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
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
    );
}
