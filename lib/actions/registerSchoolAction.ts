'use server'

import SchoolRepository from '@/lib/services/SchoolRepository'
import { RequestError } from '@/lib/utils'

export async function registerSchoolAction(formData: FormData) {
    const { cue, locality, name } = Object.fromEntries(formData.entries())

    if (
        !cue ||
        cue instanceof File ||
        !name ||
        name instanceof File ||
        !locality ||
        locality instanceof File
    ) {
        return ['Debe completar todos los campos.']
    }

    const school = { cue, locality, name }

    try {
        await SchoolRepository.save(school)
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
