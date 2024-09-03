'use client'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { ReactNode } from 'react'

export function LeafletProvider({ children }: { children: ReactNode }) {
    return <>{children}</>
}
