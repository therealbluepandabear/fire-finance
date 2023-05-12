import { Flex, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import { Children, PropsWithChildren, cloneElement, useState } from 'react'

interface ChipsProps extends PropsWithChildren<HTMLChakraProps<'div'>> {
    onIndexChange: (index: number) => void
    defaultIndex?: number
}

export default function Chips({ onIndexChange, children, defaultIndex, ...props }: ChipsProps): JSX.Element {
    const [index, setIndex] = useState(defaultIndex ?? 0)

    const primaryChipColor = useColorModeValue('blue.200', 'blue.500')
    const secondaryChipColor = useColorModeValue('gray.100', 'gray.700') 

    function chipClickHandler(localIndex: number) {
        onIndexChange(localIndex)
        setIndex(localIndex)
    }

    return (
        <Flex
            borderRadius='md'
            overflow='hidden'
            {...props}
        >
            {children && Children.map(children, (child: any, itrIndex) => {
                return cloneElement(child, {
                    key: itrIndex,
                    onClick: chipClickHandler.bind(null, itrIndex),
                    background: itrIndex === index ? primaryChipColor : secondaryChipColor
                })
            })}
        </Flex>
    )
}
