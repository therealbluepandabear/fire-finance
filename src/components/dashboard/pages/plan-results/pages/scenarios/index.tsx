import { Text, Flex, IconButton } from '@chakra-ui/react'
import Divider from '../../../../../ui/Divider'
import { MdAdd } from 'react-icons/md'

export default function ScenariosPage() {
    return (
        <Flex
            flexDirection='column'
            width='100%'
            position='relative'
            marginTop='32px'
        >
            <Flex width='100%' gap='12px'>
                <Text fontSize='md' fontFamily='manrope'>Scenarios</Text>
            </Flex>

            <IconButton right='0' bottom='0' position='absolute' borderRadius='999px' icon={<MdAdd size={22} />} aria-label={''} />
        </Flex>
    )
}