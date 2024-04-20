import { IsEnum, IsNumber } from 'class-validator';

export enum UpdateManyReqBodyAction {
    Block = 'block',
    Unblock = 'unblock',
    Delete = 'delete',
}

export class UpdateManyReqBody {
    @IsNumber({}, { each: true })
    ids: number[];

    @IsEnum(UpdateManyReqBodyAction)
    action: UpdateManyReqBodyAction;
}
