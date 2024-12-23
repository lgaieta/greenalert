'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { registerUserAction } from '@/lib/actions/registerUserAction'
import { useFormState, useFormStatus } from 'react-dom'

export type RegisterFormErrors = string[]

export function RegisterForm() {
    const [errors, formAction] = useFormState<RegisterFormErrors, FormData>(
        registerUserAction,
        []
    )

    return (
        <form
            className='grid gap-4'
            action={formAction}
        >
            <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                    id='email'
                    name='email'
                    placeholder='ejemplo@greenalert.com'
                    required
                    type='email'
                />
            </div>
            <div className='grid gap-2'>
                <Label htmlFor='password'>Contraseña</Label>
                <Input
                    id='password'
                    name='password'
                    placeholder='••••••••'
                    required
                    minLength={6}
                    type='password'
                />
            </div>
            <div className='grid gap-2'>
                <Label htmlFor='repeatedPassword'>Repetir contraseña</Label>
                <Input
                    id='repeatedPassword'
                    name='repeatedPassword'
                    placeholder='••••••••'
                    required
                    minLength={6}
                    type='password'
                />
            </div>
            <SubmitButton />
            {errors.map(error => (
                <p
                    key={error}
                    className='text-red-500 text-center'
                >
                    {error}
                </p>
            ))}
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            className='w-full'
            type='submit'
            disabled={pending}
        >
            {!pending ? 'Registrarme' : 'Registrando...'}
        </Button>
    )
}
