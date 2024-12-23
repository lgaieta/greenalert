import UserRepository from '@/lib/services/UserRepository'
import { cookies } from 'next/headers'

class SessionManager {
    static setSessionFromSetCookie(setCookieHeader: string[]) {
        if (setCookieHeader) {
            setCookieHeader.forEach(cookie => {
                const [cookieName, ...cookieAttributes] = cookie.split('=')
                cookies().set(cookieName, cookieAttributes.join('='), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production'
                })
            })
        }
    }

    static removeSession() {
        cookies().delete('access_token')
    }

    static async validateSession() {
        const result = await UserRepository.validateSession()
        const { authorized } = result

        if (!authorized)
            return { authorized, email: null, usertype: null, schoolCue: null }

        return result
    }
}

export default SessionManager
