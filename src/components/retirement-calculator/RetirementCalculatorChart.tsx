import { Box, Text, Flex } from '@chakra-ui/react'
import { MdFace, MdAccountBalanceWallet, MdCalendarMonth } from 'react-icons/md'
import { 
    AreaChart, 
    Area, 
    ResponsiveContainer, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    TooltipProps, 
    Tooltip, 
    ReferenceDot, 
    ReferenceLine 
} from 'recharts'
import { currency } from '../../utils'
import { RetirementCalculatorOutputs } from '../../models/Calculator'

function ChartTooltip({ active, payload, label }: TooltipProps<number, number>): JSX.Element | null {
    if (active && payload && payload[0]) {
        const inlineFlexStyle = {
            flexDirection: 'row',
            alignItems: 'center',
            gap: '6px'
        }

        const tooltipData = payload[0];

        return (
            <Box 
                padding="8px" 
                border="2px solid gray" 
                background="white"
            >
                <Flex sx={inlineFlexStyle}>
                    <MdFace /> 
                    <Text fontSize="md">
                        <Text fontSize="md" fontWeight="bold" as="span">Age: </Text>
                        {label}
                    </Text>
                </Flex>

                <Flex sx={inlineFlexStyle}>
                    <MdCalendarMonth />
                    <Text fontSize="md">
                        <Text fontSize="md" fontWeight="bold" as="span">Year: </Text>
                        {tooltipData.payload.year}
                    </Text>
                </Flex>

                <Flex sx={inlineFlexStyle}>
                    <MdAccountBalanceWallet />
                    <Text fontSize="md">
                        <Text fontSize="md" fontWeight="bold" as="span">Networth: </Text>
                        {currency(tooltipData.value ?? 0)}
                    </Text>
                </Flex>
            </Box> 
        )
    } 

    return null
}

interface RetirementCalculatorProps {
    outputs: RetirementCalculatorOutputs
}

export default function RetirementCalculatorChart(props: RetirementCalculatorProps): JSX.Element {
    const data = props.outputs.data

    function tickFormatter(value: number): string {
        return currency(value, true)
    }

    const pointOfRetirement: { x: number, y: number } = {
        x: props.outputs.retirementAge!,
        y: props.outputs.data.filter((value) => value.age === props.outputs.retirementAge)[0].networth
    }

    return (
        <ResponsiveContainer>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d450" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.3}/>
                    </linearGradient>
                </defs>
                <Area 
                    fill="url(#colorPv)" 
                    dataKey="networth" 
                    stroke="#82ca9d" 
                    strokeWidth={4} 
                />
                <CartesianGrid stroke="lightgray" strokeDasharray="5 5" vertical={false} />
                <XAxis 
                    dataKey="age" 
                    axisLine={false} 
                    interval={Math.floor(data.length / 26)}
                />
                <YAxis 
                    tickCount={12} 
                    tickFormatter={tickFormatter} 
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    wrapperStyle={{ outline: "none" }} 
                    content={<ChartTooltip />}
                />

                <ReferenceLine 
                    y={pointOfRetirement.y} 
                    stroke="red"
                    strokeWidth={0.5}
                />
                <ReferenceDot 
                    r={10} 
                    x={pointOfRetirement.x} 
                    y={pointOfRetirement.y} 
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}