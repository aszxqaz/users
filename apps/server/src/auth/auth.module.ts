import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AccessTokenStrategy } from './access_token.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [PrismaModule, JwtModule.register({})],
    providers: [AuthService, AccessTokenStrategy],

    controllers: [AuthController],
})
export class AuthModule {}
