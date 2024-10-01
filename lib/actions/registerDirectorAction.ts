'use server'

import UserRepository from '@/lib/services/UserRepository'
import { RequestError } from '@/lib/utils'

export async function registerDirectorAction(formData: FormData) {
    const { email } = Object.fromEntries(formData.entries())

    if (!email || email instanceof File) {
        return ['Debe completar todos los campos.']
    }

    try {
        await UserRepository.registerDirector(email)
    } catch (error) {
        console.error(error)

        if (error instanceof RequestError) {
            if (error.code === 500) {
                return ['Error del servidor.']
            }

            if (error.code === 400) {
                return ['No existe un usuario con ese email.']
            }
        }

        return ['Error al asignar el usuario.']
    }

    return []
}
