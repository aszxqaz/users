import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { Public, User } from '../common/decorators';
import { AuthorizationGuard } from '../common/guards';
import { UserInRequest } from './access_token.strategy';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    public async signUp(@Body() dto: SignUpDto) {
        const { accessToken, user } = await this.authService.signUp(dto);
        return {
            accessToken,
            user,
        };
    }

    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    public async signin(@Body() dto: SignInDto) {
        const { accessToken, user } = await this.authService.signIn(dto);
        return {
            accessToken,
            user,
        };
    }

    @UseGuards(AuthorizationGuard)
    @Get('me')
    @HttpCode(HttpStatus.OK)
    public async me(@User() user: UserInRequest) {
        if (!user) {
            throw new UnauthorizedException();
        }
        return { user };
    }
}
