'use server'

import { LoginFormErrors } from '@/components/login-form'
import { RequestError } from '../utils'
import UserRepository from '../services/UserRepository'
import { redirect } from 'next/navigation'
import SessionManager from '@/lib/services/SessionManager'

export async function loginUserAction(
    previousState: LoginFormErrors,
    formData: FormData
): Promise<LoginFormErrors> {
    const { email, password } = Object.fromEntries(formData.entries())

    if (!email || !password || email instanceof File || password instanceof File) {
        return ['Debe completar todos los campos.']
    }

    const user = { email, password }

    try {
        const response = await UserRepository.login(user)
        SessionManager.setSessionFromSetCookie(response.headers.getSetCookie())
    } catch (error) {
        console.error(error)

        if (error instanceof RequestError) {
            if (error.code === 500) {
                return ['Error del servidor.']
            }

            if (error.code === 400) {
                return ['Email o contraseña incorrectos.']
            }
        }

        return ['Error al iniciar sesión.']
    }

    redirect('/')
}
