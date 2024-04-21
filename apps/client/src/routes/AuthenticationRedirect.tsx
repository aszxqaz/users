import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../state/context/auth';
import { AuthStatus } from '../state/machinery';

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
    const { authState } = useAuthContext();

    if (
        authState.inner.status == AuthStatus.Authenticated &&
        whenAuthenticated
    ) {
        return (
            <Navigate
                to={whenAuthenticated}
                state={{ from: location }}
                replace
            />
        );
    }
    if (
        authState.inner.status == AuthStatus.Unauthenticated &&
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
