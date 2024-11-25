interface Report {
    id: number
    email: string
    courseId: number
    type: number
    locality: number
    lat: number
    lng: number
    description: string
}

export default Report

export interface ExtendedReport {
    id: number
    email: string
    courseId: number
    courseName: string
    schoolName: string
    type: number
    typeName: string
    locality: number
    localityName: string
    lat: number
    lng: number
    description: string
}

export interface ReportType {
    id: number
    name: string
}
