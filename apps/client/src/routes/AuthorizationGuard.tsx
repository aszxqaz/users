import { PropsWithChildren } from 'react';
import { useAuthState } from '../state/hooks';
import { AuthStatus } from '../state/features';
import { NoContentPlaceholder } from '../components/NoContentPlaceholder';
import { AiOutlineStop } from 'react-icons/ai';

export function AuthorizationGuard({ children }: PropsWithChildren) {
    const { state } = useAuthState();

    if (
        state.inner.status == AuthStatus.Authenticated &&
        !state.inner.user.isBlocked
    ) {
        return children;
    }

    return (
        <NoContentPlaceholder icon={AiOutlineStop} mt="20rem">
            Sorry, you was blocked
        </NoContentPlaceholder>
    );
}
