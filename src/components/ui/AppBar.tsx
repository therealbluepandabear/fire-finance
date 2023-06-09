import { Button, Flex } from '@chakra-ui/react'
import { MdClose, MdMenu } from 'react-icons/md'

interface AppBarProps {
    title: string
    isMenuOpen: boolean
    onHamburgerClick: () => void
}

export default function AppBar(props: AppBarProps): JSX.Element {
    return (
        <Flex height='50px' alignItems='center' gap='8px' shadow='md'>
            <Button
                width='50px'
                height='50px'
                borderRadius='0'
                background='transparent'
                onClick={() => {
                    props.onHamburgerClick()
                }}
            >
                {props.isMenuOpen ? <MdClose size={25} /> : <MdMenu size={25} />}
            </Button>

            {props.title}
        </Flex>
    )
}