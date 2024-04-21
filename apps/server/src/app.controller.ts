import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';
import { Public } from './common/decorators';

@Controller()
export class AppController {
    // @Public()
    // @Get()
    // index(@Res() res: Response) {
    //     res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    // }
}
