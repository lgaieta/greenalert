import type School from '@/lib/entities/School'
import { RequestError } from '@/lib/utils'

class SchoolRepository {
    static async save(school: School) {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/school`, {
            method: 'POST',
            body: JSON.stringify(school)
        })

        if (!res.ok)
            throw new RequestError(
                'Error al crear la escuela (http request).',
                res.status
            )

        return res
    }
}

export default SchoolRepository
