import Link from 'next/link'
import { Button } from '../ui/button'
import LogoutButton from '@/components/header/logout-button'

export default function StudentHeader() {
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
                            <Link href='/cursos'>Mis cursos</Link>
                        </Button>
                        <Button
                            asChild
                            variant={'link'}
                            size={'sm'}
                        >
                            <Link href='/nuevo-problema'>Nuevo problema</Link>
                        </Button>
                    </div>
                </nav>
                <LogoutButton />
            </div>
        </header>
    )
}
