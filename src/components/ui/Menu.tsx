import { Box, Button, Flex, HTMLChakraProps, Text, Popover, PopoverTrigger, PopoverContent, PopoverBody, useBreakpointValue, IconButton, useMediaQuery, ModalOverlay, Portal } from '@chakra-ui/react';
import { useState } from 'react'
import ScrollableBox from './ScrollableBox'
import { AnimatePresence, motion } from 'framer-motion'
import { MdArrowForwardIos, MdArrowRight, MdExpandLess, MdExpandMore } from 'react-icons/md'

interface MenuItemDisplayProps { 
    item: MenuItem
    isExpanded: boolean
    isSelected: boolean
    isSubItemSelected?: boolean
    areSubItemsOpened?: boolean
    isSubItem?: boolean
    onClick: (wasExpandDexpand: boolean) => void
} 

type MenuItemIconProps = MenuItemDisplayProps & { hoverColor: string, activeColor: string }

function MenuItemIcon(props: MenuItemIconProps) {
    return (
        <Box
            padding='16px'
            color={props.isSelected ? '#1a73e8' : ''}
            background={!props.isExpanded && props.isSelected ? 'pastelPrimary' : 'transparent'}
            borderRadius='999px'
            _hover={{ background: !props.isExpanded ? props.hoverColor : '' }}
            _active={{ background: !props.isExpanded ? props.activeColor : '' }}
        >
            {props.item.leftContent}
        </Box>
    )
}

type SubMenuIndicatorProps = Pick<MenuItemDisplayProps, 'areSubItemsOpened' | 'isSelected'> & { onClick: () => void }

function SubMenuIndicator(props: SubMenuIndicatorProps) {
    return (
        <Box
            cursor='pointer'
            onClick={props.onClick}
            marginLeft='auto'
            color={props.isSelected ? 'buttonPrimary' : 'black'}
        >
            <motion.div
                initial={{ rotate: 0 }}
                transition={{ duration: 0.1 }}
                animate={{ rotate: props.areSubItemsOpened ? 180 : 0 }}
                transformTemplate={({ rotate }) => `rotate(${rotate})`}
            >
                <MdExpandMore size={22} />
            </motion.div>
        </Box>
    )
}

function MenuItemDisplay(props: MenuItemDisplayProps) {
    let hoverColor = 'blue.100'
    let activeColor = 'blue.200'

    if (!props.isSelected) {
        hoverColor = 'gray.50'
        activeColor = 'gray.200'
    }    

    const [hoverSupported] = useMediaQuery('(hover: Hover)')

    return (  
        <Flex position='relative' width='100%' alignItems='center'>
            <Flex
                alignItems='center'
                as='button'
                userSelect='none'
                _hover={{ background: hoverSupported && (props.isExpanded ? hoverColor : '') }}
                _active={{ background: props.isExpanded ? activeColor : '' }}
                transition='background 0.3s'
                onClick={() => props.onClick(false)}
                borderRadius={props.isExpanded ? '0px' : '999px'}
                padding='16px'
                borderEndRadius='999px'
                background={(props.isExpanded && props.isSelected && !props.isSubItemSelected) ? 'pastelPrimary' : ''}
                height='52px'
                width='100%'
                paddingLeft={props.isSubItem ? '42px' : ''}
            >
                <MenuItemIcon hoverColor={hoverColor} activeColor={activeColor} {...props} />

                {props.isExpanded && (
                    <Text
                        letterSpacing='0.3px'
                        fontSize='17px'
                        paddingStart={{ base: '0px', md: '8px' }}
                        color={props.isSelected ? 'pastelForeground' : ''}
                        fontFamily='Manrope'
                    >{props.item.label}</Text>
                )}
            </Flex>
            
            <Flex 
                alignItems='center'
                right='0'
                position='absolute'
                marginRight='16px'
            >
                {props.item.subItems && props.isExpanded && (
                    <SubMenuIndicator 
                        areSubItemsOpened={props.areSubItemsOpened} 
                        isSelected={props.isSelected} 
                        onClick={() => props.onClick(true)}
                    />
                )}
            </Flex>
        </Flex>
    )
}

interface MenuOverlayProps {
    isOpen: boolean
    onClick: () => void
}

