import { Flex, Button, IconButton, Text } from '@chakra-ui/react'
import { MdChecklist, MdElectricBolt, MdLightbulb, MdPerson, MdSpeed, MdStar, MdTune } from 'react-icons/md'
import Menu from '../ui/new/Menu'
import MenuItem from '../ui/new/MenuItem'
import { User } from '../../api'
import AppBar from '../ui/new/AppBar'
import Settings from './pages/Settings'
import { useState } from 'react'

interface DashboardMenuProps {
    isOpen: boolean
}

function DashboardMenu(props: DashboardMenuProps): JSX.Element {
    return (
        <Menu isOpen={props.isOpen} onItemClick={(index) => { }}>
            <MenuItem
                icon={(
                    <IconButton
                        icon={<MdStar size={15} />}
                        color='rgb(129, 73, 34)'
                        background='rgba(255, 143, 67, 0.08)'
                        aria-label='???'
                        borderRadius='999px'
                    />
                )}
                label='Baseline Plan'
            />

            <MenuItem
                icon={(
                    <IconButton
                        icon={<MdSpeed size={25} />}
                        background='transparent'
                        aria-label='???'
                    />
                )}
                
                label='Overview'
            />

            <MenuItem
                icon={(
                    <IconButton
                        icon={<MdChecklist size={25} />}
                        background='transparent'
                        aria-label='???'
                    />
                )}
                label='My Plan'
            />

            <MenuItem
                icon={(
                    <IconButton
                        icon={<MdElectricBolt size={25} />}
                        background='transparent'
                        aria-label='???'
                    />
                )}
                label='Coach'
            />

            <MenuItem
                icon={(
                    <IconButton
                        icon={<MdLightbulb size={25} />}
                        background='transparent'
                        aria-label='???'
                    />
                )}
                label='Insights'
            />
        </Menu>
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
        <Flex flexDirection='column' width='100%' height='100vh'>
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

            <Flex flexGrow={1}>
                <DashboardMenu isOpen={isMenuOpen} />
              

                {/* <Menu 
                    width='55px' 
                    background='#faf7f1' 
                    alignItems='center'
                    flexDirection='column'
                    paddingTop='8px'
                >
                    <IconButton
                        icon={<MdStar size={15} />}
                        color='rgb(129, 73, 34)'
                        background='rgba(255, 143, 67, 0.08)'
                        aria-label='???'
                        borderRadius='999px'
                    />

                    <Box width='23px' height='1px' background='rgba(22, 135, 94, 0.64)' />

                    <IconButton 
                        icon={<MdSpeed size={25} />}
                        background='transparent'
                        aria-label='???'
                    />

                    <IconButton
                        icon={<MdChecklist size={25} />}
                        background='transparent'
                        aria-label='???'
                    />

                    <IconButton
                        icon={<MdElectricBolt size={25} />}
                        background='transparent'
                        aria-label='???'
                    />

                    <IconButton
                        icon={<MdLightbulb size={25} />}
                        background='transparent'
                        aria-label='???'
                    />

                    <Flex 
                        flexDirection='column' 
                        marginTop='auto' 
                        background='rgb(10, 47, 56)'
                        width='100%'
                        alignItems='center'
                    >
                        <IconButton
                            icon={<MdSignpost size={25} />}
                            color='white'
                            background='transparent'
                            aria-label='???'
                        />

                        <IconButton
                            icon={<MdSchool size={25} />}
                            color='white'
                            background='transparent'
                            aria-label='???'
                        />

                        <IconButton
                            icon={<MdHelp size={25} />}
                            color='white'
                            background='transparent'
                            aria-label='???'
                        />

                        <IconButton 
                            icon={<MdExplore size={25} />}
                            color='white'
                            background='transparent'
                            aria-label='???'
                        />
                    </Flex>
                </Flex> */}

                <Flex flexGrow={1}>
                    <Settings {...props} />
                </Flex>
            </Flex>
        </Flex>
    )
}