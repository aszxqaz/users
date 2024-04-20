import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserInRequest } from '../common/types';

export type JwtPayload = {
    email: string;
    name: string;
    sub: number;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly config: ConfigService,
        private readonly prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('ACCESS_TOKEN_SECRET'),
        });
    }

    async validate({ sub, email, name }: JwtPayload): Promise<UserInRequest> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: sub,
            },
        });

        if (!user) throw new UnauthorizedException();

        if (user.isBlocked) throw new ForbiddenException();

        return { id: sub, email, name };
    }
}
