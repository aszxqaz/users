import { useCallback, useEffect } from 'react';
import { UsersTableAction, useApiClient } from '../../api';
import { Err } from '../../helpers';
import { useAuthContext } from '../context/auth';
import { useDashboardContext } from '../context/dashboard';
import { DashboardUser } from '../entities/dashboard';
import { AuthStateInner, AuthStatus, DashboardState } from '../machinery';

export function useDashboardQuery() {
    const { apiClient } = useApiClient();
    const { setAuthState } = useAuthContext();
    const { dashboardState, setDashboardState } = useDashboardContext();

    useEffect(() => {
        setDashboardState(prev => prev.fetching());
        apiClient.fetchUsers().then(result => {
            result.fold(
                err =>
                    err.code == 401 || err.code == 403
                        ? setAuthState(prev => prev.unauthenticated())
                        : setDashboardState(prev => prev.error(err.message)),

                users => {
                    setDashboardState(prev => prev.ready(users));
                }
            );
        });
    }, [apiClient]);

    return { dashboardState };
}

export function useDashboardMutation() {
    const { apiClient } = useApiClient();
    const { authState, setAuthState } = useAuthContext();
    const { setDashboardState } = useDashboardContext();
    const auth = authState.inner;

    function handleError(err: Err) {
        err.code == 401 || err.code == 403
            ? setAuthState(prev => prev.unauthenticated())
            : setDashboardState(prev => prev.error(err.message));
    }

    function pushOutIfBlockedOrDeleted(
        ids: DashboardUser['id'][],
        auth: AuthStateInner
    ) {
        if (
            auth.status == AuthStatus.Authenticated &&
            ids.includes(auth.user.id)
        ) {
            localStorage.removeItem('access_token');
            setAuthState(prev => prev.unauthenticated());
            setDashboardState(prev => DashboardState.initial);
        }
    }

    const modifyUsers = useCallback(
        async (ids: number[], action: UsersTableAction) => {
            return apiClient.modifyUsers(ids, action).then(result => {
                result.fold(handleError, () => {
                    switch (action) {
                        case 'block':
                            setDashboardState(prev =>
                                prev.usersBlocked(ids, action)
                            );
                            pushOutIfBlockedOrDeleted(ids, auth);
                            break;
                        case 'unblock':
                            setDashboardState(prev =>
                                prev.usersBlocked(ids, action)
                            );
                            break;
                        case 'delete':
                            setDashboardState(prev => prev.usersExcluded(ids));
                            pushOutIfBlockedOrDeleted(ids, auth);
                            break;
                    }
                });
            });
        },
        [apiClient, setDashboardState]
    );

    return { modifyUsers };
}
