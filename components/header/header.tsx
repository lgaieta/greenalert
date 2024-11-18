import AdminHeader from '@/components/header/admin-header'
import DefaultHeader from '@/components/header/default-header'
import DirectorHeader from '@/components/header/director-header'
import ProfessorHeader from '@/components/header/professor-header'
import StudentHeader from '@/components/header/student-header'
import UserType from '@/lib/entities/UserType'
import SessionManager from '@/lib/services/SessionManager'

export default async function Header() {
    const { authorized, usertype, email } = await SessionManager.validateSession()

    if (!authorized) return <DefaultHeader />
    if (usertype === UserType.Student) return <StudentHeader email={email} />
    if (usertype === UserType.Professor) return <ProfessorHeader />
    if (usertype === UserType.Director) return <DirectorHeader />
    if (usertype === UserType.Admin) return <AdminHeader />
    return <DefaultHeader />
}
