import { Button } from '@/components/ui/button'
import UserType from '@/lib/entities/UserType'
import CourseRepository from '@/lib/services/CourseRepository'
import ReportRepository from '@/lib/services/ReportRepository'
import SessionManager from '@/lib/services/SessionManager'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const NewReportForm = dynamic(() => import('@/components/new-report/new-report-form'), {
    ssr: false
})

async function NewReportPage() {
    const { authorized, usertype, email } = await SessionManager.validateSession()

    if (!authorized || usertype !== UserType.Student) return redirect('/')

    const course = await CourseRepository.getByStudentEmail(email)

    if (course === null)
        return (
            <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
                <div className='flex flex-col items-center w-full space-y-10'>
                    <header className='max-w-sm flex flex-col items-center gap-4 text-center'>
                        <h1 className='text-xl font-bold'>
                            Debes unirte a un curso antes de reportar un problema
                        </h1>
                        <Button
                            asChild
                            className='w-fit'
                        >
                            <Link href={'/cursos/unirme'}>Quiero unirme a un curso</Link>
                        </Button>
                    </header>
                </div>
            </main>
        )

    const reportTypes = await ReportRepository.listTypes()

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Nuevo problema</h1>
                </header>
                <NewReportForm reportTypes={reportTypes} />
            </div>
        </main>
    )
}

export default NewReportPage
