import { Box, Flex, Text } from '@chakra-ui/react'
import { Plan } from '../../../../../store/plans-slice'
import PlanChart from './PlanChart'
import PlanOptionsBadge from './PlanOptionsBadge'
import PlanDescriptionBadge from './PlanDescriptionBadge'
import PlanFavoriteButton from './PlanFavoriteButton'
import Card from '../../../../ui/Card'
import { calculateRetirementAge } from '../../../../../models/retirement-calculator'

interface PlanCardProps {
    plan: Plan
    onEditDescription: (plan: Plan) => void
    onRename: (plan: Plan) => void
    onDuplicate: (plan: Plan) => void
    onDelete: (plan: Plan) => void
}

export default function PlanCard(props: PlanCardProps) {
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }

    const formattedCreationDate = new Date(props.plan.creationDate).toLocaleString('en-US', options)

    const showDescriptionBadge = props.plan.description && props.plan.description.trim().length > 0

    return (
        <Card
            alignSelf='flex-start'
            flexDirection='column'
            overflow='clip'
            minWidth='0px'
        >
            <Box height='240px' position='relative'>
                <PlanChart data={calculateRetirementAge(props.plan.inputs).data} />

                <Flex
                    position='absolute'
                    top='0'
                    right='0'
                    marginRight='8px'
                    height='40px'
                    borderRadius='0px'
                    alignItems='center'
                >
                    {showDescriptionBadge && <PlanDescriptionBadge description={props.plan.description ?? ''} />}

                    <PlanOptionsBadge
                        onEditDescription={() => props.onEditDescription(props.plan)}
                        onRename={() => props.onRename(props.plan)}
                        onDuplicate={() => props.onDuplicate(props.plan)}
                        onDelete={() => props.onDelete(props.plan)}
                    />
                </Flex>
            </Box>

            <Flex
                padding='16px'
                gap='8px'
                alignItems='center'
                borderTop='1px solid #e1e1dc'
            >
                <Flex flexDirection='column' minWidth='0px'>
                    <Text
                        fontSize='lg'
                        textOverflow='ellipsis'
                        overflow='hidden'
                        whiteSpace='nowrap'
                    >{props.plan.name}</Text>

                    <Text color='rgb(22, 135, 94)' fontSize='sm'>{formattedCreationDate}</Text>
                </Flex>

                <PlanFavoriteButton key={props.plan.id} plan={props.plan} />
            </Flex>
        </Card>
    )
}