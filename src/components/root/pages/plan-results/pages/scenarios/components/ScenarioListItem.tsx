import { Flex, IconButton, Text } from '@chakra-ui/react'
import { MdMoreVert, MdSignpost } from 'react-icons/md'
import { Scenario } from 'models/retirement-calculator'
import { formatISODateToShortDateString } from 'utils'
import Card from 'components/ui/Card'

interface ScenarioListItemProps {
    scenario: Scenario
}

export default function ScenarioListItem(props: ScenarioListItemProps) {
    return (
        <Card 
            padding='16px' 
            width='100%' 
            alignItems='center' 
            gap='12px'
        >
            <Flex padding='11px' background='orange' borderRadius='999px'>
                <MdSignpost color='white' size={18} />
            </Flex>

            <Flex flexDirection='column'>
                <Text
                    fontSize='lg'
                    textOverflow='ellipsis'
                    overflow='hidden'
                    whiteSpace='nowrap'
                >{props.scenario.name}</Text>

                <Text color='rgb(22, 135, 94)' fontSize='sm'>{formatISODateToShortDateString(props.scenario.creationDate)}</Text>
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