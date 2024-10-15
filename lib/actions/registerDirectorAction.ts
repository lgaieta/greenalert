'use server'

import type { NewDirectorFormState } from '@/components/new-director-form'
import UserRepository from '@/lib/services/UserRepository'
import { RequestError } from '@/lib/utils'
import { redirect } from 'next/navigation'

export async function registerDirectorAction(
    prevState: NewDirectorFormState,
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

    try {
        await UserRepository.registerDirector(email)
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
                general: 'No existe un usuario con ese email.'
            }
        }
    }

    redirect('/directores')
}
