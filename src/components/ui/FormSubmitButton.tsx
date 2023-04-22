import { Button } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function FormSubmitButton(props: PropsWithChildren): JSX.Element {
    return (
        <Button 
            fontWeight="normal"
            background="linear-gradient(160deg, #00e9dd 0%, #91d080 100%)"
            textColor="white"
            _hover={{ filter: "brightness(108%)" }}
            _active={{ filter: "brightness(92%)" }}
            type="submit"
        >{props.children}</Button>
    )
}