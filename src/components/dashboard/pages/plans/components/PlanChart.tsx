import { ResponsiveContainer, AreaChart, Area } from 'recharts'

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    }
]

export default function PlanChart() {
    return (
        <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Area
                    isAnimationActive={false}
                    type='monotone'
                    dataKey='pv'
                    stroke='#50C878'
                    fill='#73d393'
                    strokeWidth={3}
                    opacity={0.75}
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}