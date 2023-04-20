import { Box } from '@chakra-ui/react'
import { MdFlag, MdBeachAccess } from 'react-icons/md'
import {  PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

type MilestoneType = "financial-independence" | "retirement"

interface CircleProps extends PropsWithChildren {
    type: MilestoneType
}

function Circle(props: CircleProps): JSX.Element {
    const background = props.type === 'financial-independence' ? 'lightblue' : 'lightgreen'

    return (
        <Box 
            width="20px" 
            height="20px" 
            borderRadius="30px" 
            background={background}
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

interface RetirementMilestoneIndicatorProps {
    type: MilestoneType
    cx: number
    cy: number
}

export default function RetirementMilestoneIndicator(props: RetirementMilestoneIndicatorProps): JSX.Element {
    const left = props.cx - 10
    const top = (props.cy - 10) - 40

    return (
        <>
            <motion.div
                animate={{
                    opacity: [0.8, 0],
                    scale: [1, 1.85]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeOut'
                }}
                style={{
                    position: "absolute",
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
                    {props.type === "financial-independence" ? <MdFlag /> : <MdBeachAccess />}
                </Circle>
            </Box>
        </>
    )
}