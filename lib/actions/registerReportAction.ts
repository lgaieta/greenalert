'use server'

import ReportRepository from '@/lib/services/ReportRepository'
import { RequestError } from '@/lib/utils'
import { LatLngTuple } from 'leaflet'

export async function registerReportAction(latLng: LatLngTuple, formData: FormData) {
    const { description } = Object.fromEntries(formData.entries())

    if (!description || description instanceof File) {
        return ['Debe completar todos los campos.']
    }

    const report = { id: 1, lat: latLng[0], lng: latLng[1], description }

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

    return []
}
