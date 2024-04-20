import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Public, User } from '../common/decorators';
import { UserInRequest } from '../common/types';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    private readonly logger = new Logger(AuthController.name);

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

    @Get('me')
    @HttpCode(HttpStatus.OK)
    public async me(@User() user: UserInRequest) {
        this.logger.debug(`/auth/me: ${JSON.stringify(user)}`);
        if (!user) {
            throw new UnauthorizedException();
        }
        return { user };
    }
}
