'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormStatus } from 'react-dom'

function NewSchoolForm() {
    return (
        <form className='flex flex-col gap-8 items-center w-full'>
            <div className='max-w-sm flex flex-col gap-2 w-full'>
                <Label htmlFor='cue'>CUE</Label>
                <Input
                    id='cue'
                    name='cue'
                    required
                />
            </div>
            <div className='max-w-sm flex flex-col gap-2 w-full'>
                <Label htmlFor='locality'>Localidad</Label>
                <Input
                    id='locality'
                    name='locality'
                    required
                />
            </div>
            <SubmitButton />
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
            Crear escuela
        </Button>
    )
}

export default NewSchoolForm
