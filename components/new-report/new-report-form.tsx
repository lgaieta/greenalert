'use client'
import { LeafletProvider } from '@/components/leaflet-provider'
import ReportTypeSelect from '@/components/new-report/report-type-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerReportAction } from '@/lib/actions/registerReportAction'
import type { ReportType } from '@/lib/entities/Report'
import { LatLngTuple } from 'leaflet'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import dynamic from 'next/dynamic'
import { Marker, useMapEvent } from 'react-leaflet'

const MapContainer = dynamic(
    () => import('react-leaflet').then(mod => mod.MapContainer),
    { ssr: false }
)
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), {
    ssr: false
})

const DEFAULT_MAP_POSITION: LatLngTuple = [-34.607346526878345, -418.44560643938166]

function NewReportForm(props: { reportTypes: ReportType[] }) {
    const [position, setPosition] = useState(DEFAULT_MAP_POSITION)

    const action = async (formData: FormData) => {
        await registerReportAction(position, formData)
    }

    return (
        <LeafletProvider>
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
                <MapSelector
                    position={position}
                    onPositionChange={setPosition}
                />
                <ReportTypeSelect types={props.reportTypes} />
                <SubmitButton />
            </form>
        </LeafletProvider>
    )
}

function MapSelector(props: {
    position: LatLngTuple
    // eslint-disable-next-line no-unused-vars
    onPositionChange: (latlng: LatLngTuple) => void
}) {
    console.log('rendered map')

    return (
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
                        position={props.position}
                        onPositionChange={props.onPositionChange}
                    />
                </MapContainer>
            </div>
        </div>
    )
}

function ReportMarker({
    position,
    onPositionChange
}: {
    position: LatLngTuple
    // eslint-disable-next-line no-unused-vars
    onPositionChange: (latlng: LatLngTuple) => void
}) {
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
