'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerReportAction } from '@/lib/actions/registerReportAction'
import { LatLngTuple } from 'leaflet'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet'

const DEFAULT_MAP_POSITION: LatLngTuple = [-34.607346526878345, -418.44560643938166]

function NewReportForm() {
    const [position, setPosition] = useState(DEFAULT_MAP_POSITION)

    const action = async (formData: FormData) => {
        await registerReportAction(position, formData)
    }

    return (
        <form
            action={action}
            className='flex flex-col gap-8 items-center w-full'
        >
            <div className='max-w-sm flex flex-col gap-2 w-full'>
                <Label htmlFor='description'>Descripción</Label>
                <Input
                    id='description'
                    name='description'
                    required
                />
            </div>
            <div className='flex flex-col items-center gap-2 w-full'>
                <Label className='max-w-sm w-full'>Elegir ubicación</Label>
                <div className='w-full px-4 md:px-16 max-w-4xl'>
                    <MapContainer
                        center={DEFAULT_MAP_POSITION}
                        zoom={13}
                        className='h-[500px] w-full'
                    >
                        <TileLayer
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <ReportMarker
                            position={position}
                            onPositionChange={setPosition}
                        />
                    </MapContainer>
                </div>
            </div>
            <SubmitButton />
        </form>
    )
}

type ReportMarkerProps = {
    position: LatLngTuple
    // eslint-disable-next-line no-unused-vars
    onPositionChange: (latlng: LatLngTuple) => void
}

function ReportMarker({ position, onPositionChange }: ReportMarkerProps) {
    useMapEvent('click', e => {
        const { lat, lng } = e.latlng
        onPositionChange([lat, lng])
    })
    return <Marker position={position}></Marker>
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            className='w-full max-w-sm'
            size='lg'
            type='submit'
            disabled={pending}
        >
            Reportar problema
        </Button>
    )
}

export default NewReportForm
