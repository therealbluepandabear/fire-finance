import { Flex, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import { Children, PropsWithChildren, cloneElement, useState } from 'react'
import { MdCheck } from 'react-icons/md'

interface ChipsProps extends PropsWithChildren {
    onIndexChange: (index: number) => void
    defaultIndex?: number
}

export default function Chips({ onIndexChange, children, defaultIndex }: ChipsProps) {
    const [index, setIndex] = useState(defaultIndex ?? 0)

    function chipClickHandler(localIndex: number) {
        onIndexChange(localIndex)
        setIndex(localIndex)
    }

    return (
        <Flex overflow='hidden'>
            {children && Children.map(children, (child: any, itrIndex) => {
                return cloneElement(child, {
                    key: itrIndex,
                    onClick: chipClickHandler.bind(null, itrIndex),
                    background: itrIndex === index ? 'pastelPrimary' : 'transparent',
                    border: itrIndex !== index ? '1px solid #e1e1dc' : '',
                    marginLeft: itrIndex !== 0 ? '8px' : '0px',
                    color: itrIndex === index ? 'pastelForeground' : '',
                    leftIcon: itrIndex === index ? <MdCheck /> : null
                })
            })}
        </Flex>
    )
}
