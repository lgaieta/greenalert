import NewDirectorForm from '@/components/new-director-form'

function NewDirectorRepository() {
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

export default NewDirectorRepository
