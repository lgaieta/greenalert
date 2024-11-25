import Link from 'next/link'
import { Button } from '../ui/button'
import LogoutButton from '@/components/header/logout-button'

export default function DirectorHeader() {
    return (
        <header className='w-full py-3 border-b border-b-border/40'>
            <div className='container flex items-center justify-between'>
                <nav className='flex gap-6 items-center'>
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
                        <Button
                            asChild
                            variant={'link'}
                            size={'sm'}
                        >
                            <Link href='/profesores'>Profesores</Link>
                        </Button>
                    </div>
                </nav>
                <LogoutButton />
            </div>
        </header>
    )
}
