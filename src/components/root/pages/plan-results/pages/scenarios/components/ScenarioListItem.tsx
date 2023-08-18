import { Flex, IconButton, Text } from '@chakra-ui/react'
import Card from '../../../../../../ui/Card'
import { MdAutoGraph, MdDelete, MdMoreVert, MdSignpost } from 'react-icons/md'

export default function ScenarioListItem() {
    return (
        <Card padding='16px' width='100%' alignItems='center' gap='12px'>
            <Flex padding='11px' background='orange' borderRadius='999px'>
                <MdSignpost color='white' size={18} />
            </Flex>

            <Flex flexDirection='column'>
                <Text
                    fontSize='lg'
                    textOverflow='ellipsis'
                    overflow='hidden'
                    whiteSpace='nowrap'
                >Scenario 1</Text>

                <Text color='rgb(22, 135, 94)' fontSize='sm'>12 Jun 2023</Text>
            </Flex>

            <IconButton
                marginLeft='auto'
                icon={<MdMoreVert size={20} />}
                aria-label='Options'
                width='30px'
                height='30px'
                minWidth='0px'
                minHeight='0px'
                borderRadius='999px'
            />
        </Card>
    )
}