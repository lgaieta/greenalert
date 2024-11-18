import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import UserType from '@/lib/entities/UserType'
import CourseRepository from '@/lib/services/CourseRepository'
import SessionManager from '@/lib/services/SessionManager'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function ProfessorCoursesPage() {
    const { authorized, usertype, email } = await SessionManager.validateSession()

    if (!authorized || usertype !== UserType.Professor) return redirect('/')

    const courses = await CourseRepository.listByProfessorEmail(email)

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24 px-6'>
            <div className='flex flex-col gap-10 items-center w-full max-w-2xl'>
                <header className='flex flex-col w-full min-[512px]:flex-row min-[512px]:justify-between min-[512px]:items-center gap-4 text-center'>
                    <h1 className='text-3xl text-center min-[512px]:text-start w-full md:text-4xl lg:text-5xl font-bold'>
                        Cursos
                    </h1>
                    <Button
                        asChild
                        variant={'secondary'}
                    >
                        <Link href='/cursos/nuevo'>Nuevo curso</Link>
                    </Button>
                </header>
                {courses.length < 1 ? (
                    <p className='text-gray-600 dark:text-gray-300'>
                        Aún no has creado ningun curso.
                    </p>
                ) : (
                    <ul className='w-full grid grid-cols-1 gap-4'>
                        {courses.map(course => (
                            <li key={course.id}>
                                <Card className='flex justify-between p-8 sm:p-12 items-centerw-full'>
                                    <CardHeader className='p-0'>
                                        <CardTitle className='text-xl'>
                                            {course.name}
                                        </CardTitle>
                                        <CardDescription className='text-base'>
                                            {course.schoolName}
                                            <p className='pt-2'>
                                                Código:{' '}
                                                <strong className='text-foreground'>
                                                    {course.invitationCode}
                                                </strong>
                                            </p>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    )
}

export default ProfessorCoursesPage
