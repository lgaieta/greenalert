/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/xurZdqFLRoc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResponsiveLine } from '@nivo/line'
import { JSX, ClassAttributes, HTMLAttributes } from 'react'

export function NewReportForm() {
    return (
        <Card className='w-full max-w-4xl mx-auto'>
            <CardHeader>
                <CardTitle className='text-3xl font-bold'>
                    Encuentra tu ubicación
                </CardTitle>
                <CardDescription>
                    Selecciona una ubicación en el mapa y proporciona detalles
                    adicionales.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <form className='space-y-4 order-2 md:order-1'>
                        <div className='space-y-2'>
                            <Label htmlFor='description'>Descripción</Label>
                            <Textarea
                                id='description'
                                rows={4}
                                placeholder='Proporciona detalles adicionales sobre la ubicación'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='location'>
                                Ubicación
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Selecciona una ubicación' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='location1'>
                                            Uicación 1
                                        </SelectItem>
                                        <SelectItem value='location2'>
                                            Ubicación 2
                                        </SelectItem>
                                        <SelectItem value='location3'>
                                            Ubicación 3
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </Label>
                        </div>
                        <div className='flex justify-end'>
                            <Button
                                type='submit'
                                size='lg'
                            >
                                Enviar
                            </Button>
                        </div>
                    </form>
                    <div className='aspect-video rounded-lg overflow-hidden order-1 md:order-2'>
                        <LineChart className='w-full h-full' />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function LineChart(
    props: JSX.IntrinsicAttributes &
        ClassAttributes<HTMLDivElement> &
        HTMLAttributes<HTMLDivElement>
) {
    return (
        <div {...props}>
            <ResponsiveLine
                data={[
                    {
                        id: 'Desktop',
                        data: [
                            { x: 'Jan', y: 43 },
                            { x: 'Feb', y: 137 },
                            { x: 'Mar', y: 61 },
                            { x: 'Apr', y: 145 },
                            { x: 'May', y: 26 },
                            { x: 'Jun', y: 154 }
                        ]
                    },
                    {
                        id: 'Mobile',
                        data: [
                            { x: 'Jan', y: 60 },
                            { x: 'Feb', y: 48 },
                            { x: 'Mar', y: 177 },
                            { x: 'Apr', y: 78 },
                            { x: 'May', y: 96 },
                            { x: 'Jun', y: 204 }
                        ]
                    }
                ]}
                margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                xScale={{
                    type: 'point'
                }}
                yScale={{
                    type: 'linear'
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16
                }}
                colors={['#2563eb', '#e11d48']}
                pointSize={6}
                useMesh={true}
                gridYValues={6}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: '9999px'
                        },
                        container: {
                            fontSize: '12px',
                            textTransform: 'capitalize',
                            borderRadius: '6px'
                        }
                    },
                    grid: {
                        line: {
                            stroke: '#f3f4f6'
                        }
                    }
                }}
                role='application'
            />
        </div>
    )
}
