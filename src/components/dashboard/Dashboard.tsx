import { Flex, Button, useBreakpointValue, Box, IconButton } from '@chakra-ui/react'
import { 
    MdChecklist, 
    MdClass, 
    MdCompassCalibration, 
    MdDirections, 
    MdDownload, 
    MdElectricBolt, 
    MdExplore, 
    MdHome, 
    MdLightbulb,
    MdPerson, 
    MdStar, 
    MdTune 
} from 'react-icons/md'
import FMenu, { MenuItem, MenuItemGroup } from '../ui/new/FMenu'
import { User } from '../../api'
import FAppBar from '../ui/new/FAppBar'
import Plans, { Plan } from './pages/Plans'
import { useState } from 'react'
import { useAppSelector } from '../../store'

interface DashboardMenuProps {
    isOpen: boolean
}

function DashboardMenu(props: DashboardMenuProps): JSX.Element {
    const plans = useAppSelector(state => state.plans.plans)

    const planMenu: MenuItem = {
        leftContent: <MdHome size={20} />,
        label: 'Plans',
        subMenuItems: plans.map(plan => ({ label: plan.name }))
    }

    const menuItemGroups: MenuItemGroup[] = [{ 
        menuItems: [planMenu],
        dock: 'top',
        background: '#fbf7f0',
        textColor: 'black'
    }]

    return (
        <FMenu 
            isOpen={props.isOpen} 
            onItemClick={(index) => { }}
            menuItemGroups={menuItemGroups}
        />
    )
}

export interface DashboardProps {
    user: User
}

export default function Dashboard(props: DashboardProps): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const responsiveMenuContentRight = useBreakpointValue({
        base: [
            <IconButton
                height='49px'
                width='49px'
                aria-label='...'
                icon={<MdTune size={20} />}
                borderRadius='999px'
                variant='outline'
            >Assumptions</IconButton>,

            <IconButton
                height='49px'
                width='49px'
                aria-label='...'
                icon={<MdPerson size={20} />}
                borderRadius='999px'
                variant='outline'
            >You</IconButton>
        ], 
        md: [
            <Button
                height='49px'
                background='transparent'
                border='1px solid #e1e1dc'
                leftIcon={<MdTune size={20} />}
            >Assumptions</Button>,

            <Button
                height='49px'
                background='transparent'
                border='1px solid #e1e1dc'
                leftIcon={<MdPerson size={20} />}
            >You</Button>
        ] 
    });

    function menuClickHandler(): void {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)
    }

    return (
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
                position='relative'
            >
                <DashboardMenu isOpen={isMenuOpen} />

                <Flex flexGrow={1} minHeight='0' overflowY='scroll'>
                    <Plans {...props} />
                </Flex>
            </Flex>
        </Flex>
    )
}