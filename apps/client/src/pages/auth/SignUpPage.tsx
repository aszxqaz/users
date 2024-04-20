import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useSignUpAuthMutation } from '../../state/hooks';
import { FormContainer } from './common';
import { signUpYupSchema } from './validation';

export function SignUpPage() {
    const { signUp, isLoading, error } = useSignUpAuthMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(signUpYupSchema) });
    return (
        <FormContainer>
            <Heading textAlign="center" mb="1rem">
                Sign Up
            </Heading>
            <VStack as="form" onSubmit={handleSubmit(signUp)}>
                <FormControl isInvalid={!!errors.email?.message}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        {...register('email')}
                        type="email"
                        disabled={isLoading}
                    />
                    <Box minH="1.1rem" mt="0.5rem">
                        <FormErrorMessage>
                            {errors.email?.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>
                <FormControl isInvalid={!!errors.email?.message}>
                    <FormLabel>Name</FormLabel>
                    <Input {...register('name')} disabled={isLoading} />
                    <Box minH="1.1rem" mt="0.5rem">
                        <FormErrorMessage>
                            {errors.name?.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>
                <FormControl isInvalid={!!errors.password?.message}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        {...register('password')}
                        type="password"
                        autoSave=""
                        disabled={isLoading}
                    />
                    <Box minH="1.1rem" mt="0.5rem">
                        <FormErrorMessage>
                            {errors.password?.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>
                <FormControl isInvalid={!!errors.password?.message}>
                    <FormLabel>Confirm password</FormLabel>
                    <Input
                        {...register('confirmPassword')}
                        type="password"
                        disabled={isLoading}
                    />
                    <Box minH="1.1rem" mt="0.5rem">
                        <FormErrorMessage>
                            {errors.confirmPassword?.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>
                <Text color="tomato" minH="1.1rem" mt="0.5rem">
                    {error}
                </Text>
                <Button
                    type="submit"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    mt="1rem"
                    w="50%"
                    mx="auto"
                >
                    Sign Up
                </Button>
                <Text textAlign="center" mt="3rem !important">
                    Have an account?&nbsp;
                    <Link as={NavLink} to="/signin" textDecoration="underline">
                        Sign In
                    </Link>
                    .
                </Text>
            </VStack>
        </FormContainer>
    );
}
