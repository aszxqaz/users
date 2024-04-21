import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

export type JwtPayload = {
    sub: number;
} & Pick<User, 'email' | 'isBlocked' | 'name'>;

export type UserInRequest = Omit<JwtPayload, 'sub'> & { id: number };

export type RequestWithUser = Request & {
    user: UserInRequest;
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

    async validate({
        sub,
        email,
        name,
        isBlocked,
    }: JwtPayload): Promise<UserInRequest> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: sub,
            },
        });

        if (!user) throw new UnauthorizedException();

        return { id: sub, email, name, isBlocked };
    }
}
