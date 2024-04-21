import { useCallback, useEffect, useState } from 'react';
import { useApiClient } from '../../api';
import { AuthStatus, DashboardState } from '../features';
import { SignInArgs, SignUpArgs } from '../types';
import { useAppState, useAuthState } from './app';

export function useAuthFetcher() {
    const { authState, setAuthState } = useAppState();
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
    const { setState: setAuthState } = useAuthState();
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
    const { setState: setAuthState } = useAuthState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const signUp = useCallback(
        (data: SignUpArgs) => {
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
        },
        [setAuthState, setIsLoading]
    );

    return { isLoading, signUp, error };
}

export function useSignOut() {
    const { setAuthState, setDashboardState } = useAppState();

    useEffect(() => {
        localStorage.removeItem('access_token');
        setAuthState(prev => prev.unauthenticated());
        setDashboardState(_ => DashboardState.initial);
    }, [setAuthState, setDashboardState]);
}
