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

    static async registerCourse(
        courseFields: Pick<Course, 'name' | 'professorEmail' | 'schoolCue'>
    ) {
        const accessToken = cookies().get('access_token')

        if (!accessToken) {
            throw new RequestError('No hay un token de acceso', 403)
        }

        const res = await fetch(`${process.env.GREENALERT_API_URL}/course`, {
            body: JSON.stringify(courseFields),
            method: 'POST',
            headers: {
                Cookie: `access_token=${accessToken.value},`,
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok)
            throw new RequestError('Error al crear el curso (http request).', res.status)

        return await res.json()
    }

    static async getByStudentEmail(email: User['email']): Promise<Course | null> {
        const accessToken = cookies().get('access_token')

        if (!accessToken) {
            throw new RequestError('No hay un token de acceso', 403)
        }

        const res = await fetch(
            `${process.env.GREENALERT_API_URL}/course/student/${encodeURIComponent(email)}`,
            {
                headers: {
                    Cookie: `access_token=${accessToken.value},`
                }
            }
        )

        if (!res.ok)
            throw new RequestError(
                'Error al obtener el curso del alumno (http request).',
                res.status
            )

        return await res.json()
    }
}

export default CourseRepository
