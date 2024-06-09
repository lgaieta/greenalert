import Link from 'next/link'
import { Button } from './ui/button'

export default function Header() {
    return (
        <header className='w-full py-3 border-b border-b-border/40'>
            <div className='container flex items-center justify-between'>
                <Link
                    href='/'
                    className='text-base font-bold'
                >
                    GreenAlert
                </Link>
                <nav className='flex items-center space-x-4'>
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
                            href='#'
                            className='rounded-md px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
                        >
                            Iniciar sesión
                        </Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}
