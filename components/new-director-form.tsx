'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerDirectorAction } from '@/lib/actions/registerDirectorAction'
import { useFormStatus } from 'react-dom'

function NewDirectorForm() {
    return (
        <form
            className='flex flex-col gap-8 items-center w-full'
            action={registerDirectorAction}
        >
            <div className='max-w-sm flex flex-col gap-2 w-full'>
                <Label htmlFor='email'>Email de la cuenta del director</Label>
                <Input
                    id='email'
                    name='email'
                    type='email'
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
            {pending ? 'Asignando...' : 'Asignar cargo'}
        </Button>
    )
}

export default NewDirectorForm
