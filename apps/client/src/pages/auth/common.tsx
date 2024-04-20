import {
    Box,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputProps,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export function FormContainer({ children }: PropsWithChildren) {
    return (
        <Container as="section" m="auto" mt="10vh" w="90%" maxW="24rem">
            {children}
        </Container>
    );
}

type InputFormControlProps<T extends string> = InputProps & {
    error?: string;
    label: string;
} & {
    register: UseFormRegisterReturn<T>;
};

export function InputFormControl<T extends string>({
    error,
    label,
    register,
    ...rest
}: InputFormControlProps<T>) {
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel>{label}</FormLabel>
            <Input {...rest} {...register} />
            <Box h="1.5rem">
                <FormErrorMessage>{error}</FormErrorMessage>
            </Box>
        </FormControl>
    );
}
