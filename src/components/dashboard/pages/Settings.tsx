import { DashboardProps } from '../Dashboard'
import { Flex, Text, TabList, Tab, Tabs, Box, Button, IconButton, Grid } from '@chakra-ui/react'
import { useState } from 'react'
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

interface Plan {
    name: string
    date: string
    rating: PlanRating
}

interface PlanProps {
    plan: Plan
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
                backgroundImage='https://i.imgur.com/0jkdIGA.png'
                backgroundPosition='bottom - 3'
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
                    <Text color='rgb(22, 135, 94)' fontSize='sm'>{props.plan.date}</Text>
                </Flex>

                <IconButton
                    marginLeft='auto'
                    aria-label='Favorite'
                    background='transparent'
                    icon={<MdStarOutline color='#c5c5c5' size={25} />}
                />
            </Flex>
        </Box>
    )
}

const plans: Plan[] = [
    { name: 'Plan 1', date: 'June 26', rating: 'A' },
    { name: 'Plan 2', date: 'June 27', rating: 'A+' },
    { name: 'Plan 3', date: 'June 28', rating: 'F' },
    { name: 'Plan 4', date: 'June 29', rating: 'B-' },
    { name: 'Plan 5', date: 'June 30', rating: 'B' },
    { name: 'Plan 5', date: 'June 30', rating: 'A' }
]

export default function Settings(props: DashboardProps): JSX.Element {
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
                {plans.map((plan, index) => <Plan key={index} plan={plan} />)}
            </Grid>
        </Flex>
    )
}
