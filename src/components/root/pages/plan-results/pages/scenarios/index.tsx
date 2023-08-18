import { Text, Flex, IconButton, Button } from '@chakra-ui/react'
import Divider from '../../../../../ui/Divider'
import { MdAdd } from 'react-icons/md'
import ScenarioListItem from './components/ScenarioListItem'

export default function ScenariosPage() {
    return (
        <Flex
            flexDirection='column'
            width='100%'
            position='relative'
            padding={{ base: '16px', md: '48px' }}
        >
            <Flex width='100%' alignItems='center'>
                <Text fontSize='xl' fontFamily='manrope'>Scenarios</Text>

                <Button 
                    visibility={{ base: 'collapse', md: 'visible' }}
                    marginLeft='auto' 
                    leftIcon={<MdAdd />} 
                    background='buttonPrimary' 
                    color='white'  
                    borderColor='buttonPrimary'
                >New</Button>
            </Flex>

            <Flex flexDirection='column' gap='12px' marginTop='24px'>
                <ScenarioListItem />
                <ScenarioListItem />
            </Flex>

            <IconButton
                variant='fab'
                visibility={{ base: 'visible', md: 'collapse' }}
                icon={<MdAdd color='white' size={20} />}
                aria-label='Add Scenario'
                onClick={() => {}}
            />
        </Flex>
    )
}