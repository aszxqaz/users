import { UserInRequest } from '../auth/access_token.strategy';

import { User } from '@prisma/client';

export function getSanitizedUser({
    id,
    email,
    name,
    isBlocked,
}: User): UserInRequest {
    return {
        id,
        email,
        name,
        isBlocked,
    };
}
