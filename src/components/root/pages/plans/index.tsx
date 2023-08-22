import { 
    Flex, 
    Box, 
    Button, 
    IconButton,
    Grid, 
    Image, 
    Tab,
    TabList,
    Tabs,
    Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { 
    MdAdd, 
    MdChecklist, 
    MdStarOutline
} from 'react-icons/md'
import Divider from '../../../ui/Divider'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { plansActions, Plan } from '../../../../store/plans-slice'
import ScrollableBox from '../../../ui/ScrollableBox'
import Chip from '../../../ui/Chip'
import Chips from '../../../ui/Chips'
import PlanCard from './components/PlanCard'
import DeletePlanModal from './components/DeletePlanModal'
import EditDescriptionModal from './components/EditDescriptionModal'
import RenamePlanModal from './components/RenamePlanModal'
import NewPlanDialog from './components/new-plan-dialog/NewPlanDialog'
import { PlanEngine, PlanEngineInputs } from '../../../../models/retirement-calculator'
import { NewPlan, PlanRequest, User, useAddPlanToUserMutation, useDeletePlanMutation, useGetPlansOfUserQuery } from '../../../../api'
import EmptyPlansState from './components/EmptyPlansState'
import PlanChart from './components/PlanChart'

export interface ModalProps {
    plan: NewPlan
    onClose: () => void
}

type DialogContext = { data?: NewPlan, type: 'rename' | 'editDescription' | 'delete' | 'new-plan' }

interface PlansPageProps {
    userId: string
    onPlanCreated: (inputs: PlanEngineInputs) => void
}

export default function PlansPage(props: PlansPageProps) {
    const [dialogContext, setDialogContext] = useState<DialogContext | null>()
    const [viewStarred, setViewStarred] = useState(false)

    const [addPlanToUser] = useAddPlanToUserMutation()
    const { data: plans, refetch: refetchPlans } = useGetPlansOfUserQuery({ userId: props.userId, isStarred: viewStarred })

    function addPlanClickHandler(): void {
        setDialogContext({ type: 'new-plan' })
    }

    async function duplicatePlanClickHandler(plan: NewPlan): Promise<void> {
        const { id, ...planRequest } = plan

        await addPlanToUser({ id: props.userId, plan: planRequest })
        await refetchPlans()
    }

    function renamePlanClickHandler(plan: NewPlan): void {
        setDialogContext({ data: plan, type: 'rename' })
    }

    function editDescriptionPlanClickHandler(plan: NewPlan): void {
        setDialogContext({ data: plan, type: 'editDescription' })
    }

    function deletePlanClickHandler(plan: NewPlan): void {
        setDialogContext({ data: plan, type: 'delete' })
    }

    async function onContextModalClose(): Promise<void> {
        setDialogContext(null)

        if (dialogContext!!.type !== 'new-plan') {
            await refetchPlans()
        }
    }

    async function tabIndexChangeHandler(index: number): Promise<void> {
        setViewStarred(index === 1)

        await refetchPlans()
    }

    async function newPlanDialogCloseHandler(planName: string, inputs: PlanEngineInputs): Promise<void> {
        setDialogContext(null) 

        await addPlanToUser({ 
            id: props.userId, 
            plan: { 
                name: planName, 
                inputs: inputs as PlanEngineInputs, 
                creationDate: new Date().toISOString(),
                isStarred: false
            }
        })
        await refetchPlans()

        props.onPlanCreated(inputs)
    }

    function planCardClickHandler(plan: NewPlan): void {
        props.onPlanCreated(plan.inputs)
    }

    function newPlanDialogCancelHandler(): void {
        setDialogContext(null)
    }

    return (
        <ScrollableBox
            flexGrow={1}
            minHeight='0'
            overflowY='auto'
        >
            {dialogContext && dialogContext.type === 'rename' && <RenamePlanModal plan={dialogContext.data!!} onClose={onContextModalClose} />}
            {dialogContext && dialogContext.type === 'editDescription' && <EditDescriptionModal plan={dialogContext.data!!} onClose={onContextModalClose} />}
            {dialogContext && dialogContext.type === 'delete' && <DeletePlanModal plan={dialogContext.data!!} onClose={onContextModalClose} />}
            {dialogContext && dialogContext.type === 'new-plan' && <NewPlanDialog onCancel={newPlanDialogCancelHandler} onClose={newPlanDialogCloseHandler} />}

            <Flex 
                padding={{ base: '0px', md: '48px' }}
                flexDirection='column' 
                width='100%'
                position='relative'
            >
                <Flex flexDirection='column'>
                    <Flex flexDirection={{ base: 'column', md: 'row' }}>
                        <Flex gap='16px' alignSelf='center' alignItems='center' display={{ base: 'none', md: 'flex' }}>
                            <Text fontSize='2xl' fontFamily='manrope'>Plans</Text>
                        </Flex>

                        <Flex 
                            display={{ base: 'flex', md: 'none' }}
                            marginBottom='36px'
                        >
                            <Tabs 
                                marginBottom='16px' 
                                width='100%' 
                                isFitted={true} 
                                onChange={tabIndexChangeHandler}
                            >
                                <TabList 
                                    gap='12px' 
                                    position='sticky' 
                                    top='0' 
                                    background='white'
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
                                            All Plans
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
                                            Starred
                                        </Flex>
                                    </Tab>
                                </TabList>
                            </Tabs>
                        </Flex>

                        <Flex 
                            marginLeft='auto'
                            gap='12px'
                            display={{ base: 'none', md: 'flex' }}
                        >   
                            <Button
                                alignSelf='center'
                                leftIcon={<MdAdd />}
                                marginLeft='auto'
                                color='white'
                                background='buttonPrimary'
                                onClick={addPlanClickHandler}
                            >New</Button>
                        </Flex>
                    </Flex>

                    <Box display={{ base: 'none', md: 'block' }}>
                        <Divider />
                    </Box>
                </Flex>

                <Flex marginTop='-16px' height='35px' minHeight='35px' marginBottom='32px' display={{ base: 'none', md: 'flex' }}>
                    <Chips onIndexChange={tabIndexChangeHandler}>
                        <Chip>All Plans</Chip>
                        <Chip>Starred</Chip>
                    </Chips>
                </Flex>

                {plans && plans.length > 0 ? (
                    <Grid 
                        paddingBottom='36px'
                        templateColumns={{ 
                            base: 'repeat(1, 1fr)',
                            md: 'repeat(2, 1fr)', 
                            xl: 'repeat(3, 1fr)'
                        }} 
                        gap='12px'
                    >
                        {plans.map((plan, index) => (
                            <PlanCard 
                                key={index} 
                                onEditDescription={editDescriptionPlanClickHandler}
                                onRename={renamePlanClickHandler}
                                onDelete={deletePlanClickHandler} 
                                onDuplicate={duplicatePlanClickHandler}
                                plan={plan} 
                                onClick={planCardClickHandler}
                            />
                        ))}
                    </Grid>
                ) : (
                    <EmptyPlansState viewStarred={viewStarred} />
                )}
            </Flex>
                
            <IconButton
                variant='fab'
                visibility={{ base: 'visible', md: 'collapse' }}
                icon={<MdAdd color='white' size={20} />}
                aria-label='Add Plan'
                onClick={addPlanClickHandler}
            />
        </ScrollableBox>
    )
}
