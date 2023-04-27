import { useState } from 'react'
import { MdCalendarMonth, MdAccountBalanceWallet } from 'react-icons/md'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, Tooltip, TooltipProps } from 'recharts'
import { StartingYearResult, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { formatCurrency } from '../../utils'
import { Flex, Box, Text } from '@chakra-ui/react'


function ChartTooltip({ active, payload, label }: TooltipProps<number, number>) {
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
                opacity={1}
            >
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
                        {formatCurrency(tooltipData.value ?? 0)}
                    </Text>
                </Flex>
            </Box> 
        )
    } 

    return null
}


interface SWRCalculatorProps {
    outputs: SWRCalculatorOutputs
    showTooltip: boolean
}

export default function SWRCalculatorChart(props: SWRCalculatorProps): JSX.Element {
    const [activeResult, setActiveResult] = useState<StartingYearResult | null>(null)

    function mouseEnterHandler(result: StartingYearResult): void {
        setActiveResult(result)
    }

    function mouseLeaveHandler(): void {
        setActiveResult(null)
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart>
                {props.outputs.results
                    .map((result) => { 
                        const baseColor = result.isRetirementPossible ? '#57E964' : 'red'

                        let color = baseColor
                        let strokeWidth = 1.5

                        if (activeResult && result !== activeResult) {
                            color = 'transparent'
                        } else if (activeResult && result === activeResult) {
                            strokeWidth = 5
                        }

                        return {
                            data: result.timelineData, 
                            color: color,
                            strokeWidth: strokeWidth,
                            result: result
                        }
                    })
                    .map(({ data, color, result, strokeWidth }, index) => (
                        <Line
                            data={data}
                            dataKey="networth"
                            stroke={color}
                            strokeWidth={strokeWidth}
                            key={index}
                            dot={false}
                            onMouseEnter={mouseEnterHandler.bind(null, result)}
                            onMouseLeave={mouseLeaveHandler.bind(null)}
                        />
                    )
                )}

                <XAxis dataKey="investmentYear" allowDuplicatedCategory={false} />

                <CartesianGrid stroke="lightgray" strokeDasharray="5 5" vertical={false} />

                {props.showTooltip && (
                    <Tooltip content={ChartTooltip} />
                )}
            </LineChart>
        </ResponsiveContainer>
    )
}