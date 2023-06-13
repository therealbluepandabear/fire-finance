import { Box, Button, Flex, HTMLChakraProps, Text } from '@chakra-ui/react'
import { PropsWithChildren, useState } from 'react'

interface DisplayProps<T extends MenuItem | SubMenuItem> { 
    selectedItem: MenuItemSelection | null
    item: T
    textColor: string
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
            {...props}
        >
            {children}
        </Button>
    )
}

const selectedColor = 'rgba(22, 135, 94, 0.64)'
const selectedBottomBorder = `1px solid ${selectedColor}`

function MenuItemDisplay(props: MenuProps & DisplayProps<MenuItem>): JSX.Element {
    return (
        <MenuItemButtonBase
            onClick={props.onClick}
            textColor={props.selectedItem?.selectedMenuItem === props.item ? selectedColor : props.textColor}
            borderBottom={props.selectedItem?.selectedMenuItem === props.item && !props.selectedItem?.selectedSubMenuItem ? selectedBottomBorder : ''}
            background='transparent'
        >
            {props.item.leftContent}

            {props.isOpen && (
                <Text 
                    fontSize='16px' 
                    paddingStart='16px'
                    fontWeight='bold'
                    textColor={props.textColor}
                >{props.item.label}</Text>
            )}
        </MenuItemButtonBase>
    )
}

function SubMenuItemDisplay(props: MenuProps & DisplayProps<SubMenuItem>): JSX.Element {
    return (
        <MenuItemButtonBase
            borderBottom={props.selectedItem?.selectedSubMenuItem === props.item ? selectedBottomBorder : ''}
            background='transparent'
            onClick={props.onClick}
            textColor={props.textColor}
        >
            {props.item.label}
        </MenuItemButtonBase>
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

interface MenuItemSelection {
    selectedMenuItem: MenuItem
    selectedSubMenuItem?: SubMenuItem
}

interface MenuProps {
    isOpen: boolean
    onItemClick: (item: MenuItem | SubMenuItem) => void
    menuItemGroups: MenuItemGroup[]
}

function findSubMenuItemParent(menuItemGroups: MenuItemGroup[], subMenuItem: SubMenuItem): MenuItem | undefined {
    const combinedMenuItems: MenuItem[] = menuItemGroups
        .map(menuItemGroup => menuItemGroup.menuItems)
        .flat()

    return combinedMenuItems
        .find(menuItem => menuItem.subMenuItems && menuItem.subMenuItems.includes(subMenuItem))
}

export default function Menu(props: MenuProps): JSX.Element {
    // If a particular menu item is open it means the 
    // sub items of that menu item are showing
    const [openMenuItems, setOpenMenuItems] = useState<MenuItem[]>([])
    const [selectedItem, setSelectedItem] = useState<MenuItemSelection | null>(null)

    function itemClickHandler(item: MenuItem | SubMenuItem): void {
        props.onItemClick(item)

        const isMenuItem = 'leftContent' in item

        if (isMenuItem && !item.subMenuItems) {
            setSelectedItem({ selectedMenuItem: item })
        } else if (!isMenuItem) {
            const parentMenuItem = findSubMenuItemParent(props.menuItemGroups, item)

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
            width={{ base: props.isOpen ? '294px' : '0px', md: props.isOpen ? '294px' : 'auto' }}
            flexDirection='column'
            background='#fbf7f0'
            position={{ base: 'absolute', md: 'static' }}
            height='100%'
        >
            {[
                props.menuItemGroups.filter(menuItemGroup => menuItemGroup.dock === 'top'), 
                props.menuItemGroups.filter(menuItemGroup => menuItemGroup.dock === 'bottom')
            ].map(((menuItemGroup, tupleIndex) => (
                <Flex 
                    justifySelf={tupleIndex === 0 ? 'flex-start' : ''} 
                    marginTop={tupleIndex === 1 ? 'auto' : ''} 
                    width='100%'
                    flexDirection='column'
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
                                            selectedItem={selectedItem}
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
                        </Flex>
                    ))}
                </Flex>
            )))}
        </Flex>
    )
}