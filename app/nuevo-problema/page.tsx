import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function NewReportPage() {
    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='max-w-sm w-full space-y-10'>
                <header className='flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Nuevo problema</h1>
                </header>
                <form action=''>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='description'>Descripción</Label>
                        <Input id='description' />
                    </div>
                </form>
            </div>
        </main>
    )
}

export default NewReportPage
