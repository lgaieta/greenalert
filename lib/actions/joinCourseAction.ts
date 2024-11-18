'use server'

import type { JoinCourseFormState } from '@/components/join-course-form'
import SessionManager from '@/lib/services/SessionManager'
import UserRepository from '@/lib/services/UserRepository'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function joinCourseAction(
    prevState: JoinCourseFormState,
    formData: FormData
) {
    const { code } = Object.fromEntries(formData.entries())

    if (!code || code instanceof File) {
        return {
            errors: {
                code: 'Debes completar el código.'
            }
        }
    }

    const validatedSession = await SessionManager.validateSession()

    if (!validatedSession.authorized)
        return {
            errors: {
                general: 'Debes iniciar sesión.'
            }
        }

    const { email } = validatedSession

    try {
        await UserRepository.joinCourse(code, email)
    } catch (error) {
        console.error(error)

        return {
            errors: {
                general: 'Ha ocurrido un error.'
            }
        }
    }

    revalidatePath('/cursos')
    redirect('/cursos')
}
