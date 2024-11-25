import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import type { ReportType } from '@/lib/entities/Report'

function ReportTypeSelect(props: { types: ReportType[] }) {
    return (
        <Select name='reportType'>
            <SelectTrigger className='w-full max-w-sm'>
                <SelectValue placeholder='Seleccione el tipo de problema' />
            </SelectTrigger>
            <SelectContent className='z-[1000]'>
                <SelectGroup>
                    <SelectLabel>Tipos de problema</SelectLabel>
                    {props.types.map(type => (
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
