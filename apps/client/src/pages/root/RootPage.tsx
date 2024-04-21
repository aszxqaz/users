import { Box, Container, HStack, Link, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { ColorModeSwitcher, NavBar, SpinnerOverlay } from '../../components';
import { User } from '../../state/entities/user';
import { useAuthFetcher, useSignOut } from '../../state/hooks';
import { AuthStatus } from '../../state/machinery';

export function RootPage({ children }: PropsWithChildren) {
    const { authState } = useAuthFetcher();
    const state = authState.inner;
    const shouldSignOut = () =>
        state.status == AuthStatus.Authenticated && state.user.isBlocked;
    useSignOut(shouldSignOut);
    if (state.status == AuthStatus.Unknown) {
        return SpinnerOverlay();
    }

    return (
        <Box>
            <NavBar>
                <HStack gap="0.5rem" ml="auto">
                    {state.status == AuthStatus.Authenticated ? (
                        <UserPanel user={state.user} />
                    ) : null}
                    <ColorModeSwitcher />
                </HStack>
            </NavBar>
            <Container w="60rem" maxW="90%" mb="5rem">
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
