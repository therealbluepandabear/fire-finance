import { Button, Divider, Flex, Input, Select, Text } from '@chakra-ui/react'
import { Scenario } from '../../../../../../../models/retirement-calculator'
import { useForm } from 'react-hook-form'

interface CreateScenarioProps {
    onCancelClick: () => void
    onDoneClick: (scenaro: Scenario) => void
}

export default function CreateScenario(props: CreateScenarioProps) {
    const { register, handleSubmit } = useForm<Scenario>()

    function submitHandler(scenarioArg: Scenario): void {
        const scenario = { ...scenarioArg }
        scenario.creationDate = new Date().toISOString()

        props.onDoneClick(scenario)
    }
    
    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Flex 
                flexDirection='column' 
                border='1px solid #e1e1dc'
                padding='16px'
                shadow='md'
                borderRadius='lg'
                gap='16px'
            >
                <Input placeholder='Name' {...register('name')} />

                <Flex flexDirection='column' gap='8px'>
                    <Text fontWeight='bold'>Scenario Trigger</Text>
                    <Text>Property</Text>
                    <Select {...register('trigger.property')} placeholder='Trigger'>
                        <option value='AGE'>Age</option>
                        <option value='NETWORTH'>Networth</option>
                    </Select>

                    <Input 
                        {...register('trigger.value', { valueAsNumber: true })}
                        placeholder='Value' 
                        type='number'
                    />
                </Flex>

                <Divider />

                <Flex flexDirection='column' gap='8px'>
                    <Text fontWeight='bold'>Scenario Event</Text>
                    <Select {...register('event.property')} placeholder='Property'>
                        <option value='INCOME'>Income</option>
                        <option value='SPENDING'>Spending</option>
                        <option value='NETWORTH'>Networth</option>
                    </Select>

                    <Select {...register('event.action')} placeholder='Action'>
                        <option value='SET'>Set</option>
                        <option value='INCREASE'>Increase</option>
                        <option value='DECREASE'>Decrease</option>
                    </Select>

                    <Input
                        {...register('event.amount', { valueAsNumber: true })}
                        placeholder='Amount'
                        type='number'
                    />
                </Flex>

                <Divider />

                <Flex justifyContent='flex-start' gap='8px'>
                    <Button 
                        background='buttonPrimary' 
                        color='white'
                        type='submit'
                    >Done</Button>

                    <Button background='transparent' onClick={props.onCancelClick}>Cancel</Button>
                </Flex>
            </Flex>
        </form>
    )
}