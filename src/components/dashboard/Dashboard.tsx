import { Flex, Button } from '@chakra-ui/react'
import { MdChecklist, MdClass, MdCompassCalibration, MdDirections, MdDownload, MdElectricBolt, MdExplore, MdLightbulb, MdPerson, MdStar, MdTune } from 'react-icons/md'
import Menu, { MenuItemGroup } from '../ui/new/Menu'
import { User } from '../../api'
import AppBar from '../ui/new/AppBar'
import Settings from './pages/Settings'
import { useState } from 'react'

const iconSize = 20

const topMenuItemGroup: MenuItemGroup = {
    background: '#fbf7f0',
    textColor: 'black',
    dock: 'top',
    menuItems: [
        {
            leftContent: <MdStar size={iconSize} />,
            label: 'Baseline Plan'
        },
        {
            leftContent: <MdChecklist size={iconSize} />,
            label: 'Overview',
            subMenuItems: [
                { label: 'Accounts and Assets' },
                { label: 'Home and Real Estate' },
                { label: 'Debts' },
                { label: 'Income' },
                { label: 'Expenses and Healthcare' },
                { label: 'Money Flows' },
                { label: 'Estate Planning' },
                { label: 'Profile and Goals' },
                { label: 'Assumptions' }
            ]
        },
        {
            leftContent: <MdElectricBolt size={iconSize} />,
            label: 'Coach',
            subMenuItems: [
                { label: 'Suggestions' },
                { label: 'Progress' },
                { label: 'Strengthen Your Plan' }
            ]
        },
        {
            leftContent: <MdLightbulb size={iconSize} />,
            label: 'Insights',
            subMenuItems: [
                { label: 'Library' },
                { label: 'Lifetime Income Projection' },
                { label: 'Net Worth Statement' },
                { label: 'Analysis of Goals' },
                { label: 'IRMAA' },
                { label: 'Lifetime Cash Flow' },
                { label: 'Projected Net Worth' },
                { label: 'Timeline of Milestones' },
                { label: 'Income & Expenses' },
                { label: 'Savings' },
                { label: 'Taxes' },
                { label: 'Savings Timeline' },
                { label: 'What You Need' },
                { label: 'Withdrawals' },
                { label: 'Surplus-Gap' }
            ]
        },
        {
            leftContent: <MdExplore />,
            label: 'Explorers',
            subMenuItems: [
                { label: 'What If' },
                { label: 'Monte Carlo' },
                { label: 'Social Security Explorer' },
                { label: 'Roth Conversion Explorer' }
            ]
        },
        {
            leftContent: <MdDownload />,
            label: 'Download/Print'
        }
    ]
}

const bottomMenuItemGroup: MenuItemGroup = { 
    background: '#0a2f38',
    textColor: 'white',
    dock: 'bottom',
    menuItems: [
        {
            leftContent: <MdDirections size={iconSize} />,
            label: 'Scenarios'
        },
        {
            leftContent: <MdClass size={iconSize} />,
            label: 'Classroom'
        },
        {
            leftContent: <MdPerson size={iconSize} />,
            label: 'Expertise',
            subMenuItems: [
                { label: 'Help Center' },
                { label: 'Live Events' },
                { label: 'Community' }
            ]
        },
        {
            leftContent: <MdCompassCalibration size={iconSize} />,
            label: 'About'
        }
    ]
}

const upgradeMenuItemGroup: MenuItemGroup = {
    background: '#0d3e4b',
    textColor: 'white',
    dock: 'bottom',
    menuItems: [
        {
            leftContent: <MdClass />,
            label: 'Upgrade to Planner+'
        }
    ]
}

const menuItemGroups: MenuItemGroup[] = [topMenuItemGroup, bottomMenuItemGroup, upgradeMenuItemGroup]

interface DashboardMenuProps {
    isOpen: boolean
}

function DashboardMenu(props: DashboardMenuProps): JSX.Element {
    return (
        <Menu 
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

            <Flex 
                flexGrow={1} 
                minHeight='0' 
                as='main' 
                position='relative'
            >
                <DashboardMenu isOpen={isMenuOpen} />

                <Flex flexGrow={1}>
                    <Settings {...props} />
                </Flex>
            </Flex>
        </Flex>
    )
}