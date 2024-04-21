import { Box, Container, HStack, Link, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { ColorModeSwitcher, NavBar, SpinnerOverlay } from '../../components';
import { AuthStatus } from '../../state/features';
import { useAuthFetcher } from '../../state/hooks/auth';
import { User } from '../../state/types';

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
                        <UserPanel user={authState.inner.user} />
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

function UserPanel({ user }: { user: User }) {
    return (
        <HStack gap="0.5rem">
            <Text>
                <b>{user.name}</b> ({user.email})
            </Text>
            <Text>|</Text>
            <Link as={NavLink} to="/signout" textDecoration="underline">
                Sign Out
            </Link>
        </HStack>
    );
}
