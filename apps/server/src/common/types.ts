import { User } from '@prisma/client';
import { JwtPayload } from '../auth/access_token.strategy';

export type UserInRequest = Omit<JwtPayload, 'sub'> & Pick<User, 'id'>;

export function userInRequest({ id, email, name }: User): UserInRequest {
    return {
        id,
        email,
        name,
    };
}

export type RequestWithUser = Request & {
    user: UserInRequest;
};
