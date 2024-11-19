import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { acceptReportAction } from '@/lib/actions/acceptReportAction'
import { denyReportAction } from '@/lib/actions/denyReportAction'
import type Report from '@/lib/entities/Report'
import UserType from '@/lib/entities/UserType'
import ReportRepository from '@/lib/services/ReportRepository'
import SessionManager from '@/lib/services/SessionManager'
import { redirect } from 'next/navigation'

async function ReportListPage() {
    const { authorized, usertype, schoolCue, email } =
        await SessionManager.validateSession()

    if (!authorized || usertype !== UserType.Professor) return redirect('/')

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

    const reports = await ReportRepository.listUnseenProfessorReports(email)

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Reportes pendientes</h1>
                </header>
                {reports.length < 1 ? (
                    <p>No hay reportes pendientes</p>
                ) : (
                    <ul className='flex flex-col gap-4 max-w-xl w-full'>
                        {reports.map(report => (
                            <Card
                                key={report.id}
                                className='flex flex-col gap-4 p-8 w-full'
                            >
                                <div className='flex flex-col gap-2'>
                                    <h2 className='font-bold text-xl'>
                                        {report.description}
                                    </h2>
                                    <p>Escuela: {report.schoolName}</p>
                                    <p>Tipo de problema: {report.typeName}</p>
                                    <p>Localidad: {report.localityName}</p>
                                </div>
                                <div className='w-full flex justify-end gap-2'>
                                    <DenyReportButton report={report} />
                                    <AcceptReportButton report={report} />
                                </div>
                            </Card>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    )
}

function AcceptReportButton(props: { report: Report }) {
    return (
        <form action={acceptReportAction.bind(null, props.report)}>
            <Button>Aceptar reporte</Button>
        </form>
    )
}
function DenyReportButton(props: { report: Report }) {
    return (
        <form action={denyReportAction.bind(null, props.report)}>
            <Button variant={'destructive'}>Rechazar reporte</Button>
        </form>
    )
}

export default ReportListPage
