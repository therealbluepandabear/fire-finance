import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export interface SubMenuItem {
    label: string
}

export interface MenuItem {
    leftContent: JSX.Element
    label: string
    subMenuItems?: SubMenuItem[]
}

interface MenuProps {
    isOpen: boolean
    onItemClick: (item: MenuItem | SubMenuItem) => void
    menuItems: MenuItem[]
}

export default function Menu(props: MenuProps): JSX.Element {
    const [subMenuItemsOpen, setSubMenuItemsOpen] = useState(false)

    function itemClickHandler(item: MenuItem | SubMenuItem): void {
        props.onItemClick(item)
    }

    return (
        <Flex
            height='100%'
            flexDirection='column'
            shadow='md'
        >
            {props.menuItems.map((menuItem, index) => {
                return (
                    <Flex flexDirection='row'>
                        <Box padding='8px'>
                            {menuItem.leftContent}
                        </Box> 

                        {props.isOpen && (
                            <Flex flexDirection='column' flexGrow={1}>
                                <Button
                                    borderRadius='0px'
                                    key={index}
                                    onClick={() => { 
                                        itemClickHandler(menuItem) 
                                        setSubMenuItemsOpen((prevSubMenuItemsOpen) => !prevSubMenuItemsOpen)
                                    }}
                                    background='transparent'
                                    justifyContent='flex-start'
                                >
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: 'auto' }}
                                        transition={{ duration: 0.2 }}
                                    >

                                        <Text fontSize='md' paddingLeft='8px'>{menuItem.label}</Text>
                                    </motion.div>
                                </Button>

                                {menuItem.subMenuItems && subMenuItemsOpen && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        transition={{ duration: 0.2 }}
                                        style={{ display: 'flex', flexDirection: 'column'}}
                                    >
                                        {menuItem.subMenuItems && menuItem.subMenuItems.map((subMenuItem, index) => (
                                            <Button 
                                                background='transparent' 
                                                borderRadius='0px' 
                                                onClick={() => {
                                                    itemClickHandler(subMenuItem)
                                                }}
                                            >
                                                <Text
                                                    key={index}
                                                    fontSize='sm'
                                                    paddingLeft='16px'
                                                >{subMenuItem.label}</Text>
                                            </Button>
                                        ))}
                                    </motion.div>
                                )}
                            </Flex>
                        )}
                    </Flex>
                )
            })}
        </Flex>
    )
}