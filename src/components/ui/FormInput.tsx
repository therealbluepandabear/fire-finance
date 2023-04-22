import { FormControl, InputGroup, InputLeftElement, Input, InputRightElement, Tooltip, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { MdHelp } from 'react-icons/md'

// This component represents the default form input component that is used in the calculator forms throughout
// the app. Adding this component greatly reduces code duplication.

interface FormInputProps {
    isInvalid: boolean
    placeholder: string
    inputLeftElement: JSX.Element
    register: UseFormRegisterReturn
    tooltipText: string
}

export default function FormInput(props: FormInputProps): JSX.Element {
    return (
        <FormControl isInvalid={props.isInvalid} variant="floating">
            <InputGroup>
                <InputLeftElement>
                    {props.inputLeftElement}
                </InputLeftElement>

                <Input 
                    borderRadius="24px"
                    size="md"
                    errorBorderColor="red.500"
                    placeholder=" "
                    type="number"
                    {...props.register}
                />

                <FormLabel 
                    style={{ marginLeft: "32px" }} 
                    color="gray"
                    background="transparent"
                >{props.placeholder}</FormLabel>

                <Tooltip label={props.tooltipText} textAlign="center" fontSize="12px">
                    <InputRightElement>
                        <MdHelp color="lightgray" />
                    </InputRightElement>
                </Tooltip>
            </InputGroup>
            <FormErrorMessage>{props.placeholder} is required.</FormErrorMessage>
        </FormControl>
    )
}