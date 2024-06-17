import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function LoginForm() {
    return (
        <form className='grid gap-4'>
            <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                    id='email'
                    placeholder='m@example.com'
                    required
                    type='email'
                />
            </div>
            <div className='grid gap-2'>
                <Label htmlFor='password'>Contraseña</Label>
                <Input
                    id='password'
                    placeholder='••••••••'
                    required
                    type='password'
                />
            </div>
            <Button
                className='w-full'
                type='submit'
            >
                Iniciar sesión
            </Button>
        </form>
    )
}
