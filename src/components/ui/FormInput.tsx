import { HTMLChakraProps, FormControl, InputGroup, InputLeftElement, Input, FormLabel, InputRightElement, Tooltip, InputProps, FormErrorMessage } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { MdHelp } from 'react-icons/md'

interface FormInputProps {
    inputLeftElement: JSX.Element
    placeholder: string
    isInvalid?: boolean
    errorText?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps & InputProps>((props, ref) => {
    const { inputLeftElement, placeholder, isInvalid, errorText, ...inputProps } = props

    return (
        <FormControl variant='floating' isInvalid={isInvalid}>
            <InputGroup>
                <InputLeftElement>
                    {inputLeftElement}
                </InputLeftElement>

                <Input ref={ref} placeholder=' ' tabIndex={-1} {...inputProps} />

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