import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../state/context/auth';
import { AuthStatus } from '../state/machinery';

type AuthorizationRedirectProps = {
    to: string;
} & PropsWithChildren;

export function AuthorizationRedirect({
    children,
    to,
}: AuthorizationRedirectProps) {
    const location = useLocation();
    const { authState } = useAuthContext();
    const state = authState.inner;
    if (state.status == AuthStatus.Authenticated && !state.user.isBlocked) {
        return children;
    }

    return <Navigate to={to} state={{ from: location }} replace />;
}
