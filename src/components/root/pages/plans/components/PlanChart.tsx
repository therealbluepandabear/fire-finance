import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts'
import { RetirementProjectionPoint } from '../../../../../models/retirement-calculator'
import { formatCurrency } from '../../../../../utils'

interface PlanChartProps {
    data: RetirementProjectionPoint[]
}

export default function PlanChart(props: PlanChartProps) {
    return (
        <ResponsiveContainer>
            <AreaChart data={props.data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Area
                    isAnimationActive={false}
                    dataKey='networth'
                    stroke='#50C878'
                    fill='#a1e7b2'
                    strokeWidth={3}
                    fillOpacity={0.4}
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}