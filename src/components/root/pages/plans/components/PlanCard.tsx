import { Box, Flex, Text } from '@chakra-ui/react'
import { Plan } from '../../../../../store/plans-slice'
import PlanChart from './PlanChart'
import PlanOptionsBadge from './PlanOptionsBadge'
import PlanDescriptionBadge from './PlanDescriptionBadge'
import PlanStarButton from './PlanStarButton'
import Card from '../../../../ui/Card'
import { PlanEngine } from '../../../../../models/retirement-calculator'
import { NewPlan } from '../../../../../api'
import { formatISODateToShortDateString } from '../../../../../utils'

interface PlanCardProps {
    plan: NewPlan
    onEditDescription: (plan: NewPlan) => void
    onRename: (plan: NewPlan) => void
    onDuplicate: (plan: NewPlan) => void
    onDelete: (plan: NewPlan) => void
    onClick: (plan: NewPlan) => void
}

export default function PlanCard(props: PlanCardProps) {
    const showDescriptionBadge = false

    return (
        <Card
            alignSelf='flex-start'
            flexDirection='column'
            overflow='clip'
            minWidth='0px'
            borderRadius={{ base: '0px', md: 'lg' }}
            onClick={() => props.onClick(props.plan)}
        >
            <Box height='240px' position='relative'>
                <PlanChart data={new PlanEngine(props.plan.inputs).calculate().data} />

                <Flex
                    position='absolute'
                    top='0'
                    right='0'
                    marginRight='8px'
                    height='40px'
                    borderRadius='0px'
                    alignItems='center'
                >
                    {showDescriptionBadge && <PlanDescriptionBadge description={''} />}

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

                    <Text color='rgb(22, 135, 94)' fontSize='sm'>{formatISODateToShortDateString(props.plan.creationDate)}</Text>
                </Flex>

                <PlanStarButton key={props.plan.id} plan={props.plan} />
            </Flex>
        </Card>
    )
}