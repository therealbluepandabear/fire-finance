import { Flex, Button, useBreakpointValue, Box, IconButton } from '@chakra-ui/react'
import { MdAutoGraph, MdChecklist, MdHelpOutline, MdOutlineCalculate, MdOutlineSchool, MdPerson, MdSettings, MdSupportAgent } from 'react-icons/md'
import FMenu, { MenuItem } from '../ui/FMenu'
import { User } from '../../api'
import FAppBar from '../ui/FAppBar'
import Plans from './pages/Plans'
import { useState } from 'react'
import FScrollableBox from '../ui/FScrollableBox'

interface DashboardMenuProps {
    isOpen: boolean
}

function DashboardMenu(props: DashboardMenuProps): JSX.Element {

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

export default function Dashboard(props: DashboardProps): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const responsiveMenuContentRight = useBreakpointValue({
        base: [
            <IconButton
                height='49px'
                width='49px'
                aria-label='...'
                icon={<MdSettings size={20} />}
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
                leftIcon={<MdSettings size={20} />}
            >Settings</Button>,

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