import { DashboardProps } from '../Dashboard'
import { 
    Flex, 
    Text, 
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
    ModalCloseButton
} from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { 
    MdAdd, 
    MdChecklist, 
    MdContentCopy, 
    MdDelete, 
    MdDescription, 
    MdEdit, 
    MdMoreVert, 
    MdStar, 
    MdStarOutline 
} from 'react-icons/md'
import Divider from '../../ui/FDivider'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../store'
import { plansActions, Plan } from '../../../store/plans-slice'
import { generatePlanId } from '../../../utils'
import FScrollableBox from '../../ui/FScrollableBox'
import FChip from '../../ui/FChip'
import FChips from '../../ui/FChips'

interface PlanDescriptionBadgeProps {
    description: string
}

function PlanDescriptionBadge(props: PlanDescriptionBadgeProps): JSX.Element {

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
                    background='white'
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
                            maxWidth='300px' 
                            maxHeight='300px' 
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

function PlanPopoverButton(props: PlanPopoverButtonProps): JSX.Element {
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

function PlanOptionsBadge(props: PlanOptionsBadgeProps): JSX.Element {
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
                    background='white'
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

function PlanChart(): JSX.Element {
    return (
        <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Area
                    isAnimationActive={false}
                    type='monotone'
                    dataKey='pv'
                    stroke='#50C878'
                    fill='#50C878'
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

function FModal(props: FModalProps): JSX.Element {
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

function RenamePlanModal(props: ModalProps): JSX.Element {  
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

function EditDescriptionModal(props: ModalProps): JSX.Element {
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

function DeletePlanModal(props: ModalProps): JSX.Element {
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

function PlanFavoriteButton(props: PlanFavoriteButtonProps): JSX.Element {

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
            background='white'
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

function PlanCard(props: PlanCardProps): JSX.Element {

    const options: Intl.DateTimeFormatOptions = { 
        month: 'short',
        day: 'numeric', 
        year: 'numeric' 
    }
    
    const formattedCreationDate = new Date(props.plan.creationDate).toLocaleString('en-US', options)

    const showDescriptionBadge = props.plan.description && props.plan.description.trim().length > 0 

    return (
        <Box
            alignSelf='flex-start'
            borderRadius='md'
            overflow='clip'
            border='1px solid #e1e1dc'
            _hover={{ shadow: 'md' }}
            width='100%'
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
        </Box>
    )
}

type Context = { data: Plan, type: 'rename' | 'editDescription' | 'delete' }

export default function Settings(props: DashboardProps): JSX.Element {
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
        <>
            {context && context.type === 'rename' && <RenamePlanModal plan={context.data} onClose={onContextModalClose} />}
            {context && context.type === 'editDescription' && <EditDescriptionModal plan={context.data} onClose={onContextModalClose} />}
            {context && context.type === 'delete' && <DeletePlanModal plan={context.data} onClose={onContextModalClose} />}

            <Flex 
                padding={{ base: '24px', md: '48px' }}
                flexDirection='column' 
                width='100%'
                height='100%'
            >
                <Text fontSize='3xl' fontFamily='manrope'>Home</Text>

                <Flex flexDirection='column'>
                    <Flex 
                        marginTop={{ base: '24px', md: '48px' }}
                        flexDirection={{ base: 'column', xl: 'row' }}
                    >
                        <Flex flexDirection='column' gap='8px'>
                            <Text fontSize='2xl'>Plans</Text>
                            <Text fontSize='sm' maxWidth='700px' color='gray' textOverflow='ellipsis'>The purpose of a financial plan is to provide a clear framework for making informed financial decisions, optimizing cash flow, minimizing financial risks, and maximizing wealth accumulation over time.</Text>
                        </Flex>

                        <Flex 
                            flexDirection='row' 
                            marginLeft={{ base: '0px', xl: 'auto' }}
                            alignSelf={{ base: 'flex-start', xl: 'flex-end' }}
                            marginTop={{ base: '16px', xl: '0px' }}
                            gap='12px'
                        >
                            <Button
                                leftIcon={<MdAdd color='white' size={20} />}
                                marginLeft='auto'
                                color='white'
                                onClick={addPlanClickHandler}
                                background='buttonPrimary'
                            >Add</Button>

                            <FChips onIndexChange={chipIndexChangeHandler}>
                                <FChip icon={<MdChecklist size={20} />}>All Plans</FChip>
                                <FChip icon={<MdStarOutline size={20} />}>Starred</FChip>
                            </FChips>
                        </Flex>
                    </Flex>

                    <Divider />
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

                            <Flex flexDirection='column' gap='16px'>
                                <Text 
                                    fontFamily='manrope' 
                                    fontSize='3xl' 
                                    textAlign='center' 
                                    color='black'
                                >
                                    {viewStarred ? 'No starred plans' : 'No plans'}
                                </Text>
                                
                                <Text textAlign='center' color='gray'>
                                    {viewStarred ? 'You currently have no starred plans, star a plan to get started.' : `You currently have no plans, press 'Add' to get started on your journey.`}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </>
    )
}
