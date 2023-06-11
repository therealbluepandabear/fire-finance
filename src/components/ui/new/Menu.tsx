import { Button, Flex, Text } from '@chakra-ui/react'
import { MenuItemProps } from './MenuItem'
import { motion } from 'framer-motion'
import { Children, PropsWithChildren, ReactElement } from 'react'

interface MenuProps extends PropsWithChildren {
    isOpen: boolean
    onItemClick: (index: number) => void
}

export default function Menu(props: MenuProps): JSX.Element {

    function itemClickHandler(_index: number): void {
        props.onItemClick(_index)
    }

    return (
        <Flex
            height='100vh'
            flexDirection='column'
            shadow='md'
        >
            {props.children && Children.map(props.children as ReactElement<MenuItemProps>, (child, _index) => {
                return (
                    <Button 
                        borderRadius='0px' 
                        key={_index} 
                        onClick={() => itemClickHandler(_index)}
                        background='transparent'
                        justifyContent='flex-start'
                    >
                        <>
                            {child.props.icon}
                            {props.isOpen && (
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: 'auto' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Text fontSize='md' paddingLeft='8px'>{child.props.label}</Text>
                                </motion.div>
                            )}
                        </>
                    </Button>
                )
            })}
        </Flex>
    )
}