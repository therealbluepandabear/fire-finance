import { Tabs, TabList, Tab, Flex, TabPanels, TabPanel, Box, useBreakpointValue } from '@chakra-ui/react'
import { MdOutlineDashboard, MdAutoGraph } from 'react-icons/md'
import ScrollableBox from '../../../ui/ScrollableBox'
import ScenariosPage from './pages/scenarios'
import DashboardPage from './pages/dashboard'
import { PlanEngine, PlanEngineInputs, PlanEngineOutputs, Scenario } from '../../../../models/retirement-calculator'
import { useEffect, useMemo, useState } from 'react'
import { NewPlan } from '../../../../api'

export interface PlanResultsPageProps {
    plan: NewPlan
}

export default function PlanResultsPage(props: PlanResultsPageProps) {
    const engine = useMemo(() => new PlanEngine(props.plan.inputs), [])
    
    const [outputs, setOutputs] = useState<PlanEngineOutputs>(engine.calculate())
    
    const isFitted = useBreakpointValue({ base: true, md: false })

    function engineUpdateHandler(callback: (engine: PlanEngine) => void): void {
        callback(engine)
        setOutputs(engine.calculate())
    }

    console.log(props.plan.inputs)

    return (
        <ScrollableBox
            height='100%'
            width='100%'
            overflowY='scroll'
            flexDirection='column'
            minWidth='0'
            alignItems='center'
        >
            <Tabs isFitted={isFitted} marginBottom='16px' width='100%'>
                <TabList 
                    gap='12px' 
                    paddingLeft={{ base: '0px', md: '48px' }} 
                    paddingTop={{ base: '0px', md: '48px' }}
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
                            Scenarios
                        </Flex>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel padding='0' margin='0'>
                        <DashboardPage outputs={outputs} />
                    </TabPanel>

                    <TabPanel padding='0' margin='0'>
                        <ScenariosPage plan={props.plan} updateEngine={engineUpdateHandler}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </ScrollableBox>
    )
}