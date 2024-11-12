'use server'

import type { NewCourseFormState } from '@/components/new-course-form'
import CourseRepository from '@/lib/services/CourseRepository'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function registerCourseAction(
    email: string,
    prevState: NewCourseFormState,
    formData: FormData
) {
    const { name } = Object.fromEntries(formData.entries())

    if (!name || name instanceof File) {
        return {
            errors: {
                name: 'Debes completar el nombre.'
            }
        }
    }

    try {
        await CourseRepository.registerCourse({
            professorEmail: email,
            name,
            schoolCue: 12345678
        })
    } catch (error) {
        console.error(error)

        return {
            errors: {
                general: 'Ha ocurrido un error.'
            }
        }
    }

    revalidatePath('/cursos/profesor')
    revalidatePath('/cursos')
    redirect('/cursos/profesor')
}
