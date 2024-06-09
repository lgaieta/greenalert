import { RegisterForm } from '@/components/register-form'

function RegisterPage() {
    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12'>
            <div className='max-w-sm w-full space-y-6'>
                <header className='flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Crear cuenta</h1>
                    <p className='text-gray-500 dark:text-gray-400'>
                        El primer paso para empezar a visualizar
                    </p>
                </header>
                <RegisterForm />
            </div>
        </main>
    )
}

export default RegisterPage
