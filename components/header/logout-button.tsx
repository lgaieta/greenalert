import { Button } from '@/components/ui/button'
import { logoutUserAction } from '@/lib/actions/logoutUserAction'

function LogoutButton() {
    return (
        <form action={logoutUserAction}>
            <Button className='bg-destructive/15 text-destructive hover:bg-destructive/25'>
                Cerrar sesion
            </Button>
        </form>
    )
}

export default LogoutButton
