import { Box, Text, Flex } from '@chakra-ui/react'
import { MdFace, MdAccountBalanceWallet } from 'react-icons/md'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, TooltipProps, Tooltip } from 'recharts'
import { currency, range } from '../../utils'

function ChartTooltip({ active, payload, label }: TooltipProps<number, number>): JSX.Element | null {
    const inlineFlexStyle = {
        flexDirection: "row",
        alignItems: "center",
        gap: "6px"
    }

    if (active && payload && payload.length && payload[0].value) {
        return (
            <Box 
                padding="8px" 
                border="2px solid gray" 
                background="white"
            >
                <Flex sx={inlineFlexStyle}>
                    <MdFace /> 
                    <Text fontSize="md"><Text fontSize="md" fontWeight="bold" as="span">Age: </Text>{label}</Text>
                </Flex>

                <Flex sx={inlineFlexStyle}>
                    <MdAccountBalanceWallet />
                    <Text fontSize="md"><Text fontSize="md" fontWeight="bold" as="span">Networth: </Text>{currency(payload[0].value)}</Text>
                </Flex>
            </Box> 
        )
    } 

    return null
}

export default function RetirementCalculatorChart(): JSX.Element {
    const data: {age: number, networth: number}[] = range(0, 100).map(
        (age) => ({ age: age, networth: age ** 2 })
    )

    return (
        <ResponsiveContainer>
            <AreaChart width={400} height={400} data={data}>
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.3}/>
                    </linearGradient>
                </defs>
                <Area fill="url(#colorPv)" dataKey="networth" stroke="#82ca9d" strokeWidth={2} />
                <CartesianGrid stroke="lightgray" strokeDasharray="5 5" />
                <XAxis label={{ value: "Age", dy: 10 }} />
                <YAxis label={{ value: "Networth", dx: -30, angle: -90 }} tickCount={8} tickFormatter={(value: number): string => currency(value)} />
                <Tooltip
                    wrapperStyle={{ outline: "none" }} 
                    content={<ChartTooltip />} />
            </AreaChart>
        </ResponsiveContainer>
    )
}