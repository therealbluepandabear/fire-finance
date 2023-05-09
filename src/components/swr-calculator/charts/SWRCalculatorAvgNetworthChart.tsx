import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { StartingYearResult } from '../../../models/swr-calculator'
import { formatCurrency } from '../../../utils'


interface SWRCalculatorAvgNetworthChartProps {
    data: StartingYearResult[]
    type: 'area' | 'bar'
}

export default function SWRCalculatorAvgNetworthChart(props: SWRCalculatorAvgNetworthChartProps): JSX.Element {
    const xAxis = (
        <XAxis axisLine={false} tickFormatter={(value) => 1930 + value} />
    )

    const yAxis = (
        <YAxis
            tickFormatter={(value) => formatCurrency(value, true)}
            tickCount={12}
            axisLine={false}
            tickLine={false}
        />
    )

    const cartesianGrid = (
        <CartesianGrid stroke="lightgray" opacity={0.4} strokeDasharray="5 5" vertical={false} />
    )

    return (
        <>
            {props.type === 'bar' ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={props.data}>
                        <Bar dataKey="averageNetworth">
                            {props.data.map((result, index) => (
                                <Cell key={index} fill={result.isRetirementPossible ? '#57E964' : 'red'} />
                            ))}
                        </Bar>

                        {cartesianGrid}
                        {xAxis}
                        {yAxis} 

                        <Tooltip />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
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

                        {cartesianGrid}
                        {xAxis}
                        {yAxis} 

                        <Tooltip />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </>
    )
}