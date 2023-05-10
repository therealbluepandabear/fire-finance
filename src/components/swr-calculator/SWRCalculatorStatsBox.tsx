import { Text } from '@chakra-ui/react'
import Card from '../ui/Card'


interface StatsBoxProps {
    header: string
    statistic: string
}

export default function SWRCalculatorStatsBox(props: StatsBoxProps): JSX.Element {
    return (
        <Card padding="16px" height="100%">
            <Text fontSize="sm" fontWeight="bold">{props.header}</Text>
            <Text fontSize="4xl" fontWeight="light">{props.statistic}</Text>
        </Card>
    )
}