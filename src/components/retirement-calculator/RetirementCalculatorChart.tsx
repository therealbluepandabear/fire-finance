import { Box, Text, Flex } from '@chakra-ui/react'
import { MdFace, MdAccountBalanceWallet } from 'react-icons/md'
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
            flexDirection: "row",
            alignItems: "center",
            gap: "6px"
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
        return currency(value)
    }

    const pointOfRetirement: { x: number, y: number } = {
        x: props.outputs.retirementAge!,
        y: props.outputs.data.filter((value) => value.age === props.outputs.retirementAge)[0].networth
    }

    const retirementIndicator: { dot: JSX.Element, line: JSX.Element } = {
        dot: (
            <ReferenceDot 
                r={10} 
                x={pointOfRetirement.x} 
                y={pointOfRetirement.y} 
            />
        ),
        line: (
            <ReferenceLine 
                y={pointOfRetirement.y} 
                stroke="red"
                strokeWidth={0.5}
            />
        )
    }

    const chartGradient: JSX.Element = (
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.3}/>
        </linearGradient>
    )

    return (
        <ResponsiveContainer>
            <AreaChart data={data}>
                <defs>
                    {chartGradient}
                </defs>
                <Area 
                    fill="url(#colorPv)" 
                    dataKey="networth" 
                    stroke="#82ca9d" 
                    strokeWidth={2} 
                />
                <CartesianGrid stroke="lightgray" strokeDasharray="5 5" />
                <XAxis 
                    label={{ value: "Age", dy: 10 }} 
                    dataKey="age" 
                />
                <YAxis 
                    label={{ value: "Networth", dx: -30, angle: -90 }} 
                    tickCount={8} 
                    tickFormatter={tickFormatter} 
                />
                <Tooltip
                    wrapperStyle={{ outline: "none" }} 
                    content={<ChartTooltip />}
                />

                {retirementIndicator.line}
                {retirementIndicator.dot}
            </AreaChart>
        </ResponsiveContainer>
    )
}