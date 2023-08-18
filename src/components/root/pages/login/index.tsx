import { Box, Button, Divider, Flex, Input, Text, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { User, UserLoginCredentials, useCreateUserMutation, useGetUserByIdQuery, useLoginUserMutation } from '../../../../api'
import { MdAdminPanelSettings, MdEmail, MdLock, MdLockOutline, MdOutlineAdminPanelSettings, MdOutlineMailOutline, MdPassword } from 'react-icons/md'
import FormInput from '../../../ui/FormInput'

interface LoginPageProps {
    onLogin: (userId: string) => void
}

export default function LoginPage(props: LoginPageProps) {
    const { register, handleSubmit } = useForm<UserLoginCredentials>() 

    const [loginUser, { error }] = useLoginUserMutation()

    const toast = useToast()

    async function submitHandler(credentials: UserLoginCredentials): Promise<void> {
        const response = await loginUser(credentials)

        if ('data' in response) {
            props.onLogin(response.data.id)
        } else {
            toast({
                title: 'Error logging in',
                description: JSON.stringify(error),
                status: 'error',
                duration: 1500
            })
        }
    }

    return (
        <Flex  
            height='100vh' 
            width='100%' 
            alignItems='center' 
            justifyContent='center'
        >
            <form onSubmit={handleSubmit(submitHandler)}>

                <Flex 
                    borderRadius='2xl'
                    background='white'
                    flexDirection='column' 
                    padding='24px' 
                    gap='16px' 
                    border='1px solid #e1e1dc'
                    width='450px'
                >
                    <Text fontFamily='Manrope' fontSize='2xl'>Login</Text>

                    <Divider />

                    <Input placeholder='Email' type='email' {...register('email', { required: true })} />
                    <Input placeholder='Password' {...register('password', { required: true })} />

                    <Button background='buttonPrimary' fontFamily='Manrope' color='white' type='submit'>Login</Button>
                </Flex>
            </form>
         </Flex>
    )
}