import { DashboardProps, MenuHandler } from '../Dashboard'
import { Flex, Text, TabList, Tab, Tabs, Box, Button, IconButton, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdAdd, MdArrowForwardIos, MdCompare, MdCompareArrows, MdLabel, MdMail, MdMoreVert, MdStar, MdStarOutline } from 'react-icons/md'
import Divider from '../../ui/new/Divider'

interface ProfileCardProps {
    label: string
    text: string
    icon: JSX.Element
}

function ProfileCard(props: ProfileCardProps): JSX.Element {
    const [isHovered, setIsHovered] = useState(false)

    function mouseEnterHandler(): void {
        setIsHovered(true)
    }

    function mouseLeaveHandler(): void {
        setIsHovered(false)
    }

    return (
        <Flex
            flexDirection='row'
            padding='24px'
            border='1px solid #e1e1dc'
            borderRadius='2xl'
            alignItems='center'
            maxWidth='500px'
            minWidth='0'
            _hover={{ borderColor: 'black' }}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <Flex
                width='50px'
                height='50px'
                background='rgba(22, 135, 94, 0.08)'
                borderRadius='999px'
                alignItems='center'
                justifyContent='center'
            >
                {props.icon}
            </Flex>

            <Flex flexDirection='column' marginLeft='16px'>
                <Text fontSize='md'>{props.label}</Text>
                <Text fontSize='sm' color='gray'>{props.text}</Text>
            </Flex>

            <Box marginLeft='auto' transform={isHovered ? 'translateX(5px)' : ''} transition='transform 0.2s ease-in-out'>
                <MdArrowForwardIos />
            </Box>
        </Flex>
    )
}

interface PlanRatingBadgeProps {
    rating: PlanRating
}

function PlanRatingBadge(props: PlanRatingBadgeProps): JSX.Element {
    return (
        <Flex
            position='absolute'
            background={getRatingBadgeColor(props.rating)}
            width='25px'
            height='25px'
            margin='12px'
            fontFamily='manrope'
            alignItems='center'
            justifyContent='center'
            fontSize='12px'
            borderRadius='lg'
        >
            {props.rating}
        </Flex>
    )
}

type PlanRating = 'A+' | 'A' | 'B' | 'B-' | 'C' | 'F'

export interface Plan {
    id: string
    name: string
    creationDate: Date
    rating: PlanRating
}

interface PlanProps {
    plan: Plan
    onDeletePlan: (plan: Plan) => void
}

function getRatingBadgeColor(rating: PlanRating): string {
    switch (rating) {
        case 'A+':
        case 'A':
            return 'lightgreen'
        case 'B':
        case 'B-':
            return 'orange'
        case 'C':
            return 'yellow'
        case 'F':
            return 'red'
    }
}

function Plan(props: PlanProps): JSX.Element {

    const yetToFavoriteIcon = <MdStarOutline color='#c5c5c5' size={25} />
    const hasFavoritedIcon = <MdStar color='#feba4f' size={25} />

    const [favoriteButtonIcon, setFavoriteIcon] = useState(yetToFavoriteIcon)
    const [hasFavorited, setHasFavorited] = useState(false)

    const options: Intl.DateTimeFormatOptions = { 
        month: 'short',
        day: 'numeric', 
        year: 'numeric' 
    }
    
    const formattedCreationDate = props.plan.creationDate.toLocaleString('en-US', options)

    useEffect(() => {
        if (hasFavorited) {
            setFavoriteIcon(hasFavoritedIcon)
        } else {
            setFavoriteIcon(yetToFavoriteIcon)
        }
    }, [hasFavorited])

    function favoriteButtonClickHandler(): void {
        setHasFavorited(prevHasFavorited => !prevHasFavorited)
    }

    return (
        <Box
            alignSelf='flex-start'
            borderRadius='md'
            overflow='clip'
            border='1px solid #e1e1dc'
            _hover={{ shadow: 'md' }}
            width='100%'
        >
            <Box 
                height='240px' 
                background='white' 
                position='relative' 
            >
                <Flex 
                    position='absolute'
                    width='100%'
                    background='white'
                    height='40px'
                    borderRadius='0px'
                    alignItems='center'
                >
                    <PlanRatingBadge rating={props.plan.rating} />

                    <IconButton
                        marginLeft='auto'
                        background='white'
                        icon={<MdMoreVert size={20} />}
                        aria-label='Options'
                        width='30px'
                        height='30px'
                        minWidth='0px'
                        minHeight='0px'
                        marginRight='8px'
                        borderRadius='999px'
                        onClick={() => props.onDeletePlan(props.plan)}
                    />
                </Flex>
            </Box>

            <Flex 
                padding='16px' 
                gap='8px' 
                alignItems='center' 
                borderTop='1px solid #e1e1dc'
            >
                <Flex flexDirection='column'>
                    <Text fontSize='lg'>{props.plan.name}</Text>
                    <Text color='rgb(22, 135, 94)'  fontSize='sm'>{formattedCreationDate}</Text>
                </Flex>

                <IconButton
                    marginLeft='auto'
                    aria-label='Favorite'
                    background='transparent'
                    icon={favoriteButtonIcon}
                    onClick={favoriteButtonClickHandler}
                />
            </Flex>
        </Box>
    )
}

export default function Settings(props: DashboardProps): JSX.Element {

    const [plans, setPlans] = useState<Plan[]>([])

    function addPlanClickHandler(): void {
        const id = URL.createObjectURL(new Blob([])).slice(-36)

        console.log(id)

        const plan: Plan = {
            id: id,
            name: `Plan ${plans.length}`,
            creationDate: new Date(2002, 0, 9),
            rating: 'A'
        }

        setPlans(prevPlans => [...prevPlans, plan])

        MenuHandler.addPlan(plan)
    }

    function deletePlanClickHandler(plan: Plan): void {
        setPlans(prevPlans => prevPlans.filter(_plan => _plan.id !== plan.id))

        MenuHandler.removePlan(plan)
    }

    return (
        <Flex 
            padding='48px'
            flexDirection='column' 
            width='100%'
        >
            <Text fontSize='3xl' fontFamily='manrope'>Home</Text>

            <Flex flexDirection='column'>
                <Flex 
                    marginTop='48px' 
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
                            background='#0d3f4a'
                            onClick={addPlanClickHandler}
                        >Add</Button>

                        <Button
                            leftIcon={<MdCompareArrows color='black' size={20} />}
                            marginLeft='auto'
                            alignSelf='flex-end'
                            border='1px solid #e1e1dc'
                            background='white'
                            color='black'
                        >Compare</Button>
                    </Flex>
                </Flex>

                <Divider />
            </Flex>

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
                    <Plan 
                        key={index} 
                        onDeletePlan={deletePlanClickHandler} 
                        plan={plan} 
                    />
                ))}
            </Grid>
        </Flex>
    )
}
