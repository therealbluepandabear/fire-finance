import { Box, Grid } from '@chakra-ui/react'
import { MdBeachAccess, MdSchedule, MdLocalFireDepartment } from 'react-icons/md'
import { FIRESummary } from '../../../../../models/retirement-calculator'
import { formatCurrency } from '../../../../../utils'
import SummaryCard from './SummaryCard'
import Card from '../../../../ui/Card'

interface ResultSummaryProps {
    summary: FIRESummary
}

export default function ResultSummary(props: ResultSummaryProps) {
    return (
        <Card width='100%' _active={{}} _hover={{}} background='white'>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    xl: 'repeat(4, 1fr)'
                }}
                width='100%'
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
                    label='Fire Age'
                    content={props.summary.fireAge.toString()}
                />

                <SummaryCard
                    label='Fire Number'
                    content={formatCurrency(props.summary.fireNumber, true)}
                    showSeparator={false}
                />
            </Grid>
        </Card>
    )
}