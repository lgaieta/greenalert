import type School from '@/lib/entities/School'
import { RequestError } from '@/lib/utils'
import { cookies } from 'next/headers'

class SchoolRepository {
    static async list(): Promise<School[]> {
        const accessToken = cookies().get('access_token')

        if (!accessToken) {
            throw new RequestError('No hay un token de acceso', 403)
        }

        const res = await fetch(`${process.env.GREENALERT_API_URL}/school`, {
            headers: {
                Cookie: `access_token=${accessToken.value},`
            }
        })

        if (!res.ok)
            throw new RequestError('Error al obtener la lista de escuelas', res.status)

        return await res.json()
    }

    static async getByCue(cue: School['cue']): Promise<School> {
        const accessToken = cookies().get('access_token')

        if (!accessToken) {
            throw new RequestError('No hay un token de acceso', 403)
        }

        const res = await fetch(`${process.env.GREENALERT_API_URL}/school/cue/${cue}`, {
            headers: {
                Cookie: `access_token=${accessToken.value},`
            }
        })

        if (!res.ok)
            throw new RequestError(
                'Error al obtener la escuela (http request).',
                res.status
            )

        return await res.json()
    }

    static async save(school: School) {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/school`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: `access_token=${cookies().get('access_token')?.value || ''},`
            },
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
