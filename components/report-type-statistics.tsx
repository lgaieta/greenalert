'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart'
import type { ReportTypeStatistic } from '@/lib/entities/Report'

function ReportTypeStatistics(props: { data: ReportTypeStatistic[] }) {
    const chartData = props.data.map(item => ({
        ...item,
        fill: 'var(--color-primary)'
    }))

    const chartConfig = {
        amount: {
            label: 'Problemas registrados'
        }
    } satisfies ChartConfig

    return (
        <Card className='w-full max-w-2xl'>
            <CardHeader>
                <CardTitle>Reportes por tipo de problema</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className='min-h-[300px] w-full'
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout='vertical'
                    >
                        <YAxis
                            dataKey='name'
                            type='category'
                            tickLine={false}
                            tickMargin={10}
                            width={100}
                        />
                        <XAxis
                            dataKey='amount'
                            type='number'
                            hide
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey='amount'
                            layout='vertical'
                            radius={5}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default ReportTypeStatistics
