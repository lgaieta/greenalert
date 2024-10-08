import DefaultHeader from '@/components/header/default-header'
import SessionManager from '@/lib/services/SessionManager'

export default async function Header() {
    const { authorized } = await SessionManager.validateSession()

    if (authorized) return <p>user authorized</p>

    return <DefaultHeader />
}
