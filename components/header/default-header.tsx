import Link from 'next/link'
import { Button } from '../ui/button'

export default function DefaultHeader() {
    return (
        <header className='w-full py-3 border-b border-b-border/40'>
            <nav className='container flex items-center justify-between'>
                <div className='flex gap-6 items-center'>
                    <Link
                        href='/'
                        className='text-base font-bold'
                    >
                        GreenAlert
                    </Link>
                    <div className='flex gap-2 items-center'>
                        <Button
                            asChild
                            variant={'link'}
                            size={'sm'}
                        >
                            <Link href='/mapa'>Mapa</Link>
                        </Button>
                        <Button
                            asChild
                            variant={'link'}
                            size={'sm'}
                        >
                            <Link href='/estadisticas'>Estadísticas</Link>
                        </Button>
                    </div>
                </div>
                <div className='flex items-center space-x-4'>
                    <Button
                        asChild
                        variant={'outline'}
                        size={'sm'}
                    >
                        <Link href='/crear-cuenta'>Registrarme</Link>
                    </Button>
                    <Button
                        asChild
                        size={'sm'}
                    >
                        <Link
                            href='/iniciar-sesion'
                            className='rounded-md px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
                        >
                            Iniciar sesión
                        </Link>
                    </Button>
                </div>
            </nav>
        </header>
    )
}
