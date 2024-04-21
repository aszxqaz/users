import { useCallback, useEffect, useState } from 'react';
import { useApiClient } from '../../api';
import { useAuthContext } from '../context/auth';
import { useDashboardContext } from '../context/dashboard';
import { AuthStatus, DashboardState } from '../machinery';
import { SignInArgs, SignUpArgs } from '../types';

export function useAuthFetcher() {
    const { authState, setAuthState } = useAuthContext();
    const { apiClient } = useApiClient();

    useEffect(() => {
        if (authState.status == AuthStatus.Unknown) {
            apiClient.fetchAuth().then(result => {
                result.fold(
                    err => {
                        setAuthState(prev => prev.error(err.message));
                    },
                    user => {
                        if (user) {
                            setAuthState(prev => prev.authenticated(user));
                        } else {
                            setAuthState(prev => prev.unauthenticated());
                        }
                    }
                );
            });
        }
    }, [apiClient, authState.status]);

    return { authState };
}

export function useSignInAuthMutation() {
    const { apiClient } = useApiClient();
    const { setAuthState } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const signIn = useCallback(
        ({ email, password }: SignInArgs) => {
            setIsLoading(true);
            apiClient.signIn(email, password).then(result => {
                setIsLoading(false);
                result.fold(
                    err => {
                        setAuthState(prev => prev.error(err.message));
                        setError(err.message);
                    },
                    user => {
                        if (user) {
                            setAuthState(prev => prev.authenticated(user));
                        } else {
                            setAuthState(prev => prev.unauthenticated());
                        }
                    }
                );
            });
        },
        [setAuthState, setIsLoading]
    );

    return { isLoading, signIn, error };
}

export function useSignUpAuthMutation() {
    const { apiClient } = useApiClient();
    const { setAuthState } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const signUp = useCallback((data: SignUpArgs) => {
        setIsLoading(true);
        apiClient.signUp(data).then(result => {
            setIsLoading(false);
            result.fold(
                err => {
                    setAuthState(prev => prev.error(err.message));
                    setError(err.message);
                },
                user => {
                    if (user) {
                        setAuthState(prev => prev.authenticated(user));
                    } else {
                        setAuthState(prev => prev.unauthenticated());
                    }
                }
            );
        });
    }, []);

    return { isLoading, signUp, error };
}

export function useSignOut(shouldSignOut?: () => boolean) {
    const { setAuthState } = useAuthContext();
    const { setDashboardState } = useDashboardContext();

    useEffect(() => {
        if (shouldSignOut?.() || !shouldSignOut) {
            localStorage.removeItem('access_token');
            setAuthState(prev => prev.unauthenticated());
            setDashboardState(_ => DashboardState.initial);
        }
    }, [shouldSignOut]);
}
