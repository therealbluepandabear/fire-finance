import { Button, Divider, Flex, Input, Select, Text } from '@chakra-ui/react'
import { Scenario } from '../../../../../../../models/retirement-calculator'
import { useForm } from 'react-hook-form'

interface CreateScenarioProps {
    onCancelClick: () => void
    onDoneClick: (scenaro: Scenario) => void
}

export default function CreateScenario(props: CreateScenarioProps) {
    const { register, handleSubmit } = useForm<Scenario>()
    
    return (
        <form onSubmit={handleSubmit(props.onDoneClick)}>
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
                        <option value='age'>Age</option>
                        <option value='networth'>Networth</option>
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
                        <option value='income'>Income</option>
                        <option value='spending'>Spending</option>
                        <option value='networth'>Networth</option>
                    </Select>

                    <Select {...register('event.action')} placeholder='Action'>
                        <option value='set'>Set</option>
                        <option value='increase'>Increase</option>
                        <option value='decrease'>Decrease</option>
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