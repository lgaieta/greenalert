import NewDirectorForm from '@/components/new-director-form'
import UserType from '@/lib/entities/UserType'
import SessionManager from '@/lib/services/SessionManager'
import { redirect } from 'next/navigation'

async function NewDirectorPage() {
    const { authorized, usertype } = await SessionManager.validateSession()

    if (!authorized || usertype !== UserType.Admin) return redirect('/')

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Nuevo director</h1>
                </header>
                <NewDirectorForm />
            </div>
        </main>
    )
}

export default NewDirectorPage
