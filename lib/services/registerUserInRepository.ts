import NewUser from '../entities/NewUser'
import { RequestError } from '../utils'

export async function registerUserInRepository(newUser: NewUser) {
    const res = await fetch('mockurl.com/register', {
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
