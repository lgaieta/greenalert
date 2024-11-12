import NewProfessorForm from '@/components/new-professor-form'
import SessionManager from '@/lib/services/SessionManager'
import { redirect } from 'next/navigation'

async function NewProfessorPage() {
    const { authorized } = await SessionManager.validateSession()

    if (!authorized) return redirect('/')

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Nuevo profesor</h1>
                </header>
                <NewProfessorForm />
            </div>
        </main>
    )
}

export default NewProfessorPage
