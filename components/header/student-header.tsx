import Link from 'next/link'
import { Button } from '../ui/button'
import LogoutButton from '@/components/header/logout-button'
import CourseRepository from '@/lib/services/CourseRepository'

export default async function StudentHeader(props: { email: string }) {
    const course = await CourseRepository.getByStudentEmail(props.email)

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
                        {course && (
                            <Button
                                asChild
                                variant={'link'}
                                size={'sm'}
                            >
                                <Link href='/cursos'>Mi curso</Link>
                            </Button>
                        )}
                        <Button
                            asChild
                            variant={'link'}
                            size={'sm'}
                        >
                            <Link href='/nuevo-problema'>Nuevo problema</Link>
                        </Button>
                    </div>
                </nav>
                <div className='flex gap-2'>
                    {course === null && (
                        <Button asChild>
                            <Link href={'/cursos/unirme'}>Unirme a un curso</Link>
                        </Button>
                    )}
                    <LogoutButton />
                </div>
            </div>
        </header>
    )
}
