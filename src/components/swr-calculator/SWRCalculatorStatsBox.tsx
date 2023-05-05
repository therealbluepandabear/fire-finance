import { Flex, Text, useColorModeValue } from '@chakra-ui/react'


interface StatsBoxProps {
    header: string
    statistic: string
}

export default function SWRCalculatorStatsBox(props: StatsBoxProps): JSX.Element {
    const color = useColorModeValue('', '#1f2836')

    return (
        <Flex
            flexDirection="column"
            padding="16px"
            shadow="md"
            borderRadius="md"
            height="100%"
            background={color}
        >
            <Text fontSize="sm" fontWeight="bold">{props.header}</Text>
            <Text fontSize="4xl" fontWeight="light">{props.statistic}</Text>
        </Flex>
    )
}