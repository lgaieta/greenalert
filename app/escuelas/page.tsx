import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import UserType from '@/lib/entities/UserType'
import SchoolRepository from '@/lib/services/SchoolRepository'
import SessionManager from '@/lib/services/SessionManager'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function SchoolListPage() {
    const { authorized, usertype } = await SessionManager.validateSession()

    if (!authorized || usertype !== UserType.Admin) return redirect('/')

    const schools = await SchoolRepository.list()
    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24 px-6'>
            <div className='flex flex-col gap-10 items-center w-full max-w-2xl'>
                <header className='flex flex-col w-full min-[512px]:flex-row min-[512px]:justify-between min-[512px]:items-center gap-4 text-center'>
                    <h1 className='text-3xl text-center min-[512px]:text-start w-full md:text-4xl lg:text-5xl font-bold'>
                        Escuelas
                    </h1>
                    <Button
                        asChild
                        variant={'secondary'}
                    >
                        <Link href='/escuelas/crear'>Nueva escuela</Link>
                    </Button>
                </header>
                {schools.length < 1 ? (
                    <p className='text-gray-600 dark:text-gray-300'>
                        Aún no hay escuelas registradas.
                    </p>
                ) : (
                    <ul className='w-full grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        {schools.map(school => (
                            <li key={school.cue}>
                                <Link href={`/escuelas/detalles/${school.cue}`}>
                                    <Card className='w-full'>
                                        <CardHeader className='p-8 sm:p-12'>
                                            <CardTitle className='text-xl font-normal'>
                                                {school.name}
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    )
}

export default SchoolListPage
