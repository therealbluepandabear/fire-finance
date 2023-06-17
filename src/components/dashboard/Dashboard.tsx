import { Flex, Button } from '@chakra-ui/react'
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
import Menu, { MenuItemGroup } from '../ui/new/Menu'
import { User } from '../../api'
import AppBar from '../ui/new/AppBar'
import Settings from './pages/Settings'
import { useState } from 'react'

interface DashboardMenuProps {
    isOpen: boolean
}

function DashboardMenu(props: DashboardMenuProps): JSX.Element {
    return (
        <Menu 
            isOpen={props.isOpen} 
            onItemClick={(index) => { }}
            menuItemGroups={[ 
                {
                    menuItems: [{ 
                        leftContent: <MdHome size={20} />, 
                        label: 'Plans',
                        subMenuItems: [ 
                            { label: 'Plan 1' },
                            { label: 'Plan 2' },
                            { label: 'Plan 3' },
                            { label: 'Plan 4' },
                            { label: 'Plan 5' }
                        ]
                    }], 
                    dock: 'top', 
                    background: '#fbf7f0', 
                    textColor: 'black' 
                }
            ]}
        />
    )
}

export interface DashboardProps {
    user: User
}

export default function Dashboard(props: DashboardProps): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function menuClickHandler(): void {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)
    }

    return (
        <Flex flexDirection='column' width='100%' height='100vh' maxHeight='100vh'>
            <AppBar 
                isMenu={true} 
                onMenuClick={menuClickHandler}
                contentRight={[
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
                ]}
            />

            <Flex 
                flexGrow={1} 
                minHeight='0' 
                as='main' 
                position='relative'
            >
                <DashboardMenu isOpen={isMenuOpen} />

                <Flex flexGrow={1} minHeight='0' overflowY='scroll'>
                    <Settings {...props} />
                </Flex>
            </Flex>
        </Flex>
    )
}