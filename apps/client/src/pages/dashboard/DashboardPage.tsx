import { Center, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { DashboardUser } from '../../state/entities/user';
import { FetchingStatus } from '../../state/features';
import { useDashboardMutation, useDashboardQuery } from '../../state/hooks';
import { NoUsers } from './NoUsers';
import { Toolbox } from './Toolbox';
import { UsersTable } from './UsersTable';
import { useUsersTableState } from './state/hooks';
import { UsersTableAction } from '../../api/types';

export function DashboardPage() {
    const { dashboardState } = useDashboardQuery();

    switch (dashboardState.inner.status) {
        case FetchingStatus.Initial:
        case FetchingStatus.Fetching:
            return (
                <Center mt="35vh">
                    <Spinner size="xl" />
                </Center>
            );
        case FetchingStatus.Error:
            return <Text>{dashboardState.inner.message}</Text>;
        case FetchingStatus.Ready:
            const users = dashboardState.inner.users;
            return (
                <VStack mt="5rem">
                    <Heading mb="4rem">Users</Heading>
                    {users.length > 0 ? (
                        <DashboardUsersTable users={users} />
                    ) : (
                        <NoUsers />
                    )}
                </VStack>
            );
    }
}

function DashboardUsersTable({ users }: { users: DashboardUser[] }) {
    const { tableState, setTableState } = useUsersTableState(users);
    const { modifyUsers } = useDashboardMutation();

    const onAction = (action: UsersTableAction) => async () => {
        setTableState(tableState.setActionInProgress(action));
        const selectedUserIds = tableState.selectedUsers.map((u) => u.id);
        await modifyUsers(selectedUserIds, action);
        setTableState(tableState.setActionInProgress(undefined));
    };

    const onChecked = (id: number, checked: boolean) => {
        setTableState(tableState.setChecked(id, checked));
    };

    const onCheckAll = (checked: boolean) => {
        setTableState(tableState.setCheckedAll(checked));
    };

    return (
        <VStack w="100%">
            <Toolbox
                mb="3rem"
                onBlock={onAction('block')}
                onUnblock={onAction('unblock')}
                onDelete={onAction('delete')}
                blockDisabled={!tableState.canBlock}
                unblockDisabled={!tableState.canUnblock}
                deleteDisabled={!tableState.canDelete}
                blockLoading={tableState.isBlockInProgress}
                unblockLoading={tableState.isUnblockInProgress}
                deleteLoading={tableState.isDeleteInProgress}
            />
            <UsersTable
                getCheckedForUser={tableState.getChecked.bind(tableState)}
                onChecked={onChecked}
                onCheckAll={onCheckAll}
                users={tableState.users}
            />
        </VStack>
    );
}
