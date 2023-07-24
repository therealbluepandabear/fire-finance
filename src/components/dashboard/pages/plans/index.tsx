import { 
    Flex, 
    Box, 
    Button, 
    IconButton,
    Grid, 
    Image, 
    Popover, 
    PopoverBody, 
    PopoverContent, 
    PopoverTrigger, 
    useDisclosure, 
    FocusLock,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Input,
    ModalCloseButton,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Select,
    Tabs,
    Text,
    useBreakpointValue,
    Tooltip
} from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { 
    MdAdd, 
    MdArrowBack, 
    MdArrowLeft, 
    MdChecklist, 
    MdContentCopy, 
    MdDelete, 
    MdDescription, 
    MdEdit, 
    MdGrid4X4, 
    MdGridView, 
    MdInfo, 
    MdInfoOutline, 
    MdList, 
    MdMoreVert, 
    MdOutlineGridView, 
    MdOutlineViewList, 
    MdOutlineViewModule, 
    MdSearch, 
    MdStar, 
    MdStarOutline, 
    MdViewList
} from 'react-icons/md'
import Divider from '../../../ui/Divider'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { plansActions, Plan } from '../../../../store/plans-slice'
import { generateId } from '../../../../utils'
import FScrollableBox from '../../../ui/ScrollableBox'
import Chip from '../../../ui/Chip'
import Chips from '../../../ui/Chips'
import Card from '../../../ui/Card'
import SimpleModal from '../../../ui/SimpleModal'
import PlanCard from './components/PlanCard'

interface ModalProps {
    plan: Plan
    onClose: () => void
}

function RenamePlanModal(props: ModalProps) {  
    const dispatch = useAppDispatch()
      
    const { register, watch } = useForm<{ inputValue: string }>(
        { defaultValues: { inputValue: props.plan.name } }
    )

    function OKClickHandler(): void {
        const newName = watch('inputValue')
        dispatch(plansActions.renamePlan({ id: props.plan.id, newName: newName }))

        props.onClose()
    }

    return (
        <SimpleModal title='Rename' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Input {...register('inputValue', { required: true })} />
        </SimpleModal>
    )
}

function EditDescriptionModal(props: ModalProps) {
    const dispatch = useAppDispatch()

    const planDescription = props.plan.description ?? ''

    const { register, watch } = useForm<{ description: string }>(
        { defaultValues: { description: planDescription } }
    )

    function OKClickHandler(): void {
        const description = watch('description')
        dispatch(plansActions.editPlan({ id: props.plan.id, partialState: { description: description } }))
    
        props.onClose()
    }

    return (
        <SimpleModal title='Edit Description' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Input {...register('description', { required: true })} />
        </SimpleModal>
    )
}

function DeletePlanModal(props: ModalProps) {
    const dispatch = useAppDispatch()

    function OKClickHandler(): void {
        dispatch(plansActions.removePlan(props.plan.id))

        props.onClose()
    }

    return (
        <SimpleModal title='Delete Plan' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Text>{`Are you sure you want to delete ${props.plan.name}? This cannot be undone.`}</Text>
        </SimpleModal>
    )
}

type DialogContext = { data: Plan, type: 'rename' | 'editDescription' | 'delete' }

interface PlansPageProps {
    onAddPlanClick: () => void
}

export default function PlansPage(props: PlansPageProps) {
    const dispatch = useAppDispatch()

    const [context, setContext] = useState<DialogContext | null>()
    const [viewStarred, setViewStarred] = useState(false)

    const plans = useAppSelector(state => viewStarred ? state.plans.plans.filter(plan => plan.isFavorite) : state.plans.plans)

    function addPlanClickHandler(): void {
        props.onAddPlanClick()
    }

    function duplicatePlanClickHandler(plan: Plan): void {
        dispatch(plansActions.duplicatePlan(plan.id))
    }

    function renamePlanClickHandler(plan: Plan): void {
        setContext({ data: plan, type: 'rename' })
    }

    function editDescriptionPlanClickHandler(plan: Plan): void {
        setContext({ data: plan, type: 'editDescription' })
    }

    function deletePlanClickHandler(plan: Plan): void {
        setContext({ data: plan, type: 'delete' })
    }

    function onContextModalClose(): void {
        setContext(null)
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
            {context && context.type === 'rename' && <RenamePlanModal plan={context.data} onClose={onContextModalClose} />}
            {context && context.type === 'editDescription' && <EditDescriptionModal plan={context.data} onClose={onContextModalClose} />}
            {context && context.type === 'delete' && <DeletePlanModal plan={context.data} onClose={onContextModalClose} />}

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
                                onClick={props.onAddPlanClick}
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
