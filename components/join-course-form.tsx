'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { joinCourseAction } from '@/lib/actions/joinCourseAction'
import { useFormStatus, useFormState } from 'react-dom'

function JoinCourseForm() {
    const [state, formAction] = useFormState<JoinCourseFormState, FormData>(
        joinCourseAction,
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
                <Label htmlFor='code'>Código del curso</Label>
                <Input
                    id='code'
                    name='code'
                    required
                />
                {errors?.code && (
                    <p className='text-sm text-destructive'>{errors?.code}</p>
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

export type JoinCourseFormState = {
    errors?: {
        general?: string
        code?: string
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
            {pending ? 'Uniéndose...' : 'Unirme al curso'}
        </Button>
    )
}

export default JoinCourseForm