export function MenuOverlay(props: MenuOverlayProps) {
    return (
        <Flex
            display={{ base: props.isOpen ? 'block' : 'none', md: 'none' }}
            onClick={props.onClick}
            position='fixed'
            top='0'
            left='0'
            width='100vw'
            height='100vh'
            background='black'
            opacity={0.48}
            zIndex='998'
        />
    )
}

export interface MenuItemGroup {
    menuItems: MenuItem[]
}

export type MenuSubItem = Omit<MenuItem, 'subItems'>

export interface MenuItem {
    leftContent: JSX.Element
    label: string
    subItems?: MenuSubItem[]
}

interface MenuProps {
    isOpen: boolean
    onItemClick: (item: MenuItem | MenuSubItem) => void
    menuItems: MenuItem[]
}

export default function Menu(props: MenuProps) {
    const isOpenMenuItemDisplay = useBreakpointValue({ base: true, md: props.isOpen })

    const [selectedItem, setSelectedItem] = useState<MenuItem | MenuSubItem>(props.menuItems[0])
    const [expandedItems, setExpandedItems] = useState<MenuItem[]>([])

    function itemClickHandler(item: MenuItem | MenuSubItem, wasExpandDexpand: boolean): void {
        if ('subItems' in item && item.subItems && wasExpandDexpand) {
            setExpandedItems(prevExpandedItems => {
                if (!prevExpandedItems.some(expandedItem => expandedItem.label === expandedItem.label)) {
                    return [...prevExpandedItems, item]
                } 

                return prevExpandedItems.filter(expandedItem => expandedItem.label !== item.label)
            })
        } else {
            props.onItemClick(item)

            setSelectedItem(item)
        }
    }

    function isMenuSubItemSelected(menuItem: MenuItem): boolean {
        return props.menuItems.some(item => item.subItems && item.subItems.some(subItem => subItem.label === selectedItem.label) && item.label === menuItem.label)
    }

    function shouldShowSubItems(menuItem: MenuItem): boolean {
        return props.isOpen && menuItem.subItems !== undefined && expandedItems.some(expandedItem => expandedItem.label === menuItem.label)
    }

    return (
        <>
            <ScrollableBox
                background='white'
                zIndex='999'
                minWidth={{ base: '310px', md: props.isOpen ? '310px' : '85px' }}
                width={{ base: '310px', md: props.isOpen ? '310px' : '85px' }}
                flexDirection='column'
                position={{ base: 'absolute', md: 'static' }}
                height='100%'
                paddingTop={{ base: '0px', md: '16px' }}
                shadow={{ base: 'md', md: 'none' }}
                top='0'
                transition={{ base: `transform 0.26s ease-out`, md: `width 0.26s, min-width 0.26s` }}
                transform={{ base: `translateX(${props.isOpen ? '0%' : '-100%'})`, md: 'translateX(0)' }}            
                borderRight='1px solid #f0f0ed'
            >  
                <Flex 
                    height='76px' 
                    marginBottom='16px' 
                    borderBottom='1px solid #e1e1dc' 
                    alignItems='center'
                    paddingStart='36px'
                    display={{ base: 'flex', md: 'none' }}
                >
                    <Text fontSize='xl' fontFamily='manrope'>FireFinance</Text>
                </Flex> 

                {props.menuItems.map((menuItem, index) => (
                    <>
                        <MenuItemDisplay
                            key={index}
                            isSelected={selectedItem.label === menuItem.label}
                            item={menuItem}
                            onClick={(wasExpandDexpand) => itemClickHandler(menuItem, wasExpandDexpand)}
                            isExpanded={isOpenMenuItemDisplay ?? props.isOpen}
                            areSubItemsOpened={expandedItems.some(expandedItem => expandedItem.label === expandedItem.label)}
                            isSubItemSelected={isMenuSubItemSelected(menuItem)}
                            {...props}
                        />

                        {shouldShowSubItems(menuItem) && menuItem.subItems!!.map(subItem => (
                            <MenuItemDisplay
                                key={index}
                                isSelected={selectedItem.label === subItem.label}
                                item={subItem}
                                onClick={(wasExpandDexpand) => itemClickHandler(subItem, wasExpandDexpand)}
                                isExpanded={isOpenMenuItemDisplay ?? props.isOpen}
                                isSubItem={true}
                                {...props}
                            />
                        ))}
                    </>
                ))}
            </ScrollableBox>
        </>
    )
}