import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'

interface EmptyPlansStateProps {
    viewStarred: boolean
}

export default function EmptyPlansState(props: EmptyPlansStateProps) {
    return (
        <Flex
            flexGrow={1}
            alignItems='center'
            justifyContent='center'
        >
            <Flex flexDirection='column' gap='12px' alignItems='center'>
                <Flex
                    width={{ base: '200px', md: '300px' }}
                    height={{ base: '200px', md: '300px' }}
                    alignItems='center'
                    justifyContent='center'
                >
                    <Image src={props.viewStarred ? '/star.svg' : '/empty_state.svg'} padding='0' />
                </Flex>

                <Flex flexDirection='column'>
                    <Text
                        fontFamily='manrope'
                        fontSize={{ base: 'xl', md: '3xl' }}
                        textAlign='center'
                        color='black'
                    >
                        {props.viewStarred ? `You haven't stared a plan yet` : `You don't have any plans yet`}
                    </Text>

                    <Text fontSize={{ base: 'sm', md: 'lg' }} textAlign='center' color='gray' fontFamily='Manrope'>
                        {props.viewStarred ? 'Star a plan to get started.' : 'Create a plan to get started.'}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}