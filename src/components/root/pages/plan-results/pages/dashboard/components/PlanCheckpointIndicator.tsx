import { useTheme } from '@chakra-ui/react'
import { cloneElement } from 'react'
import { MdAccountBalanceWallet, MdBolt, MdReportGmailerrorred } from 'react-icons/md'
import { PlanCheckpoint } from '../../../../../../../models/retirement-calculator'

interface PlanCheckpointIndicatorProps {
    checkpoint: PlanCheckpoint
    cx: number
    cy: number
}

function getIcon(pointInfoType: PlanCheckpoint['type']): JSX.Element {
    switch (pointInfoType) {
        case 'FINANCIAL-INDEPENDENCE':
            return <MdAccountBalanceWallet />
        case 'RETIREMENT':
            return <MdReportGmailerrorred />
        case 'MILESTONE':
            return <MdBolt />
        default:
            throw new Error(`Unsupported pointInfoType: ${pointInfoType}`)
    }
}

export default function PlanCheckpointIndicator(props: PlanCheckpointIndicatorProps) {
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
                getIcon(props.checkpoint.type), {
                    fill: 'white',
                    size: 20,
                    x: props.cx - 10,
                    y: props.cy - 50
                }
            )}
        </g>
    )
}