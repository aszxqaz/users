import {
    ExecutionContext,
    SetMetadata,
    createParamDecorator,
} from '@nestjs/common';
import { JwtPayload } from '../auth/access_token.strategy';

export const Public = () => SetMetadata('isPublic', true);

export const User = createParamDecorator(
    (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (!data) return request.user;
        return request.user[data];
    }
);
