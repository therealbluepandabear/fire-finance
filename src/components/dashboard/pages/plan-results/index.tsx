import { Tabs, TabList, Tab, Flex, TabPanels, TabPanel, Box } from '@chakra-ui/react'
import { MdOutlineDashboard, MdAutoGraph } from 'react-icons/md'
import Divider from '../../../ui/Divider'
import FScrollableBox from '../../../ui/ScrollableBox'
import ScenariosPage from './pages/scenarios'
import DashboardPage from './pages/dashboard'

export default function PlanResultsPage() {
    return (
        <FScrollableBox
            height='100%'
            width='100%'
            overflowY='scroll'
            flexDirection='column'
            minWidth='0'
            alignItems='center'
        >
            <Tabs isLazy={true} marginBottom='16px' width='100%'>
                <TabList gap='12px' padding='48px 16px 0px 48px' position='sticky' top='0' backdropFilter='blur(5px)' zIndex='998'>
                    <Tab
                        fontFamily='Manrope'
                        gap='8px'
                        _selected={{
                            borderBottomColor: 'buttonPrimary',
                            color: 'buttonPrimary',
                        }}
                    >
                        <Flex padding='4px' gap='6px' alignItems='center' fontWeight='normal'>
                            <MdOutlineDashboard size={20} />
                            Dashboard
                        </Flex>
                    </Tab>
                    <Tab
                        fontFamily='Manrope'
                        gap='8px'
                        _selected={{
                            borderBottomColor: 'buttonPrimary',
                            color: 'buttonPrimary',
                        }}
                    >
                        <Flex padding='4px' gap='6px' alignItems='center' fontWeight='normal'>
                            <MdAutoGraph size={20} />
                            Scenarios
                        </Flex>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel padding='0' margin='0'>
                        <DashboardPage planId='0' />
                    </TabPanel>

                    <TabPanel padding='0' margin='0'>
                        <ScenariosPage />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </FScrollableBox>
    )
}