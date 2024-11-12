import { Card, CardContent } from '@/components/ui/card'
import type School from '@/lib/entities/School'
import UserType from '@/lib/entities/UserType'
import SchoolRepository from '@/lib/services/SchoolRepository'
import SessionManager from '@/lib/services/SessionManager'
import UserRepository from '@/lib/services/UserRepository'
import { redirect } from 'next/navigation'

async function SchoolDetailsPage({ params }: { params: { cue: string } }) {
    const { authorized, usertype } = await SessionManager.validateSession()

    if (!authorized || usertype !== UserType.Admin) return redirect('/')

    const school = await SchoolRepository.getByCue(params.cue)

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>{school.name}</h1>
                </header>
                <Card>
                    <CardContent className='p-8'>
                        <p>CUE: {school.cue}</p>
                        <SchoolDirector cue={school.cue} />
                        <DirectorSelector />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

async function SchoolDirector(props: { cue: School['cue'] }) {
    const director = await UserRepository.getSchoolDirector(props.cue)
    return <p>Director: {director?.email || 'No hay un director asignado'}</p>
}

function DirectorSelector() {
    return <div>asdas</div>
}

export default SchoolDetailsPage
