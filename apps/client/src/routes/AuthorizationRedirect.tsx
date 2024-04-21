import { useLocation, Navigate } from 'react-router-dom';
import { AuthStatus } from '../state/features';
import { useAuthState } from '../state/hooks';
import { PropsWithChildren } from 'react';

type AuthorizationRedirectProps = {
    to: string;
} & PropsWithChildren;

export function AuthorizationRedirect({
    children,
    to,
}: AuthorizationRedirectProps) {
    const location = useLocation();
    const { state } = useAuthState();

    if (
        state.inner.status == AuthStatus.Authenticated &&
        !state.inner.user.isBlocked
    ) {
        return children;
    }

    return <Navigate to={to} state={{ from: location }} replace />;
}
