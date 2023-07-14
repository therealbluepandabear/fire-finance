import { useState } from 'react'
import { MdCalendarMonth, MdAccountBalanceWallet } from 'react-icons/md'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, Tooltip, TooltipProps } from 'recharts'
import { StartingYearResult, SWRCalculatorOutputs } from '../../../models/swr-calculator'
import { formatCurrency } from '../../../utils'
import { Flex, Box, Text } from '@chakra-ui/react'
import Card from '../../ui/Card'


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


interface SWRCalculatorResultsChartProps {
    outputs: SWRCalculatorOutputs
    showTooltip: boolean
}

function getBaseColor(result: StartingYearResult) {
    return result.isRetirementPossible ? 'rgb(87, 233, 100)' : 'rgb(255, 0, 0)'
}

export default function SWRCalculatorResultsChart(props: SWRCalculatorResultsChartProps) {
    const [activeResult, setActiveResult] = useState<StartingYearResult | null>(null)

    function mouseEnterHandler(result: StartingYearResult): void {
        setActiveResult(result)
    }

    function mouseLeaveHandler(): void {
        setActiveResult(null)
    }

    return (
        <Box width="100%" height="100%" position="relative">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                    {props.outputs.results
                        .map((result) => { 
                            let color = getBaseColor(result)
                            let strokeWidth = 1.5

                            if (activeResult) {
                                const alpha = 0.15

                                if (color === 'rgb(87, 233, 100)') {
                                    color = `rgba(87, 255, 100, ${alpha})`
                                } else {
                                    color = `rgba(255, 0, 0, ${alpha})`
                                }
                            } 

                            return {
                                data: result.timelineData, 
                                color: color,
                                strokeWidth: strokeWidth,
                                result: result
                            }
                        })
                        .map(({ data, color, result, strokeWidth }, index) => (
                            <>
                                {result.year !== 2000 && (
                                    <Line
                                        key={index}
                                        data={data}
                                        dataKey="networth"
                                        stroke={color}
                                        strokeWidth={strokeWidth}
                                        dot={false}
                                        onMouseEnter={mouseEnterHandler.bind(null, result)}
                                    />
                                )}
                            </>
                        )
                    )}

                    {activeResult && (
                        <Line
                            data={activeResult.timelineData}
                            dataKey="networth"
                            stroke={getBaseColor(activeResult)}
                            strokeWidth={5}
                            dot={false}
                            isAnimationActive={false}
                            onMouseLeave={mouseLeaveHandler.bind(null)}
                        />
                    )}
         
                    <XAxis dataKey="investmentYear" allowDuplicatedCategory={false} />

                    <CartesianGrid stroke="lightgray" strokeDasharray="5 5" vertical={false} />

                    {props.showTooltip && (
                        <Tooltip content={ChartTooltip} />
                    )}
                </LineChart>
            </ResponsiveContainer>

            {activeResult && (
                <Card 
                    alignItems="center" 
                    justifyContent="center" 
                    position="absolute" 
                    left="0"
                    top="0"
                    padding="8px"
                >
                    {activeResult.year}
                </Card>
            )}
        </Box>
    )
}