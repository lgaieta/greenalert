import type Course from '@/lib/entities/Course'
import type User from '@/lib/entities/User'
import { RequestError } from '@/lib/utils'
import { cookies } from 'next/headers'

class CourseRepository {
    static async listByProfessorEmail(email: User['email']): Promise<Course[]> {
        const accessToken = cookies().get('access_token')

        if (!accessToken) {
            throw new RequestError('No hay un token de acceso', 403)
        }

        const res = await fetch(
            `${process.env.GREENALERT_API_URL}/course/professor/${encodeURIComponent(email)}`,
            {
                headers: {
                    Cookie: `access_token=${accessToken.value},`
                }
            }
        )

        if (!res.ok)
            throw new RequestError(
                'Error al obtener la lista de cursos (http request).',
                res.status
            )

        return await res.json()
    }
}

export default CourseRepository
