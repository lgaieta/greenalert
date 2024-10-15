import { Button } from '@/components/ui/button'
import UserRepository from '@/lib/services/UserRepository'
import Link from 'next/link'

async function DirectorListPage() {
    const users = await UserRepository.listDirectors()

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Directores</h1>
                </header>
                <Button asChild>
                    <Link href='/directores/nuevo'>Nuevo director</Link>
                </Button>
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
            </div>
        </main>
    )
}

export default DirectorListPage
