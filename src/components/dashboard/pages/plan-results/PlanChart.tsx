import { ResponsiveContainer, AreaChart, CartesianGrid, Area, XAxis, YAxis, Tooltip, ReferenceDot, TooltipProps } from 'recharts'
import { RetirementProjectionPoint, TimeRangeFilter, filterTimeRange } from '../../../../models/retirement-calculator'
import { Goal } from '../../../../store/plans-slice'
import { formatCurrency, findIndexClosestToValue } from '../../../../utils'
import { Box, Flex, Text, useTheme } from '@chakra-ui/react'
import GoalIndicator from './GoalIndicator'

interface TooltipRowProps {
    label: string
    data: string
}

function TooltipRow(props: TooltipRowProps) {
    return (
        <Flex gap='24px'>
            <Text fontSize='md' fontWeight='bold' as='span' marginRight='4px'>{props.label}</Text>

            <Text marginLeft='auto'>
                {props.data}
            </Text>
        </Flex>
    )
}

function ChartTooltip({ active, payload, label }: TooltipProps<number, number>): JSX.Element | null {
    if (active && payload && payload[0]) {

        const tooltipData = payload[0]

        return (
            <Box padding='12px' border='1px solid #e1e1dc' borderRadius='md' background='white'>
                <TooltipRow label='Age' data={label} />
                <TooltipRow label='Year' data={tooltipData.payload.year} />
                <TooltipRow label='Networth' data={formatCurrency(tooltipData.value ?? 0)} />
            </Box>
        )
    }

    return null
}

interface PlanChartProps {
    data: RetirementProjectionPoint[]
    filter: TimeRangeFilter
    goals: Goal[]
}

export default function PlanChart(props: PlanChartProps) {
    const data = filterTimeRange(props.data, props.filter)

    return (
        <ResponsiveContainer>
            <AreaChart data={data} {...{ overflow: 'visible' }} margin={{ top: 16, right: 0, bottom: 12, left: 16 }}>
                <CartesianGrid vertical={false} strokeWidth={0.6} stroke='#bdbcbc' />

                <Area
                    isAnimationActive={false}
                    dataKey='networth'
                    stroke='#50C878'
                    fill='#a1e7b2'
                    strokeWidth={3}
                    fillOpacity={0.4}
                />

                <XAxis
                    tick={{ fill: '#bdbcbc', fontSize: '13px' }}
                    tickLine={false}
                    stroke='#9e9f9f'
                    strokeWidth={0.6}
                    interval={Math.floor(data.length / 5)}
                />

                <YAxis
                    tick={{ fill: '#bdbcbc', fontSize: '13px' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => formatCurrency(value, true)}
                />

                <Tooltip
                    animationDuration={200}
                    wrapperStyle={{ outline: 'none' }}
                    content={<ChartTooltip />}
                />

                {props.goals.map((goal, index) => (
                    <ReferenceDot
                        key={index}
                        shape={obj => <GoalIndicator icon={goal.icon} cx={obj.cx} cy={obj.cy} />}
                        x={findIndexClosestToValue(data.map(point => point.networth), goal.targetNetworth)}
                        y={goal.targetNetworth}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    )
}
