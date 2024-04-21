import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserInRequest } from '../auth/access_token.strategy';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector,
        private readonly prisma: PrismaService
    ) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        return super.canActivate(context);
    }
}

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        @Inject(PrismaService) private prisma: PrismaService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const reqUser = context.switchToHttp().getRequest()
            .user as UserInRequest;

        const user = await this.prisma.user.findUnique({
            where: { id: reqUser.id },
        });

        if (user.isBlocked) {
            throw new ForbiddenException('Account is blocked');
        }

        return true;
    }
}
