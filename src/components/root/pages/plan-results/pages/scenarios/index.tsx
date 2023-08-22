import { Text, Flex, IconButton, Button } from '@chakra-ui/react'
import Divider from '../../../../../ui/Divider'
import { MdAdd } from 'react-icons/md'
import ScenarioListItem from './components/ScenarioListItem'
import { useEffect, useState } from 'react'
import CreateScenario from './components/CreateScenario'
import { PlanEngine, Scenario } from '../../../../../../models/retirement-calculator'

interface ScenariosPageProps {
    updateEngine: (callback: (engine: PlanEngine) => void) => void
}

export default function ScenariosPage(props: ScenariosPageProps) {
    const [scenarios, setScenarios] = useState<Scenario[]>([])
    const [showCreateScenario, setShowCreateScenario] = useState(false)

    function newScenarioClickHandler(): void {
        setShowCreateScenario(true)
    }

    function createScenarioCancelClickHandler(): void {
        setShowCreateScenario(false)
    }

    function createScenarioDoneClickHandler(scenario: Scenario): void {
        setShowCreateScenario(false)
        setScenarios(prevScenarios => [...prevScenarios, scenario])

        props.updateEngine(engine => engine.getScenarioEngine().addScenario(scenario))

        console.log(scenario)
    }

    return (
        <Flex
            flexDirection='column'
            width='100%'
            position='relative'
            padding={{ base: '16px', md: '48px' }}
            gap='24px'
        >
            <Flex display={{ base: 'none', md: 'flex' }}  width='100%' alignItems='center'>
                <Text fontSize='xl' fontFamily='manrope'>Scenarios</Text>

                <Button 
                    marginLeft='auto' 
                    leftIcon={<MdAdd />} 
                    background='buttonPrimary' 
                    color='white'  
                    borderColor='buttonPrimary'
                    onClick={newScenarioClickHandler}
                >New</Button>
            </Flex>

            {showCreateScenario && (
                <CreateScenario 
                    onDoneClick={createScenarioDoneClickHandler} 
                    onCancelClick={createScenarioCancelClickHandler} 
                />
            )}

            <Flex flexDirection='column' gap='12px'>
                {scenarios.map((scenario, index) => <ScenarioListItem key={index} scenario={scenario} />)}
            </Flex>

            <IconButton
                variant='fab'
                display={{ base: 'flex', md: 'none' }} 
                icon={<MdAdd color='white' size={20} />}
                aria-label='New Scenario'
                onClick={newScenarioClickHandler}
            />
        </Flex>
    )
}