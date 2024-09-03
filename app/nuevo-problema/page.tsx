'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

function NewReportPage() {
    return (
        <main className='flex gap-4 justify-center items-center h-full w-full py-12 lg:py-24'>
            <div className='flex flex-col items-center w-full space-y-10'>
                <header className='max-w-sm flex flex-col gap-2 text-center'>
                    <h1 className='text-3xl font-bold'>Nuevo problema</h1>
                </header>
                <form
                    action=''
                    className='flex flex-col gap-8 items-center w-full'
                >
                    <div className='max-w-sm flex flex-col gap-2 w-full'>
                        <Label htmlFor='description'>Descripción</Label>
                        <Input id='description' />
                    </div>
                    <MapContainer
                        center={[51.505, -0.09]}
                        zoom={13}
                        className='h-[500px] w-full'
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </form>
            </div>
        </main>
    )
}

export default NewReportPage
