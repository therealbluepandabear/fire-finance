import { HTMLChakraProps, FormControl, InputGroup, InputLeftElement, Input, FormLabel, InputRightElement, Tooltip } from '@chakra-ui/react'
import { MdHelp } from 'react-icons/md'

interface FormInputProps extends Pick<HTMLChakraProps<'input'>, 'onChange' | 'onBlur' | 'value'> {
    inputLeftElement: JSX.Element
    placeholder: string
}

export default function FormInput({ inputLeftElement, placeholder, ...props }: FormInputProps) {
    return (
        <FormControl variant='floating'>
            <InputGroup>
                <InputLeftElement>
                    {inputLeftElement}
                </InputLeftElement>

                <Input placeholder=' ' tabIndex={-1} {...props} />

                <FormLabel
                    style={{ marginLeft: '32px' }}
                    color='gray'
                >{placeholder}</FormLabel>

                <Tooltip textAlign='center' fontSize='12px'>
                    <InputRightElement>
                        <MdHelp color='lightgray' />
                    </InputRightElement>
                </Tooltip>
            </InputGroup>
        </FormControl>
    )
}