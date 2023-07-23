import { useTheme } from '@chakra-ui/react'
import { cloneElement } from 'react'

interface GoalIndicatorProps {
    cx: number
    cy: number
    icon: JSX.Element
}

export default function GoalIndicator(props: GoalIndicatorProps) {
    const fill = (useTheme() as any).colors.buttonPrimary

    return (
        <g>
            <circle
                cx={props.cx}
                cy={props.cy - 40}
                r={18}
                stroke='transparent'
                fill={fill}
            />

            {cloneElement(
                props.icon, {
                    fill: 'white',
                    size: 20,
                    x: props.cx - 10,
                    y: props.cy - 50
                }
            )}
        </g>
    )
}