import { Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { MdArrowForward } from 'react-icons/md'

export default function SignIn(): JSX.Element {
    const inputStyle = {
        height: '56px'
    }

    return (
        <Flex 
            width='100%' 
            height='100vh' 
            background='teal' 
            alignItems='center' 
            justifyContent='center'
        >
            <Flex 
                background='white' 
                width='594px' 
                height='634px' 
                borderRadius='xl'
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
                padding='56px'
                gap='16px'
            >
                <Text fontSize='3xl'>Sign in to your account</Text>
                <Text fontSize='md'>Financial wellness at your fingertips</Text>

                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input sx={inputStyle} />
                </FormControl>

                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' sx={inputStyle} />
                </FormControl>

                <Button
                    height='56px'
                    background='orange'
                    color='white'
                    type='submit'
                    rightIcon={<MdArrowForward />}
                    alignSelf='stretch'
                >Log In</Button>

                <Text fontSize='sm' alignSelf='flex-end'>Forgot your password?</Text>
            
                <Button
                    height='56px'
                    background='white'
                    type='submit'
                    leftIcon={<img src='https://www.newretirement.com/rails/assets/google-c822e9eb8881f8a46cb13664d451e295afa9e2960dba2b8384d25da7d0dac976.svg' />}
                    alignSelf='stretch'
                    border='1px solid lightgray'
                    color='black'
                >Login with Google</Button>
            </Flex>
        </Flex>
    )
}