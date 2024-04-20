import { UsersTableAction } from '../../../api/types';
import { DashboardUser } from '../../../state/entities/user';

type CheckedItem = {
    user: DashboardUser;
    checked: boolean;
};

export class UsersTableState {
    private constructor(
        private readonly sortedUsers: DashboardUser[],
        private readonly checkedItems: CheckedItem[],
        private readonly actionInProgress?: UsersTableAction
    ) {}

    static fromUsers(users: DashboardUser[]) {
        const checkedItems = users.map(user => ({
            user,
            checked: false,
        }));
        return new UsersTableState(users, checkedItems);
    }

    getChecked(id: DashboardUser['id']) {
        return (
            this.checkedItems.find(item => item.user.id == id)?.checked ?? false
        );
    }

    setChecked(id: DashboardUser['id'], checked: boolean): UsersTableState {
        const checkedItems = this.checkedItems.map(item =>
            item.user.id == id
                ? {
                      ...item,
                      checked,
                  }
                : item
        );
        return new UsersTableState(this.sortedUsers, checkedItems);
    }

    setCheckedAll(checked: boolean): UsersTableState {
        const checkedItems = this.checkedItems.map(item => ({
            ...item,
            checked,
        }));
        return new UsersTableState(this.sortedUsers, checkedItems);
    }

    setActionInProgress(action?: UsersTableAction): UsersTableState {
        return new UsersTableState(this.sortedUsers, this.checkedItems, action);
    }

    get users(): DashboardUser[] {
        return this.sortedUsers;
    }

    get selectedUsers(): DashboardUser[] {
        return this.checkedItems.filter(c => c.checked).map(c => c.user);
    }

    get canBlock(): boolean {
        return (
            this.actionInProgress == undefined &&
            this.selectedUsers.some(u => !u.isBlocked)
        );
    }

    get canUnblock(): boolean {
        return (
            this.actionInProgress == undefined &&
            this.selectedUsers.some(u => u.isBlocked)
        );
    }

    get canDelete(): boolean {
        return (
            this.actionInProgress == undefined && this.selectedUsers.length > 0
        );
    }

    get isBlockInProgress(): boolean {
        return this.actionInProgress == 'block';
    }

    get isUnblockInProgress(): boolean {
        return this.actionInProgress == 'unblock';
    }

    get isDeleteInProgress(): boolean {
        return this.actionInProgress == 'delete';
    }
}
