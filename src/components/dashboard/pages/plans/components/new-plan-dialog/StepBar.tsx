import { Box, Flex } from '@chakra-ui/react'

interface StepBarProps {
    step: number
    totalSteps: number
}

export default function StepBar(props: StepBarProps) {
    return (
        <Flex
            width='100%'
            height='4px'
            background='pastelPrimary'
        >
            <Box
                width={`${(props.step / props.totalSteps) * 100}%`}
                background='buttonPrimary'
                transition='width 0.2s ease-in-out'
            />
        </Flex>
    )
}