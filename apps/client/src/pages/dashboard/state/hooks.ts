import { DashboardUser } from 'apps/client/src/state/entities/dashboard';
import { sortBy } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { UsersTableState } from './table';

export function useUsersTableState(users: DashboardUser[]) {
    const sortedUsers = useMemo(() => sortBy(users, 'id'), [users]);
    const [tableState, setTableState] = useState(
        UsersTableState.fromUsers(sortedUsers)
    );
    useEffect(() => {
        setTableState(UsersTableState.fromUsers(sortedUsers));
    }, [sortedUsers]);
    return {
        tableState,
        setTableState,
    };
}
