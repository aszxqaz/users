import {
    ConflictException,
    ForbiddenException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { JwtPayload } from './access_token.strategy';
import { SignInDto, SignUpDto } from './auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserInRequest, userInRequest } from '../common/types';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    private readonly logger = new Logger(AuthService.name);

    async signUp({
        name,
        email,
        password,
    }: SignUpDto): Promise<{ accessToken: string; user: UserInRequest }> {
        const existing = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existing) {
            throw new ConflictException('This email is already registered');
        }
        const hashedPwd = await hash(password);
        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPwd,
                loggedInAt: new Date().toISOString(),
            },
        });
        const accessToken = await this.getToken({
            sub: user.id,
            email: user.email,
            name: user.name,
        });
        this.logger.debug(`signIn: generated token: ${accessToken}`);
        return { accessToken, user: userInRequest(user) };
    }

    public async signIn({
        email,
        password,
    }: SignInDto): Promise<{ accessToken: string; user: UserInRequest }> {
        let user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) throw new UnauthorizedException();

        const passwordMatches = await verify(user.password, password);
        if (!passwordMatches) throw new UnauthorizedException();

        if (user.isBlocked) throw new ForbiddenException();

        user = await this.prisma.user.update({
            where: {
                email,
            },
            data: {
                loggedInAt: new Date().toISOString(),
            },
        });
        const accessToken = await this.getToken({
            sub: user.id,
            email: user.email,
            name: user.name,
        });
        this.logger.debug(`signIn: generated token: ${accessToken}`);
        return { accessToken, user: userInRequest(user) };
    }

    private async getToken(payload: JwtPayload): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
            expiresIn: '1d',
        });
    }
}
