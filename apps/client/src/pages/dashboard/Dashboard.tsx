import { VStack } from '@chakra-ui/react';
import { UsersTableAction } from '../../api/types';
import { DashboardUser } from '../../state/entities/user';
import { useDashboardMutation } from '../../state/hooks';
import { Toolbox } from './Toolbox';
import { UsersTable } from './UsersTable';
import { useUsersTableState } from './state/hooks';

export function Dashboard({ users }: { users: DashboardUser[] }) {
    const { tableState, setTableState } = useUsersTableState(users);
    const { modifyUsers } = useDashboardMutation();

    const onAction = (action: UsersTableAction) => async () => {
        setTableState(tableState.setActionInProgress(action));
        const selectedUserIds = tableState.selectedUsers.map(u => u.id);
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
