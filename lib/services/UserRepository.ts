import NewUser from '../entities/NewUser'
import { RequestError } from '../utils'

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

    static async login(newUser: NewUser) {
        const res = await fetch(`${process.env.GREENALERT_API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newUser)
        })

        if (!res.ok)
            throw new RequestError('Error al iniciar sesion (http request).', res.status)

        return res
    }
}

export default UserRepository
