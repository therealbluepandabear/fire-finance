import { Box, Button, Flex, Grid, IconButton, Input, Select, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import FDivider from '../../ui/FDivider'
import { MdAutoGraph, MdCheck, MdChecklist, MdEdit, MdInfo, MdNotes, MdOutlineStickyNote2, MdPageview, MdStarOutline, MdStickyNote2 } from 'react-icons/md'
import FChips from '../../ui/FChips'
import FChip from '../../ui/FChip'
import FScrollableBox from '../../ui/FScrollableBox'
import { ChangeEvent, MouseEvent, useState } from 'react'

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

function PlanTitleInput(): JSX.Element {
    const startingPlanTitle = 'Untitled Plan'

    const [planTitleInputColor, setPlanTitleInputColor] = useState('gray')
    const [planTitle, setPlanTitle] = useState<string>(startingPlanTitle)

    function planTitleInputChangeHandler(e: ChangeEvent<HTMLInputElement>): void {
        setPlanTitleInputColor('black')
        setPlanTitle(e.target.value)
    }

    function planTitleInputClickHandler(e: MouseEvent<HTMLInputElement>): void {
        e.currentTarget.select()
    }

    function planTitleInputBlurHandler(): void {
        if (planTitle.trim().length === 0) {
            setPlanTitleInputColor('gray')
            setPlanTitle(startingPlanTitle)
        }
    }

    return (
        <Input
            fontFamily='Manrope'
            fontSize='3xl'
            padding='0'
            color={planTitleInputColor}
            margin=''
            border='1px solid transparent'
            _hover={{ border: `1px solid gray` }}
            value={planTitle}
            onChange={planTitleInputChangeHandler}
            onClick={planTitleInputClickHandler}
            onBlur={planTitleInputBlurHandler}
            width='auto'
        />
    )
}

export default function PlanFormPage(): JSX.Element {



    return (
        <FScrollableBox 
            thickness='thick'
            paddingTop='48px' 
            width='100%' 
            overflowY='scroll'
            flexDirection='column'
        >
            <Flex 
                width='100%'
                paddingLeft='48px'
                minHeight='700px' 
                height='700px' 
                flexDirection='column' 
                borderBottom='1px solid #e1e1dc'
            >
                <Flex alignItems='center' gap='12px' paddingRight='48px'>
                    <PlanTitleInput />

                    <Flex
                        flexDirection='row'
                        marginLeft={{ base: '0px', xl: 'auto' }}
                        alignSelf={{ base: 'flex-start', xl: 'flex-end' }}
                        marginTop={{ base: '16px', xl: '0px' }}
                        gap='12px'
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <FChips onIndexChange={(a) => {} }>
                            <FChip>Overview</FChip>
                            <FChip>Notes</FChip>
                        </FChips>

                        <Button
                            leftIcon={<MdCheck color='white' size={20} />}
                            marginLeft='auto'
                            color='white'
                            background='buttonPrimary'
                        >Save</Button>
                    </Flex>
                </Flex>

                <Box marginTop='16px'>
                    <Box width='100%' height='1px' background='#e1e1dc' />
                </Box>

                <Flex flexGrow={1} minHeight='0'>
                    <Box width='1px' height='100%' background='#e1e1dc' />

                    <Flex 
                        width='100%'
                        padding='16px' 
                        background='#f0fbfe' 
                        paddingRight='48px'
                    >
                        <Flex 
                            width='100%' 
                            height='100%'
                            shadow='md' 
                            background='white'
                            borderRadius='md'
                            padding='16px'
                            flexDirection='column'
                        >
                            <Flex flexDirection='column' height='100%'>
                                <ResponsiveContainer>
                                    <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                        <Line
                                            type='monotone'
                                            isAnimationActive={false}
                                            dataKey='pv'
                                            stroke='#50C878'
                                            fill='#50C878'
                                            strokeWidth={3}
                                            opacity={0.75}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Flex 
                width='100%' 
                background='#f0fbfe' 
                paddingLeft='48px' 
                flexDirection='column'
                paddingTop='48px'
                paddingRight='48px'
                paddingBottom='48px'
            >
                <Flex
                    width='100%'
                    height='100%'
                    shadow='md'
                    borderRadius='md'
                    flexDirection='column'
                    background='white'
                >
                    <Table>
                        <Thead>
                            <Tr>
                                <Th textTransform='none' fontSize='md' fontWeight='bold' fontFamily='Manrope' color='black'>Name</Th>
                                <Th textTransform='none' fontSize='md' fontWeight='bold' fontFamily='Manrope' color='black'>UV</Th>
                                <Th textTransform='none' fontSize='md' fontWeight='bold' fontFamily='Manrope' color='black'>PV</Th>
                                <Th textTransform='none' fontSize='md' fontWeight='normal' fontFamily='Manrope' color='black'>Amount</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.uv}</Td>
                                    <Td>{item.pv}</Td>
                                    <Td>{item.amt}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Flex>
            </Flex>
        </FScrollableBox>
    )
}