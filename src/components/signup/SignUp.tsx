import { 
    Button, 
    Flex, 
    Image, 
    FormControl,
    FormLabel, 
    IconButton, 
    Input, 
    InputGroup, 
    InputRightElement, 
    Text 
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdArrowForward, MdVisibility, MdVisibilityOff } from 'react-icons/md'

export default function SignUp(): JSX.Element {
    const inputStyle = {
        height: '56px'
    }

    const [showPassword, setShowPassword] = useState(false)

    function togglePasswordVisibilityClickHandler(): void {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    return (
        <Flex 
            width='100vw' 
            height='100vh' 
            justifyContent='center'
            overflowX='clip'
        >
            <Flex 
                alignItems='center' 
                justifyContent='center' 
                height='100%'
                width='100%'
                gap={{ base: '0px', md: '36px' }} 
                flexBasis='0'
            >
                <Flex 
                    flexDirection='column' 
                    gap='16px'
                    padding={{ base: '34px', md: '0px 0px 0px 34px' }}
                    width={{ base: '100vw', md: 'auto' }}
                >
                    <Text fontSize='34px'>Build the financial plan that's right for you</Text>
                    <Text fontSize='16px'>Take control. Make the right decisions for today's priorities and tomorrow's possibilities.</Text>
                    
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input sx={inputStyle} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>

                        <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'} sx={inputStyle} />

                            <InputRightElement height='100%'>
                                <IconButton 
                                    marginRight='16px'
                                    background='transparent'
                                    onClick={togglePasswordVisibilityClickHandler}
                                    icon={showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />} 
                                    aria-label='Toggle password visibility'
                                />                   
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button 
                        height='56px'
                        background='orange' 
                        color='white'
                        rightIcon={<MdArrowForward />}
                    >Get Started For Free</Button>
                </Flex>

                <Flex
                    height='100%' 
                    minWidth='0'
                    alignItems='center'
                >
                    <Image 
                        minWidth={{ base: '0', md: '744px' }}
                        width={{ base: '0', md: 'auto' }}
                        src='https://cdn.shortpixel.ai/spai/q_lossy+w_844+to_webp+ret_img/https://www.newretirement.com/retirement/wp-content/uploads/2022/09/Frame-912.png' 
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}