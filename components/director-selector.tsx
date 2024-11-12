'use client'

import { Button } from '@/components/ui/button'
import { setSchoolDirectorAction } from '@/lib/actions/setSchoolDirectorAction'
import { Input } from '@/components/ui/input'
import { useFormState, useFormStatus } from 'react-dom'
import type School from '@/lib/entities/School'

function DirectorSelector(props: { cue: School['cue'] }) {
    const [state, formAction] = useFormState<DirectorSelectorFormState, FormData>(
        setSchoolDirectorAction.bind(null, props.cue),
        {
            errors: {}
        }
    )
    const { errors } = state

    return (
        <form
            action={formAction}
            className='flex flex-col gap-2'
        >
            <Input
                placeholder='Email de la cuenta'
                name='email'
            />
            <SubmitButton />
            {errors?.general && (
                <p className='text-sm text-destructive w-full text-center'>
                    {errors?.general}
                </p>
            )}
        </form>
    )
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
            {pending ? 'Asignando...' : 'Asignar director'}
        </Button>
    )
}

export type DirectorSelectorFormState = {
    errors?: {
        general?: string
        email?: string
    }
}

export default DirectorSelector
