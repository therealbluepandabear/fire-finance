import { Flex, Button, useBreakpointValue, IconButton } from '@chakra-ui/react'
import { MdAutoGraph, MdChecklist, MdHelpOutline, MdOutlineCalculate, MdOutlineSchool, MdPerson, MdSettings, MdSupportAgent } from 'react-icons/md'
import FMenu, { MenuItem, MenuOverlay } from '../ui/Menu'
import { User } from '../../api'
import AppBar from '../ui/AppBar'
import { useState } from 'react'
import PlansPage from './pages/plans'
import DashboardPage from './pages/plan-results/pages/dashboard/index'
import PlanStepDialog from './pages/plans/components/new-plan-dialog/NewPlanDialog'
import PlanResultsPage from './pages/plan-results'

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
    const [currentPage, setCurrentPage] = useState<JSX.Element>(
        <PlansPage onPlanCreated={() => {
            setCurrentPage(<PlanResultsPage />)
        }} />
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
            <MenuOverlay isOpen={isMenuOpen} background='blur(5px)' onClick={() => setIsMenuOpen(false)} />

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
                    <DashboardMenu isOpen={isMenuOpen} />

                    {currentPage}                
                </Flex>
            </Flex>
        </>
    )
}