'use server'

import UserType from '@/lib/entities/UserType'
import ReportRepository from '@/lib/services/ReportRepository'
import SessionManager from '@/lib/services/SessionManager'
import { RequestError } from '@/lib/utils'
import { LatLngTuple } from 'leaflet'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function registerReportAction(latLng: LatLngTuple, formData: FormData) {
    const { description, reportType } = Object.fromEntries(formData.entries())

    if (
        !description ||
        description instanceof File ||
        !reportType ||
        reportType instanceof File
    ) {
        return ['Debe completar todos los campos.']
    }

    const { authorized, email, usertype } = await SessionManager.validateSession()

    if (!authorized || usertype !== UserType.Student) return ['Sin autorizar.']

    const report = {
        id: 1,
        courseId: 2,
        lat: latLng[0],
        lng: latLng[1],
        description,
        email,
        type: Number(reportType),
        locality: 1
    }

    try {
        await ReportRepository.save(report)
    } catch (error) {
        console.error(error)

        if (error instanceof RequestError) {
            if (error.code === 500) {
                return ['Error del servidor.']
            }

            if (error.code === 400) {
                return ['Ya existe un usuario con ese email.']
            }
        }

        return ['Error al registrar el usuario.']
    }

    revalidatePath('/mapa')
    redirect('/mapa')
}
