'use server'

import { RegisterFormErrors } from '@/components/register-form'
import { RequestError } from '../utils'
import UserRepository from '../services/UserRepository'
import SessionManager from '@/lib/services/SessionManager'
import { redirect } from 'next/navigation'

export async function registerUserAction(
    previousErrors: RegisterFormErrors,
    formData: FormData
): Promise<RegisterFormErrors> {
    const { email, password, repeatedPassword } = Object.fromEntries(formData.entries())

    const errors: RegisterFormErrors = []

    if (!email || password instanceof File || !password || !repeatedPassword) {
        errors.push('Debe completar todos los campos.')
    }

    if (password !== repeatedPassword) {
        errors.push('Las contraseñas no coinciden.')
    }

    if (errors.length > 0) {
        return errors
    }

    try {
        const newUser = { email: email as string, password: password as string }
        await UserRepository.register(newUser)
        const response = await UserRepository.login(newUser)
        SessionManager.setSessionFromSetCookie(response.headers.getSetCookie())
    } catch (error) {
        if (error instanceof RequestError) {
            switch (error.code) {
                case 500:
                    return ['Error del servidor.']
                case 400:
                    return ['Ocurrió un error.']
                default:
                    return ['Error al registrar el usuario.']
            }
        }
        return ['Error al registrar el usuario.']
    }

    redirect('/')
}
