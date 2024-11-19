import ReportRepository from '@/lib/services/ReportRepository'
import dynamic from 'next/dynamic'

const ReportsMap = dynamic(() => import('@/components/reports-map'), { ssr: false })

async function MapPage() {
    const reports = await ReportRepository.listAccepted()

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Problemas ambientales</h1>
                </header>
                <ReportsMap reports={reports} />
            </div>
        </main>
    )
}

export default MapPage
