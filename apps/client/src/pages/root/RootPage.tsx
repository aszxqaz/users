import { Box, Container, HStack, Link, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { ColorModeSwitcher, NavBar, SpinnerOverlay } from '../../components';
import { AuthStatus } from '../../state/features';
import { useAuthFetcher } from '../../state/hooks/auth';

export function RootPage({ children }: PropsWithChildren) {
    const { authState } = useAuthFetcher();

    if (authState.inner.status == AuthStatus.Unknown) {
        return SpinnerOverlay();
    }

    return (
        <Box>
            <NavBar links={[]}>
                <HStack gap="0.5rem">
                    {authState.inner.status == AuthStatus.Authenticated ? (
                        <HStack gap="0.5rem">
                            <Text>
                                <b>{authState.inner.user.name}</b> (
                                {authState.inner.user.email})
                            </Text>
                            <Text>|</Text>
                            <Link
                                as={NavLink}
                                to="/signout"
                                textDecoration="underline"
                            >
                                Sign Out
                            </Link>
                        </HStack>
                    ) : null}

                    <ColorModeSwitcher />
                </HStack>
            </NavBar>
            <Container w="60rem" maxW="90%" mb="20rem">
                {children}
            </Container>
        </Box>
    );
}
