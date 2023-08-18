import { Box, Flex, Text } from '@chakra-ui/react'
import { cloneElement, useState } from 'react'
import { MdFlag, MdHelp, MdHelpOutline, MdOutlineFlag, MdReport } from 'react-icons/md'
import Card from '../../../../../../ui/Card'

interface SummaryCardProps {
    label: string
    content: string
}

export default function SummaryCard(props: SummaryCardProps) {
    return (
        <Card
            paddingEnd='0'
            flexDirection={{ base: 'column', md: 'row' }}
            minWidth='0px'
            background='white'
        >
            <Flex flexDirection='column' padding='22px' width='100%'>
                <Flex gap='6px' alignItems='center' width='100%'>
                    <Text 
                        fontSize='sm' 
                        textOverflow='ellipsis'
                        overflow='hidden'
                        whiteSpace='nowrap' 
                        color='gray'
                    >{props.label}</Text>
                </Flex>

                <Flex fontSize={{ base: '3xl', md: '4xl' }} alignItems='center' gap='6px'>
                    <Text fontFamily='Manrope'>{props.content}</Text>

                    <Box marginLeft='auto' fontSize='md' alignSelf='flex-end'>
                        <MdHelpOutline color='lightgray' />
                    </Box>
                </Flex>
            </Flex>
        </Card>
    )
}