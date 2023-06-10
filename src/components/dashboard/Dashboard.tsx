import { Flex, Text, IconButton, Button, Box, Tabs, TabList, Tab, TabIndicator } from '@chakra-ui/react'
import { useState } from 'react'
import { MdArrowForwardIos, MdChecklist, MdElectricBolt, MdExplore, MdHelp, MdLabel, MdLightbulb, MdMail, MdMenu, MdPassword, MdPerson, MdSchool, MdSignpost, MdSpeed, MdStar, MdTune } from 'react-icons/md'
import { User } from '../../api'

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

interface DashboardProps {
    user: User
}

export default function Dashboard(props: DashboardProps): JSX.Element {
    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <Flex flexDirection='column' width='100%' height='100vh'>
            <Flex
                width='100%'
                height='76px'
                minHeight='76px'
                borderBottom='1px solid #e1e1dc'
                alignItems='center'
                paddingStart='16px'
                paddingEnd='36px'
            >
                <Flex
                    gap='16px'
                    alignItems='center'
                >
                    <IconButton
                        icon={<MdMenu size={25} />}
                        background='transparent'
                        aria-label='Menu'
                        borderRadius='999px'
                    />

                    <Text fontSize='2xl'>FireFinance</Text>
                </Flex>

                <Flex
                    marginLeft='auto'
                    gap='16px'
                    alignItems='center'
                >
                    <Button
                        height='49px'
                        background='transparent'
                        border='1px solid #e1e1dc'
                        leftIcon={<MdTune size={20} />}
                    >Assumptions</Button>

                    <Button
                        height='49px'
                        background='transparent'
                        border='1px solid #e1e1dc'
                        leftIcon={<MdPerson size={20} />}
                    >You</Button>
                </Flex>
            </Flex>

            <Flex flexGrow={1}>
                <Flex 
                    width='55px' 
                    background='#faf7f1' 
                    alignItems='center'
                    flexDirection='column'
                    paddingTop='8px'
                >
                    <IconButton
                        icon={<MdStar size={15} />}
                        color='rgb(129, 73, 34)'
                        background='rgba(255, 143, 67, 0.08)'
                        aria-label='???'
                        borderRadius='999px'
                    />

                    <Box width='23px' height='1px' background='rgba(22, 135, 94, 0.64)' />

                    <IconButton 
                        icon={<MdSpeed size={25} />}
                        background='transparent'
                        aria-label='???'
                    />

                    <IconButton
                        icon={<MdChecklist size={25} />}
                        background='transparent'
                        aria-label='???'
                    />

                    <IconButton
                        icon={<MdElectricBolt size={25} />}
                        background='transparent'
                        aria-label='???'
                    />

                    <IconButton
                        icon={<MdLightbulb size={25} />}
                        background='transparent'
                        aria-label='???'
                    />

                    <Flex 
                        flexDirection='column' 
                        marginTop='auto' 
                        background='rgb(10, 47, 56)'
                        width='100%'
                        alignItems='center'
                    >
                        <IconButton
                            icon={<MdSignpost size={25} />}
                            color='white'
                            background='transparent'
                            aria-label='???'
                        />

                        <IconButton
                            icon={<MdSchool size={25} />}
                            color='white'
                            background='transparent'
                            aria-label='???'
                        />

                        <IconButton
                            icon={<MdHelp size={25} />}
                            color='white'
                            background='transparent'
                            aria-label='???'
                        />

                        <IconButton 
                            icon={<MdExplore size={25} />}
                            color='white'
                            background='transparent'
                            aria-label='???'
                        />
                    </Flex>
                </Flex>

                <Flex flexGrow={1}>
                    <Flex padding='48px' flexDirection='column' width='100%'>
                        <Text fontSize='3xl'>Settings</Text>

                        <Tabs 
                            marginTop='16px' 
                            variant='unstyled' 
                            index={selectedTab} 
                            onChange={index => setSelectedTab(index)}
                        >
                            <TabList>
                                <Tab color={selectedTab === 0 ? 'black' : 'gray'}>My Account</Tab>
                                <Tab color={selectedTab === 1 ? 'black' : 'gray'}>Subscription</Tab>
                            </TabList>

                            <TabIndicator
                                height='2px'
                                background='rgb(255, 143, 67)'
                            />
                        </Tabs>

                        <Flex 
                            flexDirection='column' 
                            paddingTop='40px' 
                            gap='24px' 
                        >
                            <Text fontSize='xl'>Profile</Text>

                            <ProfileCard 
                                label='Your name' 
                                text='Tom' 
                                icon={<MdLabel color='rgb(22, 135, 94)' />} 
                            />
                            <ProfileCard 
                                label='Email' 
                                text={props.user.email}
                                icon={<MdMail color='rgb(22, 135, 94)' />} 
                            />
                            <ProfileCard 
                                label='Password' 
                                text={props.user.password}
                                icon={<MdPassword color='rgb(22, 135, 94)' />} 
                            />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}