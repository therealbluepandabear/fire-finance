import { Text, Flex, IconButton, Button } from '@chakra-ui/react'
import Divider from '../../../../../ui/Divider'
import { MdAdd } from 'react-icons/md'
import ScenarioListItem from './components/ScenarioListItem'
import { useEffect, useState } from 'react'
import CreateScenario from './components/CreateScenario'
import { PlanEngine, Scenario } from '../../../../../../models/retirement-calculator'
import { NewPlan, useAddScenarioToPlanMutation, useGetScenariosQuery } from '../../../../../../api'

interface ScenariosPageProps {
    plan: NewPlan
    updateEngine: (callback: (engine: PlanEngine) => void) => void
}

export default function ScenariosPage(props: ScenariosPageProps) {
    const [showCreateScenario, setShowCreateScenario] = useState(false)

    const [addScenarioToPlan] = useAddScenarioToPlanMutation()
    const { data: scenarios, refetch: refetchScenarios } = useGetScenariosQuery(props.plan.id)

    function newScenarioClickHandler(): void {
        setShowCreateScenario(true)
    }

    function createScenarioCancelClickHandler(): void {
        setShowCreateScenario(false)
    }

    async function createScenarioDoneClickHandler(scenario: Scenario): Promise<void> {
        setShowCreateScenario(false)

        props.updateEngine(engine => engine.getScenarioEngine().addScenario(scenario))

        await addScenarioToPlan({ planId: props.plan.id, scenario: scenario })
        await refetchScenarios()
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
                {scenarios && scenarios.map((scenario, index) => <ScenarioListItem key={index} scenario={scenario} />)}
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