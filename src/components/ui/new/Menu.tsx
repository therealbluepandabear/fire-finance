import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'

interface DisplayProps<T extends MenuItem | SubMenuItem> { 
    isSelected: boolean,
    item: T,
    onClick: () => void
}

function MenuItemDisplay(props: MenuProps & DisplayProps<MenuItem>): JSX.Element {

    return (
        <Button
            background={props.isSelected ? 'lightBlue' : 'transparent'}
            flexDirection='row'
            justifyContent='flex-start'
            paddingStart='16px'
            onClick={props.onClick}
        >
            {props.item.leftContent}

            {props.isOpen && (
                <Text 
                    fontSize='md' 
                    paddingStart='16px'
                >{props.item.label}</Text>
            )}
        </Button>
    )
}

function SubMenuItemDisplay(props: MenuProps & DisplayProps<SubMenuItem>): JSX.Element {

    return (
        <Button
            background={props.isSelected ? 'lightBlue' : 'transparent'}
            borderRadius='0px'
            justifyContent='flex-start'
            onClick={props.onClick}
        >{props.item.label}</Button>
    )
}

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
    // If a particular menu item is open it means the 
    // sub items of that menu item are showing
    const [openMenuItems, setOpenMenuItems] = useState<MenuItem[]>([])
    const [selectedItem, setSelectedItem] = useState<(MenuItem | SubMenuItem) | null>(null)

    function itemClickHandler(item: MenuItem | SubMenuItem): void {
        props.onItemClick(item)

        const isMenuItem = 'leftContent' in item

        if ((isMenuItem && !item.subMenuItems) || !isMenuItem) {
            setSelectedItem(item)
        }

        if (isMenuItem && item.subMenuItems) {
            if (!openMenuItems.includes(item)) {
                setOpenMenuItems((prevOpenMenuItems) => [...prevOpenMenuItems, item])
            } else {
                setOpenMenuItems(openMenuItems.filter(menuItems => menuItems !== item))
            }
        } 
    }

    return (
        <Flex
            flexDirection='column'
            shadow='md'
        >
            <Flex flexDirection='column'>
                {props.menuItems.map((menuItem, index) => {
                    return (
                        <>
                            <MenuItemDisplay 
                                key={index}
                                isSelected={selectedItem?.label === menuItem.label}
                                item={menuItem} 
                                onClick={() => itemClickHandler(menuItem)} 
                                {...props} 
                            />

                            {props.isOpen && openMenuItems.includes(menuItem) && (
                                <Flex flexDirection='row'>
                                    <Box opacity={0} paddingStart='16px'>
                                        {menuItem.leftContent}
                                    </Box>

                                    <Flex flexDirection='column' width='100%'>
                                        {menuItem.subMenuItems && menuItem.subMenuItems.map((subMenuItem, index) => (
                                            <SubMenuItemDisplay 
                                                key={index}
                                                isSelected={selectedItem === subMenuItem}
                                                item={subMenuItem} 
                                                onClick={() => itemClickHandler(subMenuItem)}
                                                {...props} 
                                            />
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