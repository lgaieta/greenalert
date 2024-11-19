'use server'

import type Report from '@/lib/entities/Report'
import UserType from '@/lib/entities/UserType'
import ReportRepository from '@/lib/services/ReportRepository'
import SessionManager from '@/lib/services/SessionManager'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function acceptReportAction(report: Report) {
    const validatedSession = await SessionManager.validateSession()

    if (!validatedSession.authorized || validatedSession.usertype !== UserType.Professor)
        return

    try {
        await ReportRepository.acceptReport(report)
    } catch (error) {
        console.error(error)

        return {
            errors: {
                general: 'Ha ocurrido un error.'
            }
        }
    }

    revalidatePath('/reportes')
    const random = Math.random()
    redirect(`/reportes?${random}`)
}
