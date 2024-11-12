'use server'

import type { DirectorSelectorFormState } from '@/components/director-selector'
import type School from '@/lib/entities/School'
import UserRepository from '@/lib/services/UserRepository'
import { RequestError } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export async function setSchoolDirectorAction(
    cue: School['cue'],
    prevState: DirectorSelectorFormState,
    formData: FormData
) {
    const { email } = Object.fromEntries(formData.entries())

    if (!email || email instanceof File) {
        return {
            errors: {
                email: 'Debes completar el email.'
            }
        }
    }

    try {
        await UserRepository.setSchoolDirector(cue, email)
    } catch (error) {
        console.error(error)

        if (error instanceof RequestError) {
            if (error.code === 500) {
                return {
                    errors: {
                        general: 'Ha ocurrido un error.'
                    }
                }
            }

            if (error.code === 400) {
                return {
                    errors: {
                        general: 'No existe un usuario con ese email.'
                    }
                }
            }
        }

        return {
            errors: {
                general: 'Ha ocurrido un error.'
            }
        }
    }

    revalidatePath('/escuelas/detalles/' + cue)
    return {
        errors: {}
    }
}
