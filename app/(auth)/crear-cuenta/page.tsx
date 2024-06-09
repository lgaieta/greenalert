import { RegisterForm } from '@/components/register-form'

function RegisterPage() {
    return (
        <main className='mx-auto max-w-md space-y-6 py-12 px-4'>
            <header className='flex flex-col gap-2 text-center'>
                <h1 className='text-3xl font-bold'>Crear cuenta</h1>
                <p className='text-gray-500 dark:text-gray-400'>
                    El primer paso para empezar a visualizar
                </p>
            </header>
            <RegisterForm />
        </main>
    )
}

export default RegisterPage
