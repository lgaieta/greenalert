import UserRepository from '@/lib/services/UserRepository'
import { cookies } from 'next/headers'

class SessionManager {
    static setSessionFromSetCookie(setCookieHeader: string[]) {
        if (setCookieHeader) {
            setCookieHeader.forEach(cookie => {
                const [cookieName, ...cookieAttributes] = cookie.split('=')
                cookies().set(cookieName, cookieAttributes.join('='), {
                    httpOnly: true
                })
            })
        }
    }

    static async validateSession() {
        const { authorized } = await UserRepository.validateSession()

        return { authorized }
    }
}

export default SessionManager
