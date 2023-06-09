import { Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Children, cloneElement, PropsWithChildren, useState } from 'react'

interface MenuProps extends PropsWithChildren {
    isOpen: boolean
    onItemClick: (index: number) => void
}

export default function Menu({ isOpen, onItemClick, children }: MenuProps): JSX.Element {
    const menuWidth = isOpen ? 250 : 0
    const opacity = isOpen ? 1 : 0

    const [index, setIndex] = useState(0)

    function itemClickHandler(_index: number): void {
        onItemClick(_index)
        setIndex(_index)
    }
    
    return (
        <motion.div animate={{ width: `${menuWidth}px`, opacity: opacity }}>
            <Flex
                height='100vh'
                flexDirection='column'
                shadow='md'
            >
                {children && Children.map(children, (child: any, _index) => {
                    return cloneElement(child, {
                        key: _index,
                        onClick: () => itemClickHandler(_index),
                        background: _index === index ? 'lightgray' : ''
                    })
                })}
            </Flex>
        </motion.div>
    )
}