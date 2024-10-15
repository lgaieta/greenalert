'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerDirectorAction } from '@/lib/actions/registerDirectorAction'
import { useFormStatus, useFormState } from 'react-dom'

function NewDirectorForm() {
    const [state, formAction] = useFormState<NewDirectorFormState, FormData>(
        registerDirectorAction,
        {
            errors: {}
        }
    )
    const { errors } = state

    return (
        <form
            className='flex flex-col gap-8 items-center w-full'
            action={formAction}
        >
            <div className='max-w-sm flex flex-col gap-2 w-full'>
                <Label htmlFor='email'>Email de la cuenta del director</Label>
                <Input
                    id='email'
                    name='email'
                    type='email'
                    required
                />
                {errors?.email && (
                    <p className='text-sm text-destructive'>{errors?.email}</p>
                )}
            </div>
            <SubmitButton />
            {errors?.general && (
                <p className='text-sm text-destructive w-full text-center'>
                    {errors?.general}
                </p>
            )}
        </form>
    )
}

export type NewDirectorFormState = {
    errors?: {
        general?: string
        email?: string
    }
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            className='w-full max-w-sm'
            size='lg'
            type='submit'
            disabled={pending}
        >
            {pending ? 'Asignando...' : 'Asignar cargo'}
        </Button>
    )
}

export default NewDirectorForm
