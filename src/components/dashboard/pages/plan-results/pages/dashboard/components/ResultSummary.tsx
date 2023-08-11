import { Box, Flex, Grid } from '@chakra-ui/react'
import { MdBeachAccess, MdSchedule, MdLocalFireDepartment, MdFlag, MdOutlineBeachAccess, MdOutlineFlag, MdOutlineLocalFireDepartment } from 'react-icons/md'
import SummaryCard from './SummaryCard'
import { FIRESummary } from '../../../../../../../models/retirement-calculator'
import { formatCurrency } from '../../../../../../../utils'

interface ResultSummaryProps {
    summary: FIRESummary
}

export default function ResultSummary(props: ResultSummaryProps) {
    
    return (
        <Grid
            templateColumns={{
                base: 'repeat(2, 1fr)',
                xl: 'repeat(4, 1fr)'
            }}
            width='100%'
            gap='18px'
        >
            <SummaryCard
                label='Retirement Age'
                content={props.summary.retirementAge.toString()}
            />

            <SummaryCard
                label='Years Till Retirement'
                content={(props.summary.yearsTillRetirement).toString()}
            />

            <SummaryCard
                label='FIRE Age'
                content={props.summary.fireAge.toString()}
            />

            <SummaryCard
                label='FIRE Number'
                content={formatCurrency(props.summary.fireNumber, true)}
            />
        </Grid>
    )
}