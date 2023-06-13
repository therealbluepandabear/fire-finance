import { Box, Button, Flex, HTMLChakraProps, Text } from '@chakra-ui/react'
import { PropsWithChildren, useState } from 'react'

interface DisplayProps<T extends MenuItem | SubMenuItem> { 
    isSelected: boolean
    item: T
    textColor: string
    onClick: () => void
}

function MenuItemButton({ children, ...props }: HTMLChakraProps<'button'> & PropsWithChildren): JSX.Element {
    return (
        <Button
            flexDirection='row'
            justifyContent='flex-start'
            paddingStart='16px'
            minHeight='35px'
            height='35px'
            borderRadius='0px'
            {...props}
        >
            {children}
        </Button>
    )
}

function MenuItemDisplay(props: MenuProps & DisplayProps<MenuItem>): JSX.Element {
    return (
        <MenuItemButton
            background={props.isSelected ? 'lightBlue' : 'transparent'}
            onClick={props.onClick}
            textColor={props.textColor}
        >
            {props.item.leftContent}

            {props.isOpen && (
                <Text 
                    fontSize='16px' 
                    paddingStart='16px'
                    fontWeight='bold'
                >{props.item.label}</Text>
            )}
        </MenuItemButton>
    )
}

function SubMenuItemDisplay(props: MenuProps & DisplayProps<SubMenuItem>): JSX.Element {
    return (
        <MenuItemButton
            background={props.isSelected ? 'lightBlue' : 'transparent'}
            onClick={props.onClick}
            textColor={props.textColor}
        >{props.item.label}</MenuItemButton>
    )
}

type MenuItemGroupDock = 'top' | 'bottom'

export interface MenuItemGroup {
    menuItems: MenuItem[]
    dock: MenuItemGroupDock
    background: string
    textColor: string
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
    menuItemGroups: MenuItemGroup[]
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
            shadow='md' 
            overflowY='auto'
            sx={
                {
                    '::-webkit-scrollbar': {
                        width: '8px'
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: 'lightgray'
                    }
                }
            }
            width={props.isOpen ? '294px' : 'auto'}
            flexDirection='column'
            background='#fbf7f0'
        >
            {[
                props.menuItemGroups.filter(menuItemGroup => menuItemGroup.dock === 'top'), 
                props.menuItemGroups.filter(menuItemGroup => menuItemGroup.dock === 'bottom')
            ].map(((menuItemGroup, tupleIndex) => (
                <Flex 
                    justifySelf={tupleIndex === 0 ? 'flex-start' : ''} 
                    marginTop={tupleIndex === 1 ? 'auto' : ''} 
                    width='100%'
                >
                    {menuItemGroup.map((menuItemGroup, index) => (
                        <Flex
                            key={index}
                            flexDirection='column'
                            width='100%'
                            background={menuItemGroup.background}
                        >
                            {menuItemGroup.menuItems.map((menuItem, index) => {
                                return (
                                    <>
                                        <MenuItemDisplay
                                            textColor={menuItemGroup.textColor}
                                            key={index}
                                            isSelected={selectedItem === menuItem}
                                            item={menuItem}
                                            onClick={() => itemClickHandler(menuItem)}
                                            {...props}
                                        />

                                        {props.isOpen && openMenuItems.includes(menuItem) && (
                                            <Flex>
                                                <Box opacity={0} paddingStart='16px'>
                                                    {menuItem.leftContent}
                                                </Box>

                                                <Flex flexDirection='column' width='100%'>
                                                    {menuItem.subMenuItems && menuItem.subMenuItems.map((subMenuItem, index) => (
                                                        <SubMenuItemDisplay
                                                            textColor={menuItemGroup.textColor}
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
                    ))}
                </Flex>
            )))}
        </Flex>
    )
}