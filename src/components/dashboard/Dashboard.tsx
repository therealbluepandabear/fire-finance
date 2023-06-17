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
import Menu, { MenuItem, MenuItemGroup } from '../ui/new/Menu'
import { User } from '../../api'
import AppBar from '../ui/new/AppBar'
import Plans, { Plan } from './pages/Plans'
import { useState } from 'react'

export class MenuHandler {

    private constructor() { }

    private static PLANS: Plan[] = []

    private static readonly PLAN_MENU: MenuItem = {
        leftContent: <MdHome size={20} />,
        label: 'Plans',
        subMenuItems: []
    }

    static addPlan(plan: Plan): void {
        this.PLANS.push(plan)

        this.PLAN_MENU.subMenuItems?.push({ label: plan.name })
    }

    static removePlan(plan: Plan): void {
        this.PLANS = this.PLANS.filter(_plan => _plan.id !== plan.id)

        this.PLAN_MENU.subMenuItems = this.PLANS.map(_plan => ({ label: _plan.name }))
    }

    static readonly menu: MenuItemGroup[] = [{
        menuItems: [this.PLAN_MENU],
        dock: 'top',
        background: '#fbf7f0',
        textColor: 'black'
    }]
}

interface DashboardMenuProps {
    isOpen: boolean
}

function DashboardMenu(props: DashboardMenuProps): JSX.Element {
    return (
        <Menu 
            isOpen={props.isOpen} 
            onItemClick={(index) => { }}
            menuItemGroups={MenuHandler.menu}
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
                    <Plans {...props} />
                </Flex>
            </Flex>
        </Flex>
    )
}