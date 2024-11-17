'use server'

import type { NewProfessorFormState } from '@/components/new-professor-form'
import SessionManager from '@/lib/services/SessionManager'
import UserRepository from '@/lib/services/UserRepository'
import { RequestError } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function registerProfessorAction(
    prevState: NewProfessorFormState,
    formData: FormData
) {
    const { email } = Object.fromEntries(formData.entries())

    if (!email || email instanceof File) {
        return {
            errors: {
                email: 'Debes completar el email.'
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

    const { schoolCue } = validatedSession

    if (!schoolCue)
        return {
            errors: {
                general: 'No tienes un colegio asignado.'
            }
        }

    try {
        await UserRepository.registerProfessor(email, schoolCue)
    } catch (error) {
        console.error(error)

        if (error instanceof RequestError) {
            if (error.code === 500) {
                return {
                    errors: {
                        general: 'Ha ocurrido un error.'
                    }
                }
            }

            if (error.code === 400) {
                return {
                    errors: {
                        general: 'No existe un usuario con ese email.'
                    }
                }
            }
        }

        return {
            errors: {
                general: 'Ha ocurrido un error.'
            }
        }
    }

    revalidatePath('/profesores')
    redirect('/profesores')
}
