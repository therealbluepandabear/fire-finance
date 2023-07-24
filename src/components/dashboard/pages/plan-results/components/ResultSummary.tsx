import { Grid } from '@chakra-ui/react'
import { MdBeachAccess, MdSchedule, MdLocalFireDepartment } from 'react-icons/md'
import { FIRESummary } from '../../../../../models/retirement-calculator'
import { formatCurrency } from '../../../../../utils'
import SummaryCard from './SummaryCard'

interface ResultSummaryProps {
    summary: FIRESummary
}

export default function ResultSummary(props: ResultSummaryProps) {
    return (
        <Grid
            templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                xl: 'repeat(4, 1fr)'
            }}
            width='100%'
            gap='13px'
        >
            <SummaryCard
                icon={<MdBeachAccess />}
                label='Retirement Age'
                content={props.summary.retirementAge.toString()}
            />

            <SummaryCard
                icon={<MdSchedule />}
                label='Years Till Retirement'
                content={(props.summary.yearsTillRetirement).toString()}
            />

            <SummaryCard
                icon={<MdLocalFireDepartment />}
                label='Fire Age'
                content={props.summary.fireAge.toString()}
            />

            <SummaryCard
                icon={<MdLocalFireDepartment />}
                label='Fire Number'
                content={formatCurrency(props.summary.fireNumber, true)}
            />
        </Grid>
    )
}