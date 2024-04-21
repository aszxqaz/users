import { useCallback, useEffect } from 'react';
import { UsersTableAction, useApiClient } from '../../api';
import { useAppState } from './app';
import { AuthStatus } from '../features';

export function useDashboardQuery() {
    const { apiClient } = useApiClient();
    const { dashboardState, setDashboardState, setAuthState } = useAppState();

    useEffect(() => {
        setDashboardState((prev) => prev.fetching());
        apiClient.fetchUsers().then((result) => {
            result.fold(
                (err) =>
                    err.code == 401 || err.code == 403
                        ? setAuthState((prev) => prev.unauthenticated())
                        : setDashboardState((prev) => prev.error(err.message)),

                (users) => {
                    setDashboardState((prev) => prev.ready(users));
                }
            );
        });
    }, [apiClient]);

    return { dashboardState };
}

export function useDashboardMutation() {
    const { apiClient } = useApiClient();
    const { setDashboardState, setAuthState, authState } = useAppState();
    const auth = authState.inner;

    const modifyUsers = useCallback(
        async (ids: number[], action: UsersTableAction) => {
            return apiClient.modifyUsers(ids, action).then((result) => {
                result.fold(
                    (err) =>
                        err.code == 401 || err.code == 403
                            ? setAuthState((prev) => prev.unauthenticated())
                            : setDashboardState((prev) =>
                                  prev.error(err.message)
                              ),
                    () => {
                        switch (action) {
                            case 'block':
                            case 'unblock':
                                setDashboardState((prev) =>
                                    prev.usersBlocked(ids, action)
                                );
                                if (
                                    auth.status == AuthStatus.Authenticated &&
                                    ids.includes(auth.user.id)
                                ) {
                                    setAuthState((prev) =>
                                        prev.unauthenticated()
                                    );
                                }
                                break;
                            case 'delete':
                                setDashboardState((prev) =>
                                    prev.usersExcluded(ids)
                                );
                        }
                    }
                );
            });
        },
        [apiClient, setDashboardState]
    );

    return { modifyUsers };
}
