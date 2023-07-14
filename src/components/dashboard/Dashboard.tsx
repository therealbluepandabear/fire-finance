import { Flex, Button, useBreakpointValue, Box, IconButton } from '@chakra-ui/react'
import { MdAutoGraph, MdChecklist, MdHelpOutline, MdOutlineCalculate, MdOutlineSchool, MdPerson, MdSettings, MdSupportAgent } from 'react-icons/md'
import FMenu, { MenuItem, MenuOverlay } from '../ui/FMenu'
import { User } from '../../api'
import FAppBar from '../ui/FAppBar'
import { useState } from 'react'
import PlansPage from './pages/Plans'
import PlanStepDialog from './pages/PlanStepDialog'
import PlanResultsPage from './pages/PlanResults'
import { RetirementCalculatorInputs, calculateRetirementAge } from '../../models/retirement-calculator'

interface DashboardMenuProps {
    isOpen: boolean
}

function DashboardMenu(props: DashboardMenuProps) {

    const planMenuItem: MenuItem = {
        leftContent: <MdChecklist size={20} />,
        label: 'Plans'
    }

    const progressMenuItem: MenuItem = {
        leftContent: <MdAutoGraph size={20} />,
        label: 'Progress'
    }

    const calculatorsMenuItem: MenuItem = {
        leftContent: <MdOutlineCalculate size={20} />,
        label: 'Calculators'
    }

    const learnMenuItem: MenuItem = {
        leftContent: <MdOutlineSchool size={20} />,
        label: 'Learn'
    }

    const helpMenuItem: MenuItem = {
        leftContent: <MdHelpOutline size={20} />,
        label: 'Help'
    }

    const supportMenuItem: MenuItem = {
        leftContent: <MdSupportAgent size={20} />,
        label: 'Support'
    }

    return (
        <FMenu 
            isOpen={props.isOpen} 
            onItemClick={(index) => { }}
            menuItems={[planMenuItem, progressMenuItem, calculatorsMenuItem, learnMenuItem, helpMenuItem, supportMenuItem]}
        />
    )
}

export interface DashboardProps {
    user: User
}

export default function Dashboard(props: DashboardProps) {

    const [showPlanFormDialog, setShowPlanFormDialog] = useState(false)

    const [currentPage, setCurrentPage] = useState<JSX.Element>(<PlansPage onAddPlanClick={() => setCurrentPage(<PlanResultsPage outputs={calculateRetirementAge({
        age: 20,
        annualIncome: 70_000,
        annualSpending: 30_000,

        networth: 0,
        safeWithdrawalRate: 0.02,
        inflationRate: 0,

        stocksAllocationRate: 1,
        bondsAllocationRate: 0,
        cashAllocationRate: 0,

        stocksReturnRate: 0.07,
        bondsReturnRate: 0,
        cashReturnRate: 0,

        retirementAge: 50,
        incomeGrowthRate: 0.09,
        maximumAge: 100
    })} />)} />
    )

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const responsiveMenuContentRight = useBreakpointValue({
        base: [
            <IconButton
                key={0}
                height='49px'
                width='49px'
                aria-label='...'
                icon={<MdSettings size={20} />}
                borderRadius='999px'
                variant='outline'
            />,

            <IconButton
                key={1}
                height='49px'
                width='49px'
                aria-label='...'
                icon={<MdPerson size={20} />}
                borderRadius='999px'
                variant='outline'
            />
        ], 
        md: [
            <Button
                key={0}
                height='49px'
                background='transparent'
                border='1px solid #e1e1dc'
                leftIcon={<MdSettings size={20} />}
            >Settings</Button>,

            <Button
                key={1}
                height='49px'
                background='transparent'
                border='1px solid #e1e1dc'
                leftIcon={<MdPerson size={20} />}
            >tom66</Button>
        ] 
    });

    function menuClickHandler(): void {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)
    }

    return (
        <>
            <MenuOverlay isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />

            {showPlanFormDialog && <PlanStepDialog onClose={(inputs) => {
                setShowPlanFormDialog(false)
                setCurrentPage(<PlanResultsPage outputs={calculateRetirementAge({
                    age: 20,
                    annualIncome: 70_000,
                    annualSpending: 30_000,

                    networth: 0,
                    safeWithdrawalRate: 2,
                    inflationRate: 0,

                    stocksAllocationRate: 1,
                    bondsAllocationRate: 0,
                    cashAllocationRate: 0,

                    stocksReturnRate: 0.07,
                    bondsReturnRate: 0,
                    cashReturnRate: 0,

                    maximumAge: 50
                })} />)
            }} />}

            <Flex 
                flexDirection='column' 
                width='100%' 
                height='100vh' 
                maxHeight='100vh'
            >
                <FAppBar 
                    isMenu={true} 
                    onMenuClick={menuClickHandler}
                    contentRight={
                        <Flex gap={{ base: '8px', md: '16px' }}>
                            {responsiveMenuContentRight}
                        </Flex>
                    }
                />

                <Flex 
                    flexGrow={1} 
                    minHeight='0' 
                    as='main' 
                    position={{ base: 'static', md: 'relative' }}
                >
                    <DashboardMenu isOpen={isMenuOpen} />

                    {currentPage}
                     
                    {/* <PlanResultsPage outputs={calculateRetirementAge({
                        age: 20,
                        annualIncome: 70_000,
                        annualSpending: 30_000,

                        networth: 0,
                        safeWithdrawalRate: 0.02,
                        inflationRate: 0,

                        stocksAllocationRate: 1,
                        bondsAllocationRate: 0,
                        cashAllocationRate: 0,

                        stocksReturnRate: 0.07,
                        bondsReturnRate: 0,
                        cashReturnRate: 0,

                        retirementAge: 50,
                        incomeGrowthRate: 0.09,
                        maximumAge: 100
                    })} /> */}
            
                </Flex>
            </Flex>
        </>
    )
}