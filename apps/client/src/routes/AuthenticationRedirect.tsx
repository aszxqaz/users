import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../state/hooks/app';
import { AuthStatus } from '../state/features';

type AuthRedirectProps = {
    whenAuthenticated?: string;
    whenUnauthenticated?: string;
    children?: JSX.Element;
};

export function AuthenticationRedirect({
    whenAuthenticated,
    whenUnauthenticated,
    children,
}: AuthRedirectProps) {
    const location = useLocation();
    const { state } = useAuthState();

    if (state.inner.status == AuthStatus.Authenticated && whenAuthenticated) {
        return (
            <Navigate
                to={whenAuthenticated}
                state={{ from: location }}
                replace
            />
        );
    }
    if (
        state.inner.status == AuthStatus.Unauthenticated &&
        whenUnauthenticated
    ) {
        return (
            <Navigate
                to={whenUnauthenticated}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
}
