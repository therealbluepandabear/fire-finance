import { Flex, Text } from '@chakra-ui/react'
import Card from '../../../../ui/Card'
import { cloneElement, useState } from 'react'

interface SummaryCardProps {
    label: string
    content: string
    start?: boolean
    end?: boolean
}

export default function SummaryCard(props: SummaryCardProps) {
    return (
        <Card
            paddingEnd='0'
            border=''
            borderRadius='0'
            borderLeftRadius={props.start ? '2xl' : ''}
            borderRightRadius={props.end ? '2xl' : ''}
            flexDirection={{ base: 'column', md: 'row' }}
        >
            <Flex flexDirection='column' padding='22px'>
                <Flex gap='6px' alignItems='center'>
                    <Text fontSize='sm' color='gray'>{props.label}</Text>
                </Flex>

                <Text fontSize='4xl' fontFamily='Manrope'>{props.content}</Text>
            </Flex>

            {!props.end && (
                <Flex 
                    alignSelf='center'
                    marginLeft='auto' 
                    width={{ base: '100%', md: '1px' }} 
                    height={{ base: '1px', md: '100%' }} 
                    background='#e1e1dc' 
                />
            )}
        </Card>
    )
}