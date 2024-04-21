import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthorizationGuard } from '../common/guards';
import { UpdateManyReqBody, UpdateManyReqBodyAction } from './request_body';
import { UsersService } from './users.service';

@UseGuards(AuthorizationGuard)
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        const users = await this.usersService.findAll();
        return { users };
    }

    @HttpCode(HttpStatus.OK)
    // On method choosing:
    // https://stackoverflow.com/questions/21863326/delete-multiple-records-using-rest
    @Patch()
    async updateMany(@Body() args: UpdateManyReqBody) {
        switch (args.action) {
            case UpdateManyReqBodyAction.Block:
                await this.usersService.setBlockedMany(args.ids, true);
                break;
            case UpdateManyReqBodyAction.Unblock:
                await this.usersService.setBlockedMany(args.ids, false);
                break;
            case UpdateManyReqBodyAction.Delete:
                await this.usersService.deleteMany(args.ids);
        }
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.usersService.deleteOne(+id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async seed(@Query('count') count: number) {
        return await this.usersService.seed(count);
    }
}
