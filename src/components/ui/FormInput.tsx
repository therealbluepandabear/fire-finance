import { HTMLChakraProps, FormControl, InputGroup, InputLeftElement, Input, FormLabel, InputRightElement, Tooltip, InputProps, FormErrorMessage } from '@chakra-ui/react'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { MdHelp } from 'react-icons/md'

interface FormInputProps {
    inputLeftElement: JSX.Element
    placeholder: string
    isInvalid?: boolean
    errorText?: string
    defaultValue?: string
}

function triggerInputEvent(inputElement: HTMLInputElement, value: string): void {
    const desc = Object.getOwnPropertyDescriptor((inputElement as any).__proto__, 'value')

    desc?.set?.call(inputElement, value)
    inputElement.dispatchEvent(new Event('input', { bubbles: true }))
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps & InputProps>((props, outerRef) => {
    const { inputLeftElement, placeholder, isInvalid, errorText, ...inputProps } = props
    const innerRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(outerRef, () => innerRef.current!, [])

    useEffect(() => {
        if (props.defaultValue) {
            triggerInputEvent(innerRef.current!, props.defaultValue)
        }
    }, [])

    return (
        <FormControl variant='floating' isInvalid={isInvalid}>
            <InputGroup>
                <InputLeftElement>
                    {inputLeftElement}
                </InputLeftElement>

                <Input ref={innerRef} placeholder=' ' onChange={() => console.log('input')} tabIndex={-1} {...inputProps} />

                <FormLabel
                    style={{ marginLeft: '32px' }}
                    color='gray'
                >{placeholder}</FormLabel>
            </InputGroup>

            <FormErrorMessage>{errorText}</FormErrorMessage>
        </FormControl>
    )
})

export default FormInput