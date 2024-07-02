'use server'

import { LoginFormErrors } from '@/components/login-form'
import { RequestError } from '../utils'
import UserRepository from '../services/UserRepository'
import { cookies } from 'next/headers'

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
        const setCookieHeader = response.headers.getSetCookie()
        if (setCookieHeader) {
            setCookieHeader.forEach(cookie => {
                const [cookieName, ...cookieAttributes] = cookie.split('=')
                cookies().set(cookieName, cookieAttributes.join('='), {
                    httpOnly: true
                })
            })
        }
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

    return []
}
