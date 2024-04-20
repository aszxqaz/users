import { sortBy } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { DashboardUser } from '../../../state/entities/user';
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
