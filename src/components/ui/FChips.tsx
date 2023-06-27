import { Flex, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import { Children, PropsWithChildren, cloneElement, useState } from 'react'

interface FChipsProps extends PropsWithChildren {
    onIndexChange: (index: number) => void
    defaultIndex?: number
}

export default function FChips({ onIndexChange, children, defaultIndex }: FChipsProps): JSX.Element {
    const [index, setIndex] = useState(defaultIndex ?? 0)

    function chipClickHandler(localIndex: number) {
        onIndexChange(localIndex)
        setIndex(localIndex)
    }

    return (
        <Flex
            borderRadius='md'
            overflow='hidden'
            border='1px solid #e1e1dc'
        >
            {children && Children.map(children, (child: any, itrIndex) => {
                return cloneElement(child, {
                    key: itrIndex,
                    onClick: chipClickHandler.bind(null, itrIndex),
                    background: itrIndex === index ? 'pastelPrimary' : 'transparent'
                })
            })}
        </Flex>
    )
}
