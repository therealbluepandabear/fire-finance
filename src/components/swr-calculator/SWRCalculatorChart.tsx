import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { StartingYearResult, SWRCalculatorOutputs } from '../../models/swr-calculator'

interface SWRCalculatorProps {
    outputs: SWRCalculatorOutputs
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
            </LineChart>
        </ResponsiveContainer>
    )
}