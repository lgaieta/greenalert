import { Button } from '@/components/ui/button'
import { logoutUserAction } from '@/lib/actions/logoutUserAction'

function LogoutButton() {
    return (
        <form action={logoutUserAction}>
            <Button variant={'destructive'}>Cerrar sesion</Button>
        </form>
    )
}

export default LogoutButton
