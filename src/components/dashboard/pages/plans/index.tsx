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
import FScrollableBox from '../../../ui/ScrollableBox'
import Chip from '../../../ui/Chip'
import Chips from '../../../ui/Chips'
import PlanCard from './components/PlanCard'
import DeletePlanModal from './components/DeletePlanModal'
import EditDescriptionModal from './components/EditDescriptionModal'
import RenamePlanModal from './components/RenamePlanModal'
import NewPlanDialog from './components/new-plan-dialog/NewPlanDialog'

export interface ModalProps {
    plan: Plan
    onClose: () => void
}

type DialogContext = { data?: Plan, type: 'rename' | 'editDescription' | 'delete' | 'new-plan' }

interface PlansPageProps {
    onPlanCreated: () => void
}

export default function PlansPage(props: PlansPageProps) {
    const dispatch = useAppDispatch()

    const [dialogContext, setDialogContext] = useState<DialogContext | null>()
    const [viewStarred, setViewStarred] = useState(false)

    const plans = useAppSelector(state => viewStarred ? state.plans.plans.filter(plan => plan.isFavorite) : state.plans.plans)

    function addPlanClickHandler(): void {
        setDialogContext({ type: 'new-plan' })
    }

    function duplicatePlanClickHandler(plan: Plan): void {
        dispatch(plansActions.duplicatePlan(plan.id))
    }

    function renamePlanClickHandler(plan: Plan): void {
        setDialogContext({ data: plan, type: 'rename' })
    }

    function editDescriptionPlanClickHandler(plan: Plan): void {
        setDialogContext({ data: plan, type: 'editDescription' })
    }

    function deletePlanClickHandler(plan: Plan): void {
        setDialogContext({ data: plan, type: 'delete' })
    }

    function onContextModalClose(): void {
        setDialogContext(null)
    }

    function chipIndexChangeHandler(index: number): void {
        setViewStarred(index === 1)
    }

    return (
        <FScrollableBox
            flexGrow={1}
            minHeight='0'
            overflowY='auto'
        >
            {dialogContext && dialogContext.type === 'rename' && <RenamePlanModal plan={dialogContext.data!!} onClose={onContextModalClose} />}
            {dialogContext && dialogContext.type === 'editDescription' && <EditDescriptionModal plan={dialogContext.data!!} onClose={onContextModalClose} />}
            {dialogContext && dialogContext.type === 'delete' && <DeletePlanModal plan={dialogContext.data!!} onClose={onContextModalClose} />}
            {dialogContext && dialogContext.type === 'new-plan' && <NewPlanDialog onClose={() => {
                onContextModalClose()
                props.onPlanCreated()
            }} />}

            <Flex 
                padding={{ base: '24px', md: '48px' }}
                flexDirection='column' 
                width='100%'
                position='relative'
            >
                <Flex flexDirection='column'>
                    <Flex flexDirection={{ base: 'column', md: 'row' }}>
                        <Flex gap='16px' alignSelf='center' alignItems='center'>
                            <Text fontSize='2xl' fontFamily='manrope'>Plans</Text>
                        </Flex>

                        <Flex 
                            display={{ base: 'flex', md: 'none' }}
                            marginTop={{ base: '16px', xl: '0px' }}
                            marginLeft='-24px'
                            marginRight='-24px'
                            marginBottom='36px'
                        >
                            <Tabs isFitted={true} width='100%' onChange={chipIndexChangeHandler} isLazy={true}>
                                <TabList>
                                    <Tab 
                                        gap='8px' 
                                        ringColor='yellow' 
                                        _selected={{ 
                                            borderBottomColor: 'buttonPrimary', 
                                            color: 'buttonPrimary'
                                        }}
                                    >
                                        <MdChecklist size={20} />
                                        All Plans
                                    </Tab>
                                    <Tab 
                                        gap='8px' 
                                        _selected={{ 
                                            borderBottomColor: 'buttonPrimary', 
                                            color: 'buttonPrimary', 
                                        }}
                                    >
                                        <MdStarOutline size={20} />
                                        Starred
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
                                leftIcon={<MdAdd size={20} />}
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
                    <Chips onIndexChange={chipIndexChangeHandler}>
                        <Chip>All Plans</Chip>
                        <Chip>Starred</Chip>
                    </Chips>
                </Flex>

                {plans.length > 0 ? (
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
                            />
                        ))}
                    </Grid>
                ) : (
                    <Flex 
                        flexGrow={1} 
                        alignItems='center' 
                        justifyContent='center'
                    >
                        <Flex 
                            width='400px'
                            height='400px'
                            flexDirection='column' 
                            gap='32px' 
                            alignItems='center' 
                            justifyContent='center'
                            borderRadius='100px'
                        >
                            <Image src={viewStarred ? '/star.svg' : '/empty_state.svg'} width='250px' padding='0' />

                            <Flex flexDirection='column' gap='8px'>
                                <Text 
                                    fontFamily='manrope' 
                                    fontSize='3xl' 
                                    textAlign='center' 
                                    color='black'
                                >
                                    {viewStarred ? `You haven't stared a plan yet` : `You don't have any plans yet`}
                                </Text>
                                
                                <Text textAlign='center' color='gray' fontFamily='Manrope'>
                                    {viewStarred ? 'Star a plan to get started.' : 'Create a plan to get started.'}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
                
            <IconButton
                visibility={{ base: 'visible', md: 'collapse' }}
                width='56px'
                height='56px'
                shadow='lg'
                right='0'
                bottom='0'
                background='buttonPrimary'
                position='absolute'
                icon={<MdAdd color='white' size={20} />}
                aria-label='Add Plan'
                borderRadius='999px'
                onClick={addPlanClickHandler}
                margin='16px'
            />
        </FScrollableBox>
    )
}
