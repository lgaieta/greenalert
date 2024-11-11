import { LoginForm } from '@/components/login-form'
import SessionManager from '@/lib/services/SessionManager'
import { redirect } from 'next/navigation'

async function LoginPage() {
    const { authorized } = await SessionManager.validateSession()

    if (authorized) return redirect('/')

    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12'>
            <div className='max-w-sm w-full space-y-6'>
                <header className='flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Iniciar sesión</h1>
                </header>
                <LoginForm />
            </div>
        </main>
    )
}

export default LoginPage
