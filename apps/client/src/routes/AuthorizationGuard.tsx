import { PropsWithChildren } from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import { NoContentPlaceholder } from '../components/NoContentPlaceholder';
import { AuthStatus } from '../state/features';
import { useAuthState } from '../state/hooks';

export function AuthorizationGuard({ children }: PropsWithChildren) {
    const { state } = useAuthState();

    if (
        state.inner.status == AuthStatus.Authenticated &&
        state.inner.user.isBlocked
    ) {
        return (
            <NoContentPlaceholder icon={AiOutlineStop} mt="20rem">
                Sorry, you was blocked
            </NoContentPlaceholder>
        );
    }

    return children;
}
