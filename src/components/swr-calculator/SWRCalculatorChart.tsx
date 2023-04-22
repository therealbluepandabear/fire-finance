import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'
import { SWRCalculatorOutputs } from '../../models/swr-calculator'

interface SWRCalculatorProps {
    outputs: SWRCalculatorOutputs
}

export default function SWRCalculatorChart(props: SWRCalculatorProps): JSX.Element {
    console.log(props.outputs)

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart>
                {props.outputs.results
                    .map((result) => result.timelineData).map((item, index) => (
                    <Line
                        data={item}
                        dataKey="networth"
                        stroke="#82ca9d"
                        dot={false}
                        key={index}
                    />
                ))}

                <XAxis dataKey="investmentYear" allowDuplicatedCategory={false} />

                <CartesianGrid stroke="lightgray" strokeDasharray="5 5" vertical={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}