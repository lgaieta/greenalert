'use client'

import Report from '@/lib/entities/Report'
import { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

const DEFAULT_MAP_POSITION: LatLngTuple = [-34.607346526878345, -418.44560643938166]

type ReportsMapProps = {
    reports: Report[]
}

function ReportsMap({ reports }: ReportsMapProps) {
    const firstMapPosition: LatLngTuple = [
        reports.at(0)?.lat || DEFAULT_MAP_POSITION[0],
        reports.at(0)?.lng || DEFAULT_MAP_POSITION[1]
    ]
    return (
        <div className='w-full px-4 md:px-16 max-w-4xl'>
            <MapContainer
                center={firstMapPosition}
                zoom={13}
                className='h-[500px] w-full'
            >
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {reports.map(report => (
                    <Marker
                        position={[report.lat, report.lng]}
                        key={report.id}
                    ></Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default ReportsMap
