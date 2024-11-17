import { Button } from '@/components/ui/button'
import UserType from '@/lib/entities/UserType'
import SessionManager from '@/lib/services/SessionManager'
import UserRepository from '@/lib/services/UserRepository'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function ProfessorListPage() {
    const validation = await SessionManager.validateSession()

    if (!validation.authorized || validation.usertype !== UserType.Director)
        return redirect('/')

    const { schoolCue } = validation

    if (!schoolCue)
        return (
            <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
                <div className='flex flex-col items-center w-full space-y-10'>
                    <header className='max-w-sm flex flex-col gap-2 text-center'>
                        <h1 className='text-xl font-bold'>
                            No posee una escuela asignada a su cuenta, solicite al
                            administrador su asignación.
                        </h1>
                    </header>
                </div>
            </main>
        )

    const users = await UserRepository.listProfessorsByCue(schoolCue)

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Profesores</h1>
                </header>
                <Button asChild>
                    <Link href='/profesores/nuevo'>Nuevo profesor</Link>
                </Button>
                {users.length < 1 ? (
                    <p>No hay docentes autorizados.</p>
                ) : (
                    <ul className='flex flex-col gap-4 max-w-xl w-full'>
                        {users.map(user => (
                            <li
                                key={user.email}
                                className='flex p-4 rounded-lg w-full border border-border'
                            >
                                <span>{user.email}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    )
}

export default ProfessorListPage
