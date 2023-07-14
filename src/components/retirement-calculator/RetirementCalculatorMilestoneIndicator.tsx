import { Box } from '@chakra-ui/react'
import { MdFlag, MdBeachAccess } from 'react-icons/md'
import {  PropsWithChildren } from 'react'
import { motion } from 'framer-motion'


type MilestoneType = 'financial-independence' | 'retirement'


interface CircleProps extends PropsWithChildren {
    type: MilestoneType
}

function Circle(props: CircleProps) {
    return (
        <Box 
            width="20px" 
            height="20px" 
            borderRadius="30px" 
            background={props.type === 'financial-independence' ? 'lightblue' : 'lightgreen'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            transform="scale(2)"
            pointerEvents="none"
        >
            {props.children}
        </Box>
    )
}


interface RetirementCalculatorMilestoneIndicatorProps {
    type: MilestoneType
    cx: number
    cy: number
}

export default function RetirementCalculatorMilestoneIndicator(props: RetirementCalculatorMilestoneIndicatorProps) {
    const left = props.cx - 10
    const top = (props.cy - 10) - 40

    return (
        <>
            <motion.div
                animate={{
                    opacity: [1, 0],
                    scale: [1, 1.8]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeOut',
                    repeatDelay: -1.3
                }}
                style={{
                    position: 'absolute',
                    left: left,
                    top: top
                }}
            >
                <Box>
                    <Circle type={props.type} />
                </Box>
            </motion.div>

            <Box
                position="absolute"
                left={left}
                top={top}
            >
                <Circle type={props.type}>
                    {props.type === 'financial-independence' ? <MdFlag /> : <MdBeachAccess />}
                </Circle>
            </Box>
        </>
    )
}