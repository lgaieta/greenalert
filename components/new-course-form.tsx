'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerCourseAction } from '@/lib/actions/registerCourseAction'
import { useFormState, useFormStatus } from 'react-dom'

function NewCourseForm(props: { email: string }) {
    const [state, formAction] = useFormState<NewCourseFormState, FormData>(
        registerCourseAction.bind(null, props.email),
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
                <Label htmlFor='name'>Nombre</Label>
                <Input
                    id='name'
                    name='name'
                    required
                />
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

export type NewCourseFormState = {
    errors?: {
        general?: string
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
            {pending ? 'Creando...' : 'Crear curso'}
        </Button>
    )
}

export default NewCourseForm
