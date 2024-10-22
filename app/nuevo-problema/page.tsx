'use client'
import NewReportForm from '@/components/new-report/new-report-form'

function NewReportPage() {
    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Nuevo problema</h1>
                </header>
                <NewReportForm />
            </div>
        </main>
    )
}

export default NewReportPage
