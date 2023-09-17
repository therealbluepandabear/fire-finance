import { Select } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { defaultTextualInput, globalSelectHandler } from '../utils'
import { accessNestedObject, triggerChangeEvent } from 'utils'

interface SelectWrapperProps extends PropsWithChildren {
    register: UseFormRegisterReturn
}

export default function SelectWrapper(props: SelectWrapperProps) {
    const ref = useRef<HTMLSelectElement | null>(null)

    useEffect(() => {
        triggerChangeEvent(ref.current!, accessNestedObject(defaultTextualInput, props.register.name))
    }, [])

    function refEvent(element: HTMLSelectElement | null): void {
        props.register.ref(element)
        ref.current = element
    }

    return (
        <Select {...props.register} onChange={globalSelectHandler} ref={refEvent}>
            {props.children}
        </Select>
    )
}