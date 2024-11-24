import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import ReportRepository from '@/lib/services/ReportRepository'

async function ReportTypeSelect() {
    const reportTypes = await ReportRepository.listTypes()

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
