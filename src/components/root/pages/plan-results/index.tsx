import { Tabs, TabList, Tab, Flex, TabPanels, TabPanel, Box, useBreakpointValue } from '@chakra-ui/react'
import { MdOutlineDashboard, MdAutoGraph } from 'react-icons/md'
import ScrollableBox from '../../../ui/ScrollableBox'
import ScenariosPage from './pages/scenarios'
import DashboardPage from './pages/dashboard'
import { PlanEngine } from '../../../../models/retirement-calculator'

export interface PlanResultsPageProps {
    engine: PlanEngine
}

export default function PlanResultsPage(props: PlanResultsPageProps) {
    const isFitted = useBreakpointValue({ base: true, md: false })

    return (
        <ScrollableBox
            height='100%'
            width='100%'
            overflowY='scroll'
            flexDirection='column'
            minWidth='0'
            alignItems='center'
        >
            <Tabs isLazy={true} isFitted={isFitted} marginBottom='16px' width='100%'>
                <TabList 
                    gap='12px' 
                    paddingLeft={{ base: '16px', md: '48px' }} 
                    paddingTop={{ base: '16px', md: '48px' }}
                    position='sticky'
                    top='0' 
                    background='white'
                    zIndex='997'
                >
                    <Tab
                        fontFamily='Manrope'
                        gap='8px'
                        _selected={{
                            borderBottomColor: 'buttonPrimary',
                            color: 'buttonPrimary',
                        }}
                    >
                        <Flex padding='4px' gap='6px' alignItems='center'>
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
                        <Flex padding='4px' gap='6px' alignItems='center'>
                            <MdAutoGraph size={20} />
                            Scenarios
                        </Flex>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel padding='0' margin='0'>
                        <DashboardPage {...props} />
                    </TabPanel>

                    <TabPanel padding='0' margin='0'>
                        <ScenariosPage />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </ScrollableBox>
    )
}