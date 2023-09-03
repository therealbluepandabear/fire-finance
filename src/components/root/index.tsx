import { Flex, Button, useBreakpointValue, IconButton } from '@chakra-ui/react'
import { MdAutoGraph, MdChecklist, MdHelpOutline, MdMonitor, MdOutlineCalculate, MdOutlineSchool, MdPerson, MdSettings, MdSupportAgent } from 'react-icons/md'
import Menu, { MenuItem, MenuOverlay, MenuSubItem } from '../ui/Menu'
import { NewPlan, User } from '../../api'
import AppBar from '../ui/AppBar'
import { useState } from 'react'
import PlansPage from './pages/plans'
import PlanResultsPage from './pages/plan-results'
import { PlanEngine, PlanEngineInputs } from '../../models/retirement-calculator'
import { useAppSelector } from '../../store'

interface DashboardMenuProps {
    onItemClick: (item: MenuItem | MenuSubItem) => void
    isOpen: boolean
}

function DashboardMenu(props: DashboardMenuProps) {
    const plans = useAppSelector(state => state.plans.plans)

    const planMenuItem: MenuItem = {
        leftContent: <MdChecklist size={20} />,
        label: 'Plans',
        subItems: plans.map(plan => ({ leftContent: <MdMonitor />, label: plan.name }))
    }

    return (
        <Menu 
            isOpen={props.isOpen} 
            onItemClick={props.onItemClick}
            menuItems={[planMenuItem]}
        />
    )
}

export interface RootPageProps {
    userId: string
}

export default function RootPage(props: RootPageProps) {
    function planCreatedHandler(plan: NewPlan): void {
        setCurrentPage(<PlanResultsPage plan={plan} />)
    }

    const [currentTitle, setCurrentTitle] = useState('Plans')

    const [currentPage, setCurrentPage] = useState<JSX.Element>(
        <PlansPage userId={props.userId} onPlanCreated={planCreatedHandler} />
    )

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function menuClickHandler(): void {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)
    }

    function menuItemClickHandler(item: MenuItem | MenuSubItem): void {
        if ('subItems' in item && item.label === 'Plans') {
            setCurrentPage(<PlansPage userId={props.userId} onPlanCreated={planCreatedHandler} />)
            setIsMenuOpen(false)
        }
    }

    return (
        <>
            <MenuOverlay isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />

            <Flex 
                flexDirection='column' 
                width='100%' 
                height='100vh' 
                maxHeight='100vh'
            >
                <AppBar title={currentTitle} onMenuClick={menuClickHandler} />

                <Flex 
                    flexGrow={1} 
                    minHeight='0' 
                    as='main' 
                    position={{ base: 'static', md: 'relative' }}
                >
                    <DashboardMenu onItemClick={menuItemClickHandler} isOpen={isMenuOpen} />

                    {currentPage}                
                </Flex>
            </Flex>
        </>
    )
}