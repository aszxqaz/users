import { plainToInstance } from 'class-transformer';
import { mapAxiosErrorToResult } from '../helpers/axios';
import { AsyncResult } from '../helpers/myresult';
import { Result } from '../helpers/myresult';
import { DashboardUser, DashboardUserDto } from '../state/entities/user';
import { User } from '../state/types';
import { BaseApiClient } from './base';
import { SignUpDto, UsersTableAction } from './types';

export class ApiClient extends BaseApiClient {
    async fetchAuth(): AsyncResult<User | undefined> {
        return this.client
            .get('/auth/me', { headers: this.getHeadersWithAuth() })
            .then((res) => Result.Ok(res.data.user as User))
            .catch((err) => {
                if (err.response.status == 401) {
                    return Result.Ok(undefined as User | undefined);
                } else {
                    return mapAxiosErrorToResult(err);
                }
            });
    }

    async signIn(
        email: string,
        password: string
    ): AsyncResult<User | undefined> {
        return this.client
            .post('/auth/signin', { email, password })
            .then((res) => {
                localStorage.setItem('access_token', res.data.accessToken);
                return Result.Ok(res.data.user as User);
            })
            .catch((err) => mapAxiosErrorToResult(err));
    }

    async signUp(data: SignUpDto): AsyncResult<User | undefined> {
        const { email, name, password } = data;
        return this.client
            .post('/auth/signup', { email, name, password })
            .then((res) => {
                localStorage.setItem('access_token', res.data.accessToken);
                return Result.Ok(res.data.user as User);
            })
            .catch((err) => mapAxiosErrorToResult(err));
    }

    async fetchUsers(): AsyncResult<DashboardUser[]> {
        return this.client
            .get('/users', { headers: this.getHeadersWithAuth() })
            .then((res) => {
                const users = (res.data.users as any[]).map((user) => {
                    const dto = plainToInstance(DashboardUserDto, user);
                    return DashboardUser.fromDto(dto);
                });
                return Result.Ok(users);
            })
            .catch((err) => mapAxiosErrorToResult(err));
    }

    async modifyUsers(
        ids: number[],
        action: UsersTableAction
    ): AsyncResult<null> {
        return this.client
            .patch(
                '/users',
                { ids, action },
                { headers: this.getHeadersWithAuth() }
            )
            .then((_) => Result.Ok(null))
            .catch((err) => mapAxiosErrorToResult(err));
    }
}
