import { PropsWithChildren } from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import { NoContentPlaceholder } from '../components/NoContentPlaceholder';
import { useAuthContext } from '../state/context/auth';
import { AuthStatus } from '../state/machinery';

export function AuthorizationGuard({ children }: PropsWithChildren) {
    const { authState } = useAuthContext();
    const state = authState.inner;

    if (state.status == AuthStatus.Authenticated && state.user.isBlocked) {
        return (
            <NoContentPlaceholder icon={AiOutlineStop} mt="20rem">
                Sorry, you was blocked
            </NoContentPlaceholder>
        );
    }

    return children;
}
