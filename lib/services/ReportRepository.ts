import Report from '@/lib/entities/Report'
import { RequestError } from '@/lib/utils'

class ReportRepository {
    static async save(report: Report) {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(report)
        })

        if (!res.ok)
            throw new RequestError(
                'Error al crear el reporte (http request).',
                res.status
            )

        return res
    }
}

export default ReportRepository
