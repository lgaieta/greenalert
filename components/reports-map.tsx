'use client'

import { type ExtendedReport } from '@/lib/entities/Report'
import { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const DEFAULT_MAP_POSITION: LatLngTuple = [-34.607346526878345, -418.44560643938166]

type ReportsMapProps = {
    reports: ExtendedReport[]
}

function ReportsMap({ reports }: ReportsMapProps) {
    const firstMapPosition: LatLngTuple = [
        reports.at(0)?.lat || DEFAULT_MAP_POSITION[0],
        reports.at(0)?.lng || DEFAULT_MAP_POSITION[1]
    ]
    return (
        <div className='w-full px-4 md:px-16'>
            <MapContainer
                center={firstMapPosition}
                zoom={13}
                className='h-[500px] md:h-[600px] xl:h-[800px] w-full'
            >
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {reports.map(report => (
                    <Marker
                        position={[report.lat, report.lng]}
                        key={report.id}
                    >
                        <Popup>
                            <ReportInfo report={report} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

function ReportInfo({ report }: { report: ExtendedReport }) {
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-xl !my-0 font-bold'>{report.description}</p>
            <p className='text-base !my-0'>Escuela: {report.schoolName}</p>
            <p className='!my-0'>Tipo de problema: {report.typeName}</p>
            <p className='!my-0'>Localidad: {report.localityName}</p>
        </div>
    )
}

export default ReportsMap
