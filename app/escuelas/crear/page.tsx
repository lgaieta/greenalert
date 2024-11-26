import NewSchoolForm from '@/components/new-school-form'
import LocalityRepository from '@/lib/services/LocalityRepository'
import SessionManager from '@/lib/services/SessionManager'
import { redirect } from 'next/navigation'

async function CreateSchool() {
    const { authorized } = await SessionManager.validateSession()

    if (!authorized) return redirect('/')

    const localities = await LocalityRepository.getLocalities()

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Nueva escuela</h1>
                </header>
                <NewSchoolForm localities={localities} />
            </div>
        </main>
    )
}

export default CreateSchool
