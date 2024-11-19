import Report, { type ExtendedReport } from '@/lib/entities/Report'
import type User from '@/lib/entities/User'
import { RequestError } from '@/lib/utils'
import { cookies } from 'next/headers'

class ReportRepository {
    static async save(report: Report) {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: `access_token=${cookies().get('access_token')?.value || ''},`
            },
            body: JSON.stringify(report)
        })

        if (!res.ok)
            throw new RequestError(
                'Error al crear el reporte (http request).',
                res.status
            )

        return res
    }

    static async list(): Promise<ExtendedReport[]> {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/report`)

        if (!res.ok)
            throw new RequestError(
                'Error al obtener los reportes (http request).',
                res.status
            )

        return await res.json()
    }

    static async listAccepted(): Promise<ExtendedReport[]> {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/report/accepted`)

        if (!res.ok)
            throw new RequestError(
                'Error al obtener los reportes (http request).',
                res.status
            )

        return await res.json()
    }

    static async listUnseenProfessorReports(
        email: User['email']
    ): Promise<ExtendedReport[]> {
        const accessToken = cookies().get('access_token')

        if (!accessToken) throw new RequestError('Sin autorizar.', 403)

        const res = await fetch(
            `${process.env.GREENALERT_API_URL}/report/unseen/professor/${encodeURIComponent(email)}`,
            {
                headers: {
                    Cookie: `access_token=${accessToken.value},`
                }
            }
        )

        if (!res.ok)
            throw new RequestError('Error al salir del curso (http request).', res.status)

        return await res.json()
    }

    static async acceptReport(report: Report) {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/report/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: `access_token=${cookies().get('access_token')?.value || ''},`
            },
            body: JSON.stringify({ report })
        })

        if (!res.ok)
            throw new RequestError(
                'Error al aceptar el reporte (http request).',
                res.status
            )

        return res
    }

    static async denyReport(report: Report) {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/report/deny`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: `access_token=${cookies().get('access_token')?.value || ''},`
            },
            body: JSON.stringify({ report })
        })

        if (!res.ok)
            throw new RequestError(
                'Error al rechazar el reporte (http request).',
                res.status
            )

        return res
    }

    static async getById(id: Report['id']): Promise<Report> {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/report/unit/${id}`)

        if (!res.ok)
            throw new RequestError(
                'Error al obtener el tipo de reporte (http request).',
                res.status
            )

        return (await res.json()).type
    }
}

export default ReportRepository
