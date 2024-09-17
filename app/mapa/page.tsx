import ReportsMap from '@/components/reports-map'
import Report from '@/lib/entities/Report'

const fakeReports: Report[] = [
    {
        id: 15,
        lat: 20.6,
        lng: 31.22,
        description: 'Example 1'
    }
]

function MapPage() {
    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Problemas ambientales</h1>
                </header>
                <ReportsMap reports={fakeReports} />
            </div>
        </main>
    )
}

export default MapPage
