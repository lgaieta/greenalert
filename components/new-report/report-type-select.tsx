import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const reportTypes = [
    { id: 1, name: 'Contaminación del aire' },
    { id: 2, name: 'Contaminación del agua' },
    { id: 3, name: 'Deforestación' },
    { id: 4, name: 'Residuos sólidos' },
    { id: 5, name: 'Erosión del suelo' },
    { id: 6, name: 'Pérdida de biodiversidad' },
    { id: 7, name: 'Ruido ambiental' },
    { id: 8, name: 'Uso excesivo de recursos naturales' },
    { id: 9, name: 'Cambio climático' },
    { id: 10, name: 'Desastres naturales' },
    { id: 11, name: 'Contaminación por plásticos' },
    { id: 12, name: 'Desertificación' },
    { id: 13, name: 'Contaminación del suelo' },
    { id: 14, name: 'Mal manejo de residuos tóxicos' },
    { id: 15, name: 'Sobrepesca' },
    { id: 16, name: 'Quema de combustibles fósiles' },
    { id: 17, name: 'Acidificación de los océanos' },
    { id: 18, name: 'Urbanización no planificada' },
    { id: 19, name: 'Desperdicio de agua' },
    { id: 20, name: 'Destrucción de hábitats' }
]

function ReportTypeSelect() {
    return (
        <Select name='reportType'>
            <SelectTrigger className='w-full max-w-sm'>
                <SelectValue placeholder='Seleccione el tipo de problema' />
            </SelectTrigger>
            <SelectContent className='z-[1000]'>
                <SelectGroup>
                    <SelectLabel>Tipos de problema</SelectLabel>
                    {reportTypes.map(type => (
                        <SelectItem
                            key={type.id}
                            value={String(type.id)}
                        >
                            {type.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default ReportTypeSelect
