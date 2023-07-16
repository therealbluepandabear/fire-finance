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
import Divider from '../../ui/Divider'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../store'
import { plansActions, Plan } from '../../../store/plans-slice'
import { generatePlanId } from '../../../utils'
import FScrollableBox from '../../ui/ScrollableBox'
import Chip from '../../ui/Chip'
import Chips from '../../ui/Chips'
import { GenIcon } from 'react-icons'
import Card from '../../ui/Card'

interface PlanDescriptionBadgeProps {
    description: string
}

function PlanDescriptionBadge(props: PlanDescriptionBadgeProps) {

    const { onOpen, onClose, isOpen } = useDisclosure()

    return (
        <Popover
            variant='responsive'
            placement='left-start'
            trigger='hover'
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                <IconButton
                    icon={<MdDescription size={20} />}
                    aria-label='Description'
                    width='30px'
                    height='30px'
                    minWidth='0px'
                    minHeight='0px'
                    borderRadius='999px'
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody padding='0px'>
                    <FocusLock persistentFocus={false}>
                        <FScrollableBox 
                            padding='8px' 
                            maxWidth='200px' 
                            maxHeight='200px' 
                            overflowY='scroll'
                        >
                            {props.description}
                        </FScrollableBox>
                    </FocusLock>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    }
]

interface PlanPopoverButtonProps extends PropsWithChildren {
    icon: JSX.Element
    text: string
    onClick: () => void
}

function PlanPopoverButton(props: PlanPopoverButtonProps) {
    return (
        <Button
            background='white'
            justifyContent='flex-start'
            leftIcon={props.icon}
            borderRadius='0px'
            onClick={props.onClick}
        >{props.text}</Button>
    )
}

interface PlanOptionsBadgeProps {
    onEditDescription: () => void
    onRename: () => void
    onDuplicate: () => void
    onDelete: () => void
}

