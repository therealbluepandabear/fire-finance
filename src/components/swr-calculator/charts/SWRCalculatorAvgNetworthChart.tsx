import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { StartingYearResult } from '../../../models/swr-calculator'
import { formatCurrency } from '../../../utils'


interface SWRCalculatorAvgNetworthChartProps {
    data: StartingYearResult[]
}

export default function SWRCalculatorAvgNetworthChart(props: SWRCalculatorAvgNetworthChartProps): JSX.Element {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={props.data}>
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d450" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.3} />
                    </linearGradient>
                </defs>

                <Area
                    fill="url(#colorPv)"
                    dataKey="averageNetworth"
                    stroke="#82ca9d"
                    strokeWidth={3}
                />

                <CartesianGrid stroke="lightgray" opacity={0.4} strokeDasharray="5 5" vertical={false} />

                <XAxis axisLine={false} tickFormatter={(value) => 1930 + value} />

                <YAxis
                    tickFormatter={(value) => formatCurrency(value, true)} 
                    tickCount={12}
                    axisLine={false}
                    tickLine={false}
                />

                <Tooltip />
            </AreaChart>
        </ResponsiveContainer>
    )
}