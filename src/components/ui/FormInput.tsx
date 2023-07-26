import { HTMLChakraProps, FormControl, InputGroup, InputLeftElement, Input, FormLabel, InputRightElement, Tooltip, InputProps } from '@chakra-ui/react'
import { MdHelp } from 'react-icons/md'

interface FormInputProps {
    inputLeftElement: JSX.Element
    placeholder: string
}

export default function FormInput({ inputLeftElement, placeholder, ...props }: FormInputProps & InputProps) {
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

                {/* <Tooltip textAlign='center' fontSize='12px' opacity={0}>
                    <InputRightElement>
                        <MdHelp color='lightgray' />
                    </InputRightElement>
                </Tooltip> */}
            </InputGroup>
        </FormControl>
    )
}