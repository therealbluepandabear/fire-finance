import { Box, Flex } from '@chakra-ui/react'
import { range } from '../../../../../../../utils'

interface StepBarProps {
    step: number
    totalSteps: number
}

export default function StepBar(props: StepBarProps) {
    return (
        <Flex width='100%' justifyContent='center' gap='16px'>
            {range(0, props.totalSteps).map((_step, index) => (
                <Box
                    key={index}
                    borderRadius='999px'
                    background={_step < props.step ? 'buttonPrimary' : 'white'}
                    border='1px solid'
                    borderColor={_step < props.step ? 'transparent' : 'buttonPrimary'}
                    width='16px'
                    height='16px'
                />
            ))}
        </Flex>
    )
}