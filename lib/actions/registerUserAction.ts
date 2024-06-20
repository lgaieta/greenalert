'use server'

import { RegisterFormErrors } from '@/components/register-form'
import { registerUserInRepository } from '../services/registerUserInRepository'
import { RequestError } from '../utils'

export async function registerUserAction(
    previousState: RegisterFormErrors,
    formData: FormData
) {
    const { email = '', password = '' } = Object.fromEntries(formData.entries())

    if (!email || !password || email instanceof File || password instanceof File) {
        return ['Debe completar todos los campos.']
    }

    const newUser = { email, password }

    try {
        await registerUserInRepository(newUser)
    } catch (error) {
        console.error(error)

        if (error instanceof RequestError) {
            if (error.code === 500) {
                return ['Error del servidor.']
            }

            if (error.code === 400) {
                return ['Ya existe un usuario con ese email.']
            }
        }

        return ['Error al registrar el usuario.']
    }

    return []
}
