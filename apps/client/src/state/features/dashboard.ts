import { UsersTableAction } from '../../api';
import { DashboardUser } from '../entities/user';
import { BaseState } from './base';

export enum FetchingStatus {
    Initial,
    Fetching,
    Ready,
    Error,
}

type DashboardStateInner =
    | {
          status: FetchingStatus.Initial;
      }
    | {
          status: FetchingStatus.Ready;
          users: DashboardUser[];
      }
    | {
          status: FetchingStatus.Fetching;
      }
    | {
          status: FetchingStatus.Error;
          message: string;
      };

export class DashboardState extends BaseState<DashboardStateInner> {
    static initial = new DashboardState({
        status: FetchingStatus.Initial,
    });

    ready(users: DashboardUser[]): DashboardState {
        return new DashboardState({
            ...this,
            status: FetchingStatus.Ready,
            users,
        });
    }

    error(message: string): DashboardState {
        return new DashboardState({
            ...this,
            status: FetchingStatus.Error,
            message,
        });
    }

    fetching(): DashboardState {
        return new DashboardState({
            ...this,
            status: FetchingStatus.Fetching,
        });
    }

    usersExcluded(ids: DashboardUser['id'][]): DashboardState {
        if (this.inner.status != FetchingStatus.Ready) {
            throw new Error('dashboard state not ready');
        }
        const users = this.inner.users.filter(user => !ids.includes(user.id));
        return new DashboardState({
            ...this.inner,
            users,
        });
    }

    usersBlocked(
        ids: DashboardUser['id'][],
        action: Extract<UsersTableAction, 'block' | 'unblock'>
    ): DashboardState {
        if (this.inner.status != FetchingStatus.Ready) {
            throw new Error('dashboard state not ready');
        }
        const users = this.inner.users.map(user =>
            ids.includes(user.id) ? user.blocked(action) : user
        );

        return new DashboardState({
            ...this.inner,
            users,
        });
    }
}
