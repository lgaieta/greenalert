'use server'

import { RegisterFormErrors } from '@/components/register-form'
import { RequestError } from '../utils'
import UserRepository from '../services/UserRepository'
import SessionManager from '@/lib/services/SessionManager'
import { redirect } from 'next/navigation'

export async function registerUserAction(
    previousState: RegisterFormErrors,
    formData: FormData
) {
    const { email, password } = Object.fromEntries(formData.entries())

    if (!email || !password || email instanceof File || password instanceof File) {
        return ['Debe completar todos los campos.']
    }

    const newUser = { email, password }

    try {
        await UserRepository.register(newUser)
        const response = await UserRepository.login(newUser)
        SessionManager.setSessionFromSetCookie(response.headers.getSetCookie())
    } catch (error) {
        console.error(error)

        if (error instanceof RequestError) {
            if (error.code === 500) {
                return ['Error del servidor.']
            }

            if (error.code === 400) {
                return ['Ocurrio un error.']
            }
        }

        return ['Error al registrar el usuario.']
    }

    redirect('/')
}
