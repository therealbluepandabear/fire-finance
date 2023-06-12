import { Box, Button, Flex } from '@chakra-ui/react'
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
        setSubMenuItemsOpen(prevSubMenuItemsOpen => !prevSubMenuItemsOpen)
    }

    return (
        <Flex
            height='100%'
            flexDirection='column'
            shadow='md'
        >
            <Flex flexDirection='column'>
                {props.menuItems.map((menuItem, index) => {
                    return (
                        <>
                            <Button 
                                key={index}
                                flexDirection='row' 
                                justifyContent='flex-start' 
                                paddingStart='16px'
                                onClick={() => {
                                    itemClickHandler(menuItem)
                                }}
                            >
                                {props.menuItems[0].leftContent}

                                {props.isOpen && (
                                    <Button>
                                        {menuItem.label}
                                    </Button>
                                )}
                            </Button>

                            {menuItem.subMenuItems && props.isOpen && subMenuItemsOpen && (
                                <Flex flexDirection='row'>
                                    <Box opacity={0} paddingStart='16px'>
                                        {props.menuItems[0].leftContent}
                                    </Box>

                                    <Flex flexDirection='column' width='100%'>
                                        {menuItem.subMenuItems.map((subMenuItem, index) => (
                                            <Button 
                                                key={index}
                                                background='transparent'
                                                borderRadius='0px'
                                                justifyContent='flex-start'
                                            >{subMenuItem.label}</Button>
                                        ))}
                                    </Flex>
                                </Flex>
                            )}
                        </>
                    )
                })}
            </Flex>
        </Flex>
    )
}