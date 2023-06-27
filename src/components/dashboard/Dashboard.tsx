import { Flex, Button, useBreakpointValue, Box, IconButton } from '@chakra-ui/react'
import { MdBarChart, MdChecklist, MdHome, MdList, MdPerson, MdTune } from 'react-icons/md'
import FMenu, { MenuItem, MenuItemGroup } from '../ui/FMenu'
import { User } from '../../api'
import FAppBar from '../ui/FAppBar'
import Plans from './pages/Plans'
import { useState } from 'react'
import { useAppSelector } from '../../store'
import FScrollableBox from '../ui/FScrollableBox'

interface DashboardMenuProps {
    isOpen: boolean
}

function DashboardMenu(props: DashboardMenuProps): JSX.Element {
    const plans = useAppSelector(state => state.plans.plans)

    const planMenuItem: MenuItem = {
        leftContent: <MdChecklist size={20} />,
        label: 'Plans'
    }

    const progressMenuItem: MenuItem = {
        leftContent: <MdBarChart size={20} />,
        label: 'Progress'
    }

    return (
        <FMenu 
            isOpen={props.isOpen} 
            onItemClick={(index) => { }}
            menuItems={[planMenuItem, progressMenuItem]}
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
            />,

            <IconButton
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
            >tom66</Button>
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

                <FScrollableBox 
                    thickness='thick' 
                    flexGrow={1}
                    minHeight='0' 
                    overflowY='scroll'
                >
                    <Plans {...props} />
                </FScrollableBox>
            </Flex>
        </Flex>
    )
}