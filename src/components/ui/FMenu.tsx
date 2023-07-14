import { Box, Button, Flex, HTMLChakraProps, Text, Popover, PopoverTrigger, PopoverContent, PopoverBody, useBreakpointValue } from '@chakra-ui/react';
import {  useState } from 'react'
import FScrollableBox from './FScrollableBox'
import { AnimatePresence, motion } from 'framer-motion'

interface DisplayProps { 
    selectedItem: MenuItem
    item: MenuItem
    onClick: () => void
}

function MenuItemDisplay(props: FMenuProps & DisplayProps) {

    const isSelectedItem = props.item.label === props.selectedItem.label

    let hoverColor = 'blue.100'
    let activeColor = 'blue.200'

    if (!isSelectedItem) {
        hoverColor = 'gray.100'
        activeColor = 'gray.200'
    }
    
    return (    
        <Button
            flexDirection='row'
            justifyContent='flex-start'
            paddingStart={{ base: '4px', md: '16px' }}
            variant='foo'
            _hover={{ background: props.isOpen ? hoverColor : '' }}
            _active={{ background: props.isOpen ? activeColor : '' }}
            width='100%'
            onClick={props.onClick}
            borderRadius={props.isOpen ? '0px' : '999px'}
            borderEndRadius='999px'
            background={props.isOpen && isSelectedItem ? 'pastelPrimary' : ''}
            height='52px'
        >
            <Box 
                padding='16px' 
                color={isSelectedItem ? '#1a73e8' : ''}
                background={!props.isOpen && isSelectedItem ? 'pastelPrimary' : 'transparent'} 
                borderRadius='999px'
                _hover={{ background: !props.isOpen ? hoverColor : '' }}
                _active={{ background: !props.isOpen ? activeColor : '' }}
            >
                {props.item.leftContent}
            </Box>

            {props.isOpen && (
                <Text
                    letterSpacing='0.3px'
                    fontSize='17px'
                    paddingStart={{ base: '0px', md: '8px' }}
                    color={isSelectedItem ? 'pastelForeground' : ''}
                    fontFamily='Manrope'
                >{props.item.label}</Text>
            )}
        </Button>
    )
}

export function MenuOverlay(props: { isOpen: boolean } & HTMLChakraProps<'div'>) {
    return (
        <Flex
            width='100%'
            height='100%'
            background='black'
            opacity={props.isOpen ? '0.48' : '0'}
            transition='opacity 0.3s, visibility 0.3s'
            position='absolute'
            top='0'
            zIndex='998'
            visibility={{ base: props.isOpen ? 'visible' : 'collapse', md: 'collapse' }}
            {...props}
        />
    )
}

export interface MenuItemGroup {
    menuItems: MenuItem[]
}

export interface MenuItem {
    leftContent: JSX.Element
    label: string
}

interface FMenuProps {
    isOpen: boolean
    onItemClick: (item: MenuItem) => void
    menuItems: MenuItem[]
}

export default function FMenu(props: FMenuProps) {

    const isOpenMenuItemDisplay = useBreakpointValue({ base: true, md: props.isOpen })

    const [selectedItem, setSelectedItem] = useState<MenuItem>(props.menuItems[0])

    function itemClickHandler(item: MenuItem): void {
        props.onItemClick(item)

        setSelectedItem(item)
    }

    return (
        <FScrollableBox
            background='white'
            overflowY='auto'
            overflowX='hidden'
            zIndex='999'
            minWidth={{ base: '294px', md: props.isOpen ? '294px' : '68px' }}
            width={{ base: '294px', md: props.isOpen ? '294px' : '68px' }}
            flexDirection='column'
            position={{ base: 'absolute', md: 'static' }}
            height='100%'
            paddingTop={{ base: '0px', md: '16px' }}
            shadow={{ base: 'md', md: 'none' }}
            top='0'
            transition={{ base: `transform 0.26s ease-out`, md: `width 0.25s, min-width 0.25s` }}
            transform={{ base: `translateX(${props.isOpen ? '0' : '-294'}px)`, md: 'translateX(0)' }}
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
                <MenuItemDisplay
                    key={index}
                    selectedItem={selectedItem}
                    item={menuItem}
                    onClick={() => itemClickHandler(menuItem)}
                    {...props}
                    isOpen={isOpenMenuItemDisplay ?? props.isOpen}
                />
            ))}
        </FScrollableBox>
    )
}