'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { registerSchoolAction } from '@/lib/actions/registerSchoolAction'
import type Locality from '@/lib/entities/Locality'
import { useFormStatus } from 'react-dom'

function NewSchoolForm(props: { localities: Locality[] }) {
    return (
        <form
            className='flex flex-col gap-8 items-center w-full'
            action={registerSchoolAction}
        >
            <div className='max-w-sm flex flex-col gap-2 w-full'>
                <Label htmlFor='cue'>CUE</Label>
                <Input
                    id='cue'
                    name='cue'
                    required
                />
            </div>
            <div className='max-w-sm flex flex-col gap-2 w-full'>
                <Label htmlFor='name'>Nombre</Label>
                <Input
                    id='name'
                    name='name'
                    required
                />
            </div>
            <div className='max-w-sm flex flex-col gap-2 w-full'>
                <Label htmlFor='locality'>Localidad</Label>
                <LocalitySelect localities={props.localities} />
            </div>
            <SubmitButton />
        </form>
    )
}

function LocalitySelect(props: { localities: Locality[] }) {
    return (
        <Select name='locality'>
            <SelectTrigger className='w-full max-w-sm'>
                <SelectValue placeholder='Seleccione una localidad' />
            </SelectTrigger>
            <SelectContent>
                {props.localities.map(locality => (
                    <SelectItem
                        key={locality.id}
                        value={String(locality.id)}
                    >
                        {locality.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
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
            {pending ? 'Creando...' : 'Crear escuela'}
        </Button>
    )
}

export default NewSchoolForm
