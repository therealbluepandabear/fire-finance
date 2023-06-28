import { Box, Button, Flex, HTMLChakraProps, Text, Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react';
import { PropsWithChildren, useEffect, useState } from 'react'
import FScrollableBox from './FScrollableBox'

interface DisplayProps { 
    selectedItem: MenuItem
    item: MenuItem
    onClick: () => void
}

function MenuItemDisplay(props: FMenuProps & DisplayProps): JSX.Element {

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
            paddingStart='16px'
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
                    fontSize='md'
                    paddingStart='8px'
                    fontWeight='bold'
                    color={isSelectedItem ? '#1a73e8' : ''}
                >{props.item.label}</Text>
            )}
        </Button>
    )
}

export interface MenuItemGroup {
    menuItems: MenuItem[]
}

export interface MenuItem {
    leftContent: JSX.Element
    label: string
}

interface MenuItemSelection {
    selectedMenuItem: MenuItem
}

interface FMenuProps {
    isOpen: boolean
    onItemClick: (item: MenuItem) => void
    menuItems: MenuItem[]
}

export default function FMenu(props: FMenuProps): JSX.Element {

    const [selectedItem, setSelectedItem] = useState<MenuItem>(props.menuItems[0])

    function itemClickHandler(item: MenuItem): void {
        props.onItemClick(item)

        setSelectedItem(item)
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
                    <Box key={index}>
                        <MenuItemDisplay
                            selectedItem={selectedItem}
                            item={menuItem}
                            onClick={() => itemClickHandler(menuItem)}
                            {...props}
                        />
                    </Box>
                )
            })}
        </FScrollableBox>
    )
}