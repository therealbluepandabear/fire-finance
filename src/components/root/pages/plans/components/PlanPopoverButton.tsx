import { Button } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface PlanPopoverButtonProps extends PropsWithChildren {
    icon: JSX.Element
    text: string
    onClick: () => void
}

export default function PlanPopoverButton(props: PlanPopoverButtonProps) {
    return (
        <Button
            background='white'
            justifyContent='flex-start'
            leftIcon={props.icon}
            onClick={props.onClick}
            gap='8px'
            borderRadius='0'
            fontSize='md'
            height='45px'
        >{props.text}</Button>
    )
}