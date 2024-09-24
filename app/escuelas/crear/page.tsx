import NewSchoolForm from '@/components/new-school-form'

function CreateSchool() {
    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Nueva escuela</h1>
                </header>
                <NewSchoolForm />
            </div>
        </main>
    )
}

export default CreateSchool
