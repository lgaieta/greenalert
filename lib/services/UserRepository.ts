import type User from '@/lib/entities/User'
import NewUser from '../entities/NewUser'
import { RequestError } from '../utils'
import UserType from '@/lib/entities/UserType'
import { cookies } from 'next/headers'

class UserRepository {
    static async register(newUser: NewUser) {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

        if (!res.ok)
            throw new RequestError(
                'Error al registrar el usuario (http request).',
                res.status
            )
    }

    static async registerDirector(email: User['email']) {
        const res = await fetch(
            `${process.env.GREENALERT_API_URL}/user/director/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            }
        )

        if (!res.ok)
            throw new RequestError(
                'Error al registrar el usuario (http request).',
                res.status
            )
    }

    static async registerProfessor(email: User['email']) {
        const accessToken = cookies().get('access_token')

        if (!accessToken) throw new RequestError('Usuario no autorizado.', 403)

        const res = await fetch(
            `${process.env.GREENALERT_API_URL}/user/professor/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: `access_token=${accessToken.value},`
                },
                body: JSON.stringify({ email })
            }
        )

        if (!res.ok)
            throw new RequestError(
                'Error al registrar el usuario (http request).',
                res.status
            )
    }

    static async listDirectors(): Promise<User[]> {
        const accessToken = cookies().get('access_token')

        if (!accessToken) return []

        const res = await fetch(`${process.env.GREENALERT_API_URL}/user/director`, {
            headers: {
                Cookie: `access_token=${accessToken.value},`
            }
        })

        if (!res.ok) throw new RequestError('Error al listar los directores', res.status)

        return await res.json()
    }

    static async listProfessors(): Promise<User[]> {
        try {
            const accessToken = cookies().get('access_token')

            if (!accessToken) return []

            const res = await fetch(`${process.env.GREENALERT_API_URL}/user/professor`, {
                headers: {
                    Cookie: `access_token=${accessToken.value},`
                }
            })

            if (!res.ok)
                throw new RequestError('Error al listar los profesores', res.status)

            return await res.json()
        } catch (error) {
            return []
        }
    }

    static async validateSession(): Promise<
        { authorized: false } | { authorized: true; usertype: UserType; email: string }
    > {
        try {
            const accessToken = cookies().get('access_token')

            if (!accessToken) return { authorized: false }

            const res = await fetch(`${process.env.GREENALERT_API_URL}/user/validate`, {
                headers: {
                    Cookie: `access_token=${accessToken.value},`
                }
            })
            if (!res.ok) return { authorized: false } as const
            const { usertype, email } = await res.json()

            return { authorized: true, usertype, email } as const
        } catch (error) {
            return { authorized: false } as const
        }
    }

    static async login(newUser: NewUser) {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

        if (!res.ok)
            throw new RequestError('Error al iniciar sesion (http request).', res.status)

        return res
    }
}

export default UserRepository
