'use server'

import type User from '@/lib/entities/User'
import UserRepository from '@/lib/services/UserRepository'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function leaveCourseAction(email: User['email']) {
    try {
        await UserRepository.leaveCourse(email)
    } catch (error) {
        console.error(error)

        return {
            errors: {
                general: 'Ha ocurrido un error.'
            }
        }
    }

    revalidatePath('/cursos')
    redirect('/')
}
