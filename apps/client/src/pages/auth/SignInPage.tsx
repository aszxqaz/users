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
import { useSignInAuthMutation } from '../../state/hooks';
import { FormContainer } from './common';
import { signInYupSchema } from './validation';

export function SignInPage() {
    const { signIn, isLoading, error } = useSignInAuthMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(signInYupSchema) });

    return (
        <FormContainer>
            <Heading textAlign="center" mb="1rem">
                Sign In
            </Heading>
            <VStack as="form" onSubmit={handleSubmit(signIn)}>
                <FormControl isInvalid={!!errors.email?.message}>
                    <FormLabel>Email</FormLabel>
                    <Input {...register('email')} disabled={isLoading} />
                    <Box minH="1.1rem" mt="0.5rem">
                        <FormErrorMessage>
                            {errors.email?.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>
                <FormControl isInvalid={!!errors.password?.message}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        id="current-password"
                        type="password"
                        autoComplete="current-password"
                        {...register('password')}
                        disabled={isLoading}
                    />
                    <Box minH="1.1rem" mt="0.5rem">
                        <FormErrorMessage>
                            {errors.password?.message}
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
                    Sign In
                </Button>
                <Text textAlign="center" mt="3rem !important">
                    Not signed up yet?&nbsp;
                    <Link as={NavLink} to="/signup" textDecoration="underline">
                        Sign Up
                    </Link>
                    .
                </Text>
            </VStack>
        </FormContainer>
    );
}
