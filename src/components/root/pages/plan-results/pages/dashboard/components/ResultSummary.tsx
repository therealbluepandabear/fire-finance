import { Box, Flex, Grid } from '@chakra-ui/react'
import { MdBeachAccess, MdSchedule, MdLocalFireDepartment, MdFlag, MdOutlineBeachAccess, MdOutlineFlag, MdOutlineLocalFireDepartment, MdLockClock, MdTimer, MdFireExtinguisher } from 'react-icons/md'
import SummaryCard from './SummaryCard'
import { PlanSummary } from '../../../../../../../models/retirement-calculator'
import { formatCurrency } from '../../../../../../../utils'

interface ResultSummaryProps {
    summary: PlanSummary
}

export default function ResultSummary(props: ResultSummaryProps) {
    return (
        <Grid
            templateColumns={{
                base: 'repeat(2, 1fr)',
                xl: 'repeat(4, 1fr)'
            }}
            width='100%'
            gap='16px'
        >
            <SummaryCard
                label='Retirement Age'
                content={props.summary.retirementAge.toString()}
                tooltipLabel='The age at which you plan to retire'
            />

            <SummaryCard
                label='Years Till Retirement'
                content={(props.summary.yearsTillRetirement).toString()}
                tooltipLabel='The number of years left until your planned retirement age'
            />

            <SummaryCard
                label='FIRE Age'
                content={props.summary.fireAge.toString()}
                tooltipLabel={`The lowest age in which you will be able to achieve financial independence`}
            />

            <SummaryCard
                label='FIRE Number'
                content={formatCurrency(props.summary.fireNumber, true)}
                tooltipLabel='The amount of savings you need to achieve financial independence'
            />
        </Grid>
    )
}