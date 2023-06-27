import { Box, Button, Flex, HTMLChakraProps, Text, Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react';
import { PropsWithChildren, useEffect, useState } from 'react'
import FScrollableBox from './FScrollableBox'

interface DisplayProps<T extends MenuItem | SubMenuItem> { 
    selectedItem: MenuItemSelection | null
    item: T
    onClick: () => void
}

function MenuItemButtonBase({ children, ...props }: HTMLChakraProps<'button'> & PropsWithChildren): JSX.Element {
    return (
        <Button
            flexDirection='row'
            justifyContent='flex-start'
            paddingStart='16px'
            minHeight='42px'
            height='42px'
            borderRadius='0px'
            _hover={{ background: 'blue.100' }}
            _active={{ background: 'blue.200' }}
            width='100%'
            {...props}
        >
            {children}
        </Button>
    )
}

function MenuItemDisplay(props: FMenuProps & DisplayProps<MenuItem>): JSX.Element {
    
    const isSelectedItem = props.selectedItem?.selectedMenuItem.label === props.item.label

    return (
        <MenuItemButtonBase
            onClick={props.onClick}
            borderRadius={props.isOpen ? '0px' : '999px'}
            borderEndRadius='999px'
            background={props.isOpen && isSelectedItem ? 'pastelPrimary' : ''}
            height='52px'
        >
            <Box 
                padding='16px' 
                color={isSelectedItem ? '#1a73e8' : ''}
                background={!props.isOpen ? 'pastelPrimary' : 'transparent'} 
                borderRadius='999px'
            >
                {props.item.leftContent}
            </Box>

            {props.isOpen && (
                <Text
                    fontSize='md'
                    paddingStart='8px'
                    fontWeight='bold'
                    color={isSelectedItem ? '#1a73e8' : ''}
                >{props.item.label}</Text>
            )}
        </MenuItemButtonBase>
    )
}

function SubMenuItemDisplay(props: FMenuProps & DisplayProps<SubMenuItem>): JSX.Element {
    return (
        <MenuItemButtonBase onClick={props.onClick}>
            {props.item.label}
        </MenuItemButtonBase>
    )
}

export interface MenuItemGroup {
    menuItems: MenuItem[]
}

export interface SubMenuItem {
    label: string
}

export interface MenuItem {
    leftContent: JSX.Element
    label: string
    subMenuItems?: SubMenuItem[]
}

interface MenuItemSelection {
    selectedMenuItem: MenuItem
    selectedSubMenuItem?: SubMenuItem
}

interface FMenuProps {
    isOpen: boolean
    onItemClick: (item: MenuItem | SubMenuItem) => void
    menuItems: MenuItem[]
}

function findSubMenuItemParent(menuItems: MenuItem[], subMenuItem: SubMenuItem): MenuItem | undefined {
    return menuItems.find(menuItem => menuItem.subMenuItems && menuItem.subMenuItems.includes(subMenuItem))
}

export default function FMenu(props: FMenuProps): JSX.Element {
    // If a particular menu item is open it means the 
    // sub items of that menu item are showing
    const [openMenuItems, setOpenMenuItems] = useState<MenuItem[]>([])
    const [selectedItem, setSelectedItem] = useState<MenuItemSelection>({ selectedMenuItem: props.menuItems[0] })

    function itemClickHandler(item: MenuItem | SubMenuItem): void {
        props.onItemClick(item)

        const isMenuItem = 'leftContent' in item

        if (isMenuItem && !item.subMenuItems) {
            setSelectedItem({ selectedMenuItem: item })
        } else if (!isMenuItem) {
            const parentMenuItem = findSubMenuItemParent(props.menuItems, item)

            if (parentMenuItem) {
                setSelectedItem({ selectedMenuItem: parentMenuItem, selectedSubMenuItem: item })
            }
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
        <FScrollableBox 
            overflowY='auto'
            overflowX='hidden'
            zIndex='999'
            minWidth={{ base: '0px', md: props.isOpen ? '294px' : '68px' }}
            width={{ base: props.isOpen ? '294px' : '0px', md: props.isOpen ? '294px' : '68px' }}
            flexDirection='column'
            position={{ base: 'absolute', md: 'static' }}
            height='100%'
            paddingTop='16px'
            background='white'
            shadow={{ base: 'md', md: 'none' }}
        >   
            {props.menuItems.map((menuItem, index) => {
                return (
                    <>
                        <MenuItemDisplay
                            key={index}
                            selectedItem={selectedItem}
                            item={menuItem}
                            onClick={() => itemClickHandler(menuItem)}
                            {...props}
                        />

                        {props.isOpen && openMenuItems.includes(menuItem) && (
                            <Flex>
                                <Box opacity={0} borderRadius='999px'>
                                    {menuItem.leftContent}
                                </Box>

                                <Flex flexDirection='column' width='100%'>
                                    {menuItem.subMenuItems && menuItem.subMenuItems.map((subMenuItem, index) => (
                                        <SubMenuItemDisplay
                                            key={index}
                                            selectedItem={selectedItem}
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
        </FScrollableBox>
    )
}