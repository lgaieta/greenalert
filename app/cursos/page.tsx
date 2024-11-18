import { Card } from '@/components/ui/card'
import UserType from '@/lib/entities/UserType'
import CourseRepository from '@/lib/services/CourseRepository'
import SessionManager from '@/lib/services/SessionManager'
import { redirect } from 'next/navigation'

async function StudentCourse() {
    const { authorized, usertype, email } = await SessionManager.validateSession()

    if (!authorized || usertype !== UserType.Student) return redirect('/')

    const course = await CourseRepository.getByStudentEmail(email)

    if (course === null) return redirect('/cursos/unirme')

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24 px-6'>
            <div className='flex flex-col gap-10 items-center w-full max-w-2xl'>
                <header className='flex flex-col w-full min-[512px]:flex-row min-[512px]:justify-between min-[512px]:items-center gap-4 text-center'>
                    <h1 className='text-3xl text-center min-[512px]:text-start w-full md:text-4xl lg:text-5xl font-bold'>
                        Mi curso
                    </h1>
                </header>
                <Card className='flex justify-between p-8 sm:p-12 items-center w-full'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-xl !my-0 font-bold'>{course.name}</p>
                        <p className='!my-0'>Profesor: {course.professorEmail}</p>
                        <p className='!my-0'>Escuela: {course.schoolName}</p>
                    </div>
                </Card>
            </div>
        </main>
    )
}

export default StudentCourse
