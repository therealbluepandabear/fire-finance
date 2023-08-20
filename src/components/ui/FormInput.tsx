import { HTMLChakraProps, FormControl, InputGroup, InputLeftElement, Input, FormLabel, InputRightElement, Tooltip, InputProps, FormErrorMessage } from '@chakra-ui/react'
import { MdHelp } from 'react-icons/md'

interface FormInputProps {
    inputLeftElement: JSX.Element
    placeholder: string
    isInvalid?: boolean
    errorText?: string
}

export default function FormInput({ inputLeftElement, placeholder, ...props }: FormInputProps & InputProps) {
    return (
        <FormControl variant='floating' isInvalid={props.isInvalid}>
            <InputGroup>
                <InputLeftElement>
                    {inputLeftElement}
                </InputLeftElement>

                <Input placeholder=' ' tabIndex={-1} {...props} />

                <FormLabel
                    style={{ marginLeft: '32px' }}
                    color='gray'
                >{placeholder}</FormLabel>
            </InputGroup>

            <FormErrorMessage>{props.errorText}</FormErrorMessage>
        </FormControl>
    )
}