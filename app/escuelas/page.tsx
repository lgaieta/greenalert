import { Button } from '@/components/ui/button'
import SchoolRepository from '@/lib/services/SchoolRepository'
import SessionManager from '@/lib/services/SessionManager'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function SchoolListPage() {
    const { authorized } = await SessionManager.validateSession()

    if (!authorized) return redirect('/')
    const schools = await SchoolRepository.list()
    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Escuelas</h1>
                </header>
                <Button asChild>
                    <Link href='/escuelas/crear'>Nueva escuela</Link>
                </Button>
                <ul className='flex flex-col gap-4 max-w-xl w-full'>
                    {schools.map(school => (
                        <li
                            key={school.cue}
                            className='flex justify-between p-4 rounded-lg w-full border border-border'
                        >
                            <span>{school.name}</span>
                            <span>{school.locality}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default SchoolListPage
