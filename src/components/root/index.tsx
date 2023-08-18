import { Flex, Button, useBreakpointValue, IconButton } from '@chakra-ui/react'
import { MdAutoGraph, MdChecklist, MdHelpOutline, MdMonitor, MdOutlineCalculate, MdOutlineSchool, MdPerson, MdSettings, MdSupportAgent } from 'react-icons/md'
import Menu, { MenuItem, MenuOverlay, MenuSubItem } from '../ui/Menu'
import { User } from '../../api'
import AppBar from '../ui/AppBar'
import { useState } from 'react'
import PlansPage from './pages/plans'
import PlanResultsPage from './pages/plan-results'
import { PlanEngine } from '../../models/retirement-calculator'
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
    function planCreatedHandler(engine: PlanEngine): void {
        setCurrentPage(<PlanResultsPage engine={engine} />)
    }

    const [currentPage, setCurrentPage] = useState<JSX.Element>(
        <PlansPage userId={props.userId} onPlanCreated={planCreatedHandler} />
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

    function menuItemClickHandler(item: MenuItem | MenuSubItem): void {
        if ("subItems" in item && item.label === 'Plans') {
            setCurrentPage(<PlansPage userId={props.userId} onPlanCreated={planCreatedHandler} />)
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
                <AppBar 
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
                    <DashboardMenu onItemClick={menuItemClickHandler} isOpen={isMenuOpen} />

                    {currentPage}                
                </Flex>
            </Flex>
        </>
    )
}