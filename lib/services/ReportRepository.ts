import Report from '@/lib/entities/Report'
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

    static async list(): Promise<Report[]> {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/report`)

        if (!res.ok)
            throw new RequestError(
                'Error al obtener los reportes (http request).',
                res.status
            )

        return await res.json()
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
