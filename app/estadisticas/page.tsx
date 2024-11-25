import ReportTypeStatistics from '@/components/report-type-statistics'
import ReportRepository from '@/lib/services/ReportRepository'

async function Statistics() {
    const statistics = await ReportRepository.getStatisticsByReportType()

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Estadísticas</h1>
                </header>
                <ReportTypeStatistics data={statistics} />
            </div>
        </main>
    )
}

export default Statistics