function PlanOptionsBadge(props: PlanOptionsBadgeProps) {
    
    const { onOpen, onClose, isOpen } = useDisclosure()

    return (
        <Popover
            variant='responsive'
            placement='left-start'
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                <IconButton
                    icon={<MdMoreVert size={20} />}
                    aria-label='Options'
                    width='30px'
                    height='30px'
                    minWidth='0px'
                    minHeight='0px'
                    borderRadius='999px'
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody padding='0px'>
                    <FocusLock persistentFocus={false}>
                        <Flex flexDirection='column' width='200px'>
                            <PlanPopoverButton
                                icon={<MdDescription />}
                                onClick={props.onEditDescription}
                                text='Edit Description'
                            />

                            <PlanPopoverButton
                                icon={<MdEdit />}
                                onClick={props.onRename}
                                text='Rename'
                            />

                            <PlanPopoverButton
                                icon={<MdContentCopy />}
                                onClick={() => {
                                    props.onDuplicate()
                                    onClose()
                                }}
                                text='Duplicate'
                            >Duplicate</PlanPopoverButton>

                            <PlanPopoverButton
                                icon={<MdDelete />}
                                onClick={() => {
                                    props.onDelete()
                                    onClose()
                                }}
                                text='Delete'
                            >Delete</PlanPopoverButton>
                        </Flex>
                    </FocusLock>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

function PlanChart() {
    return (
        <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Area
                    isAnimationActive={false}
                    type='monotone'
                    dataKey='pv'
                    stroke='#50C878'
                    fill='#73d393'
                    strokeWidth={3}
                    opacity={0.75}
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

interface FModalProps extends PropsWithChildren {
    title: string
    onOKClick: () => void
    onClose: () => void
}

function FModal(props: FModalProps) {
    return (
        <Modal isOpen={true} onClose={props.onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader 
                    fontWeight='normal' 
                    fontFamily='Manrope' 
                    fontSize='2xl'
                >{props.title}</ModalHeader>

                <ModalBody>
                    {props.children}
                </ModalBody>

                <ModalCloseButton onClick={props.onClose} />

                <ModalFooter>
                    <Flex gap='12px'>
                        <Button variant='ghost' height='36px' onClick={props.onClose}>Cancel</Button>

                        <Button color='white' background='buttonPrimary' height='36px' onClick={props.onOKClick}>
                            OK
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

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
        <FModal title='Rename' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Input {...register('inputValue', { required: true })} />
        </FModal>
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
        <FModal title='Edit Description' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Input {...register('description', { required: true })} />
        </FModal>
    )
}

function DeletePlanModal(props: ModalProps) {
    const dispatch = useAppDispatch()

    function OKClickHandler(): void {
        dispatch(plansActions.removePlan(props.plan.id))

        props.onClose()
    }

    return (
        <FModal title='Delete Plan' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Text>{`Are you sure you want to delete ${props.plan.name}? This cannot be undone.`}</Text>
        </FModal>
    )
}


interface PlanFavoriteButtonProps {
    plan: Plan
}

function PlanFavoriteButton(props: PlanFavoriteButtonProps) {

    const dispatch = useAppDispatch()

    const yetToFavoriteIcon = <MdStarOutline color='#c5c5c5' size={25} />
    const hasFavoritedIcon = <MdStar color='#feba4f' size={25} />

    const [hasFavorited, setHasFavorited] = useState(props.plan.isFavorite)

    useEffect(() => {
        dispatch(plansActions.editPlan(
            { id: props.plan.id, partialState: { isFavorite: hasFavorited } }
        ))
    }, [hasFavorited])

    function favoriteButtonClickHandler(): void {
        setHasFavorited(prevHasFavorited => !prevHasFavorited)
    }

    return (
        <IconButton
            aria-label='Favorite'
            _hover={{ background: 'gray.100' }}
            _active={{ background: 'gray.200' }}
            icon={hasFavorited ? hasFavoritedIcon : yetToFavoriteIcon}
            onClick={favoriteButtonClickHandler}
            marginLeft='auto'
        />
    )
}

interface PlanCardProps {
    plan: Plan
    onEditDescription: (plan: Plan) => void
    onRename: (plan: Plan) => void
    onDuplicate: (plan: Plan) => void
    onDelete: (plan: Plan) => void
}

function PlanCard(props: PlanCardProps) {

    const options: Intl.DateTimeFormatOptions = { 
        month: 'short',
        day: 'numeric', 
        year: 'numeric' 
    }
    
    const formattedCreationDate = new Date(props.plan.creationDate).toLocaleString('en-US', options)

    const showDescriptionBadge = props.plan.description && props.plan.description.trim().length > 0 

    return (
        <Card
            alignSelf='flex-start'
            flexDirection='column'
            overflow='clip'
            minWidth='0px'
        >
            <Box height='240px' position='relative'>         
                <PlanChart />

                <Flex
                    position='absolute'
                    top='0'
                    right='0'
                    marginRight='8px'
                    height='40px'
                    borderRadius='0px'
                    alignItems='center'
                >
                    {showDescriptionBadge && <PlanDescriptionBadge description={props.plan.description ?? ''} />}

                    <PlanOptionsBadge
                        onEditDescription={() => props.onEditDescription(props.plan)}
                        onRename={() => props.onRename(props.plan)}
                        onDuplicate={() => props.onDuplicate(props.plan)} 
                        onDelete={() => props.onDelete(props.plan)}
                    />
                </Flex>
            </Box>

            <Flex 
                padding='16px' 
                gap='8px' 
                alignItems='center' 
                borderTop='1px solid #e1e1dc'
            >
                <Flex flexDirection='column' minWidth='0px'>
                    <Text 
                        fontSize='lg' 
                        textOverflow='ellipsis' 
                        overflow='hidden' 
                        whiteSpace='nowrap'
                    >{props.plan.name}</Text>
                    
                    <Text color='rgb(22, 135, 94)'  fontSize='sm'>{formattedCreationDate}</Text>
                </Flex>

                <PlanFavoriteButton key={props.plan.id} plan={props.plan} />
            </Flex>
        </Card>
    )
}

type Context = { data: Plan, type: 'rename' | 'editDescription' | 'delete' }

interface PlansPageProps {
    onAddPlanClick: () => void
}

export default function PlansPage(props: PlansPageProps) {
    const dispatch = useAppDispatch()

    const [context, setContext] = useState<Context | null>()
    const [viewStarred, setViewStarred] = useState(false)

    const plans = useAppSelector(state => viewStarred ? state.plans.plans.filter(plan => plan.isFavorite) : state.plans.plans)

    function addPlanClickHandler(): void {
        const plan: Plan = {
            id: generatePlanId(),
            name: `Plan ${plans.length}`,
            creationDate: new Date(2002, 0, 9).toISOString(),
            isFavorite: false
        }

        dispatch(plansActions.addPlan(plan))

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
