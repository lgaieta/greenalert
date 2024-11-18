import JoinCourseForm from '@/components/join-course-form'
import UserType from '@/lib/entities/UserType'
import CourseRepository from '@/lib/services/CourseRepository'
import SessionManager from '@/lib/services/SessionManager'
import { redirect } from 'next/navigation'

async function JoinCourse() {
    const { authorized, usertype, email } = await SessionManager.validateSession()

    if (!authorized || usertype !== UserType.Student) return redirect('/')

    const course = await CourseRepository.getByStudentEmail(email)

    if (course !== null) return redirect('/cursos')

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Unirme al curso</h1>
                </header>
                <JoinCourseForm />
            </div>
        </main>
    )
}

export default JoinCourse
