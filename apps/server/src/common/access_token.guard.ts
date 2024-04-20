import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserInRequest } from './types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector,
        private readonly prisma: PrismaService
    ) {
        super();
    }

    private readonly logger = new Logger(AccessTokenGuard.name);

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;
        const user = context.switchToHttp().getRequest().user as UserInRequest;
        this.logger.debug(`user=${user}`);

        return super.canActivate(context);
    }
}
