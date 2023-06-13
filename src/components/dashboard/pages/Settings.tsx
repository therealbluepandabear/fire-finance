import { DashboardProps } from '../Dashboard'
import { Flex, Text, TabList, Tab, Tabs, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { MdArrowForwardIos, MdLabel, MdMail } from 'react-icons/md'

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

export default function Settings(props: DashboardProps): JSX.Element {
    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <Flex 
            padding='48px'
            flexDirection='column' 
            width='100%' 
            overflowY='scroll'
        >
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
            </Flex>
        </Flex>
    )
}
