import { Box, useColorModeValue } from '@chakra-ui/react'
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CycleInfo } from '../../../models/swr-calculator'
import { formatPercentage } from '../../../utils'


interface SWRCalculatorPieChartProps {
    cycleInfo: CycleInfo
}

export default function SWRCalculatorPieChart(props: SWRCalculatorPieChartProps): JSX.Element {
    const data = [
        { name: 'Successes', value: props.cycleInfo.successes },
        { name: 'Failures', value: props.cycleInfo.failures }
    ]

    const innerLabelColor = useColorModeValue('black', 'white')

    return (
        <Box minWidth="0" width="400px" height="400px">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        innerRadius="70%"
                        outerRadius="90%"
                        stroke=""
                    >
                        <Label
                            value={formatPercentage(props.cycleInfo.successRate)}
                            fontWeight="bold"
                            fontSize="58px"
                            position="center"
                            fill={innerLabelColor}
                        />
                        <Label value="Success Rate" fontSize="17px" position="center" dy={45} fill={innerLabelColor} />
                        <Cell fill="#57E964" name="Successes" />
                        <Cell fill="red" name="Failures" />
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    )
}