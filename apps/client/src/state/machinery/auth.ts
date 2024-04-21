import { User } from '../entities/user';
import { BaseState } from './base';

export enum AuthStatus {
    Unknown,
    Authenticated,
    Unauthenticated,
    Error,
}

type AuthStateInner =
    | {
          status: AuthStatus.Unknown;
      }
    | {
          status: AuthStatus.Authenticated;
          user: User;
      }
    | {
          status: AuthStatus.Unauthenticated;
      }
    | {
          status: AuthStatus.Error;
          message: string;
      };

export class AuthState extends BaseState<AuthStateInner> {
    static initial = new AuthState({ status: AuthStatus.Unknown });

    get status(): AuthStatus {
        return this.inner.status;
    }

    authenticated(user: User): AuthState {
        return new AuthState({
            status: AuthStatus.Authenticated,
            user,
        });
    }

    unauthenticated(): AuthState {
        return new AuthState({
            status: AuthStatus.Unauthenticated,
        });
    }

    error(message: string): AuthState {
        return new AuthState({
            status: AuthStatus.Error,
            message,
        });
    }

    blocked(isBlocked: boolean): AuthState {
        if (this.inner.status != AuthStatus.Authenticated) {
            throw Error('user should be authenticated');
        }
        return new AuthState({
            ...this.inner,
            user: {
                ...this.inner.user,
                isBlocked,
            },
        });
    }
}
